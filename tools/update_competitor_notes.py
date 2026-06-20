import argparse
import ast
import hashlib
import json
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path


DEFAULT_REPOS_DIR = Path(r"D:\Coding\gridlock\Extracted Repos")
DEFAULT_OUTPUT_DIR = Path("docs/competitor_repo_notes")

SKIP_DIRS = {
    ".git",
    ".hg",
    ".svn",
    ".idea",
    ".vscode",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    "venv",
    ".venv",
    "env",
    ".env",
    "catboost_info",
}

TEXT_SUFFIXES = {
    ".md",
    ".txt",
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".yaml",
    ".yml",
    ".toml",
    ".html",
    ".css",
    ".ipynb",
    ".csv",
}

DATA_SUFFIXES = {".csv", ".parquet", ".db", ".sqlite", ".sqlite3", ".json"}
MODEL_SUFFIXES = {".joblib", ".pkl", ".pickle", ".h5", ".onnx", ".cbm", ".lgb", ".txt", ".json"}
NOTE_LIMIT = 80
SOURCE_LIMIT = 35
FILE_LIST_LIMIT = 500

KEYWORDS = {
    "traffic": ["traffic", "congestion", "gridlock", "astram", "bengaluru", "bangalore"],
    "operations": ["police", "constable", "barricade", "closure", "diversion", "manpower", "resource"],
    "models": [
        "randomforest",
        "random forest",
        "xgboost",
        "lightgbm",
        "catboost",
        "lstm",
        "gru",
        "prophet",
        "arima",
        "kmeans",
        "knn",
        "nearest neighbor",
        "regressor",
        "classifier",
        "calibration",
        "conformal",
    ],
    "routing": ["osrm", "openrouteservice", "mapbox", "google maps", "dijkstra", "astar", "a*"],
}


def relpath(path: Path, root: Path) -> str:
    return str(path.relative_to(root)).replace("/", "\\")


def safe_name(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "_", name).strip("_") or "repo"


def sha256_file(path: Path, max_bytes: int | None = None) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        if max_bytes is None:
            for chunk in iter(lambda: handle.read(1024 * 1024), b""):
                digest.update(chunk)
        else:
            digest.update(handle.read(max_bytes))
    return digest.hexdigest()


def read_text(path: Path, limit: int = 200_000) -> str:
    try:
        raw = path.read_bytes()[:limit]
    except OSError:
        return ""
    return raw.decode("utf-8", errors="ignore")


def git_info(repo: Path) -> dict:
    def run_git(args: list[str]) -> str:
        try:
            result = subprocess.run(
                ["git", "-C", str(repo), *args],
                check=False,
                capture_output=True,
                text=True,
                timeout=5,
            )
        except Exception:
            return ""
        return result.stdout.strip() if result.returncode == 0 else ""

    return {
        "remote": run_git(["config", "--get", "remote.origin.url"]),
        "branch": run_git(["rev-parse", "--abbrev-ref", "HEAD"]),
        "head": run_git(["rev-parse", "HEAD"]),
    }


def should_skip_dir(name: str) -> bool:
    return name in SKIP_DIRS or name.endswith(".egg-info")


def collect_files(repo: Path) -> list[Path]:
    files: list[Path] = []
    for root, dirs, names in os.walk(repo):
        dirs[:] = [d for d in dirs if not should_skip_dir(d)]
        for name in names:
            path = Path(root) / name
            files.append(path)
    return sorted(files, key=lambda p: relpath(p, repo).lower())


def classify_stack(files: list[Path], repo: Path, text_blob: str) -> list[str]:
    names = {relpath(f, repo).lower() for f in files}
    stack = set()
    package_text = ""
    for f in files:
        if f.name == "package.json":
            package_text += read_text(f, 80_000).lower()
    pyproject_text = ""
    for f in files:
        if f.name in {"requirements.txt", "pyproject.toml"}:
            pyproject_text += read_text(f, 80_000).lower()

    combined = f"{text_blob.lower()} {package_text} {pyproject_text}"

    if "next" in package_text or any("next.config" in n for n in names):
        stack.add("Next.js")
    if "vite" in package_text or any("vite.config" in n for n in names):
        stack.add("Vite")
    if "react" in package_text or "from 'react'" in combined or 'from "react"' in combined:
        stack.add("React")
    if "tailwind" in package_text or any("tailwind" in n for n in names):
        stack.add("Tailwind CSS")
    if "fastapi" in combined or "@app.get" in combined or "@router.get" in combined:
        stack.add("FastAPI")
    if "flask" in combined or "@app.route" in combined:
        stack.add("Flask")
    if "streamlit" in combined or any(".streamlit" in n for n in names):
        stack.add("Streamlit")
    if "express" in package_text or "app.get(" in combined or "router.get(" in combined:
        stack.add("Node/Express")
    if "docker-compose" in names or "docker-compose.yml" in names:
        stack.add("Docker Compose")
    if any(n.endswith("dockerfile") or "\\dockerfile" in n for n in names):
        stack.add("Docker")
    if any(n.endswith(".ipynb") for n in names):
        stack.add("Notebook")
    return sorted(stack)


def detect_keywords(text_blob: str) -> dict:
    lower = text_blob.lower()
    found = {}
    for group, words in KEYWORDS.items():
        found[group] = sorted({word for word in words if word in lower})
    return found


def extract_readme_notes(repo: Path) -> dict:
    readmes = sorted(repo.glob("**/README*"), key=lambda p: len(p.parts))
    notes = []
    headings = []
    for readme in readmes[:3]:
        if any(part in SKIP_DIRS for part in readme.parts):
            continue
        text = read_text(readme, 60_000)
        if not text.strip():
            continue
        rel = relpath(readme, repo)
        for line in text.splitlines():
            clean = line.strip()
            if not clean:
                continue
            if clean.startswith("#"):
                headings.append({"file": rel, "text": clean[:180]})
            lower = clean.lower()
            if any(word in lower for word in ["feature", "predict", "model", "api", "dashboard", "deploy", "run", "route", "recommend", "feedback"]):
                if len(clean) > 220:
                    clean = clean[:217] + "..."
                notes.append({"file": rel, "text": clean})
            if len(notes) >= NOTE_LIMIT:
                break
    return {"headings": headings[:NOTE_LIMIT], "claims": notes[:NOTE_LIMIT]}


def parse_package(path: Path) -> dict:
    data = json.loads(read_text(path, 500_000) or "{}")
    deps = {}
    for key in ["dependencies", "devDependencies"]:
        deps.update(data.get(key, {}))
    return {
        "name": data.get("name"),
        "scripts": data.get("scripts", {}),
        "dependencies": sorted(deps.keys()),
    }


def parse_requirements(path: Path) -> list[str]:
    deps = []
    for line in read_text(path, 200_000).splitlines():
        clean = line.strip()
        if clean and not clean.startswith("#"):
            deps.append(clean)
    return deps


def extract_python_signals(path: Path) -> dict:
    text = read_text(path, 500_000)
    signals = {"imports": [], "defs": [], "classes": [], "endpoints": []}
    try:
        tree = ast.parse(text)
    except SyntaxError:
        tree = None

    if tree is not None:
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    signals["imports"].append(alias.name.split(".")[0])
            elif isinstance(node, ast.ImportFrom) and node.module:
                signals["imports"].append(node.module.split(".")[0])
            elif isinstance(node, ast.FunctionDef):
                signals["defs"].append(node.name)
                for dec in node.decorator_list:
                    endpoint = decorator_endpoint(dec)
                    if endpoint:
                        signals["endpoints"].append(endpoint)
            elif isinstance(node, ast.AsyncFunctionDef):
                signals["defs"].append(node.name)
                for dec in node.decorator_list:
                    endpoint = decorator_endpoint(dec)
                    if endpoint:
                        signals["endpoints"].append(endpoint)
            elif isinstance(node, ast.ClassDef):
                signals["classes"].append(node.name)

    # Regex fallback catches decorators in files ast cannot parse.
    for owner, method, route in re.findall(r"@(app|router|api)\.(get|post|put|delete|patch)\(\s*['\"]([^'\"]+)", text):
        value = f"{owner}.{method.upper()} {route}"
        if value not in signals["endpoints"]:
            signals["endpoints"].append(value)

    signals["imports"] = sorted(set(signals["imports"]))[:30]
    signals["defs"] = signals["defs"][:40]
    signals["classes"] = signals["classes"][:30]
    signals["endpoints"] = signals["endpoints"][:80]
    return signals


def decorator_endpoint(dec: ast.AST) -> str | None:
    if not isinstance(dec, ast.Call):
        return None
    func = dec.func
    if not isinstance(func, ast.Attribute):
        return None
    if func.attr not in {"get", "post", "put", "delete", "patch", "route"}:
        return None
    if not dec.args:
        return None
    first = dec.args[0]
    if isinstance(first, ast.Constant) and isinstance(first.value, str):
        return f"{func.attr.upper()} {first.value}"
    return None


def extract_js_signals(path: Path) -> dict:
    text = read_text(path, 500_000)
    imports = sorted(set(re.findall(r"from\s+['\"]([^'\"]+)['\"]", text)))[:30]
    funcs = re.findall(r"(?:function|const|let|var)\s+([A-Za-z0-9_]+)\s*(?:=|\()", text)
    endpoints = []
    for match in re.findall(r"(?:app|router)\.(get|post|put|delete|patch)\(\s*['\"]([^'\"]+)", text):
        endpoints.append(f"{match[0].upper()} {match[1]}")
    return {"imports": imports, "symbols": funcs[:40], "endpoints": endpoints[:80]}


def extract_notebook_signals(path: Path) -> dict:
    try:
        data = json.loads(read_text(path, 2_000_000))
    except json.JSONDecodeError:
        return {"cells": 0, "headings": [], "imports": [], "keywords": []}
    cells = data.get("cells", [])
    headings = []
    imports = set()
    text = []
    for cell in cells:
        source = "".join(cell.get("source", []))
        text.append(source)
        if cell.get("cell_type") == "markdown":
            for line in source.splitlines():
                if line.strip().startswith("#"):
                    headings.append(line.strip()[:180])
        for imp in re.findall(r"^\s*(?:import|from)\s+([A-Za-z0-9_\.]+)", source, flags=re.MULTILINE):
            imports.add(imp.split(".")[0])
    joined = "\n".join(text).lower()
    keywords = sorted({word for group in KEYWORDS.values() for word in group if word in joined})
    return {
        "cells": len(cells),
        "headings": headings[:40],
        "imports": sorted(imports)[:40],
        "keywords": keywords[:60],
    }


def analyze_repo(repo: Path) -> dict:
    files = collect_files(repo)
    text_pieces = []
    for path in files:
        if path.suffix.lower() in TEXT_SUFFIXES and path.stat().st_size < 400_000:
            text_pieces.append(read_text(path, 80_000))
    text_blob = "\n".join(text_pieces)

    manifests = []
    packages = []
    requirements = []
    py_signals = []
    js_signals = []
    notebooks = []
    data_assets = []
    model_assets = []
    docs = []
    tests = []
    file_inventory = []

    for path in files:
        rel = relpath(path, repo)
        suffix = path.suffix.lower()
        size = path.stat().st_size
        file_entry = {
            "path": rel,
            "size": size,
            "sha256": sha256_file(path),
        }
        file_inventory.append(file_entry)

        lower_rel = rel.lower()
        if path.name in {"package.json", "requirements.txt", "pyproject.toml", "Dockerfile", "docker-compose.yml", "vercel.json", "render.yaml", "Procfile"}:
            manifests.append(rel)
        if path.name == "package.json":
            try:
                packages.append({"path": rel, **parse_package(path)})
            except Exception as exc:
                packages.append({"path": rel, "error": str(exc)})
        if path.name == "requirements.txt":
            requirements.append({"path": rel, "dependencies": parse_requirements(path)})
        if suffix == ".py" and len(py_signals) < SOURCE_LIMIT:
            signals = extract_python_signals(path)
            if signals["defs"] or signals["classes"] or signals["endpoints"]:
                py_signals.append({"path": rel, **signals})
        if suffix in {".js", ".jsx", ".ts", ".tsx"} and len(js_signals) < SOURCE_LIMIT:
            signals = extract_js_signals(path)
            if signals["symbols"] or signals["endpoints"]:
                js_signals.append({"path": rel, **signals})
        if suffix == ".ipynb":
            notebooks.append({"path": rel, **extract_notebook_signals(path)})
        if suffix in DATA_SUFFIXES and any(word in lower_rel for word in ["data", "dataset", "event", "hotspot", "risk", "model", "artifact", "output"]):
            data_assets.append(rel)
        if suffix in MODEL_SUFFIXES and any(word in lower_rel for word in ["model", "classifier", "regressor", "encoder", "calibrator", "cluster", "lgb", "xgb", "catboost", "pkl", "joblib"]):
            model_assets.append(rel)
        if suffix in {".md", ".pdf", ".pptx", ".key"}:
            docs.append(rel)
        if "test" in path.name.lower() or "\\tests\\" in lower_rel:
            tests.append(rel)

    all_endpoints = []
    for signal in py_signals:
        all_endpoints.extend(signal.get("endpoints", []))
    for signal in js_signals:
        all_endpoints.extend(signal.get("endpoints", []))

    total_size = sum(f["size"] for f in file_inventory)
    digest = hashlib.sha256()
    for entry in file_inventory:
        digest.update(entry["path"].encode("utf-8"))
        digest.update(entry["sha256"].encode("ascii"))

    return {
        "repo": repo.name,
        "path": str(repo),
        "git": git_info(repo),
        "fingerprint": digest.hexdigest(),
        "file_count": len(files),
        "total_size_bytes": total_size,
        "stack": classify_stack(files, repo, text_blob),
        "keywords": detect_keywords(text_blob),
        "manifests": manifests,
        "packages": packages,
        "requirements": requirements,
        "readme": extract_readme_notes(repo),
        "data_assets": data_assets[:120],
        "model_assets": model_assets[:120],
        "notebooks": notebooks[:30],
        "docs": docs[:120],
        "tests": tests[:120],
        "endpoints": sorted(set(all_endpoints)),
        "python_signals": py_signals,
        "js_signals": js_signals,
        "file_inventory": file_inventory[:FILE_LIST_LIMIT],
        "file_inventory_truncated": len(file_inventory) > FILE_LIST_LIMIT,
    }


def bullet_list(values: list[str], empty: str = "None detected") -> str:
    if not values:
        return f"- {empty}\n"
    return "".join(f"- `{value}`\n" for value in values)


def render_repo_markdown(repo: dict) -> str:
    lines = [
        f"# {repo['repo']}",
        "",
        "## Snapshot",
        "",
        f"- Path: `{repo['path']}`",
        f"- Git remote: `{repo['git'].get('remote') or 'unknown'}`",
        f"- Git branch: `{repo['git'].get('branch') or 'unknown'}`",
        f"- Git HEAD: `{repo['git'].get('head') or 'unknown'}`",
        f"- Fingerprint: `{repo['fingerprint']}`",
        f"- Files indexed: `{repo['file_count']}`",
        f"- Indexed size: `{repo['total_size_bytes']}` bytes",
        "",
        "## Stack Signals",
        "",
        bullet_list(repo["stack"]),
        "## Traffic Problem Signals",
        "",
    ]
    for group, words in repo["keywords"].items():
        lines.append(f"- {group}: {', '.join(words) if words else 'none'}")
    lines.extend(["", "## Manifests", "", bullet_list(repo["manifests"])])

    if repo["packages"]:
        lines.extend(["## Package Files", ""])
        for package in repo["packages"]:
            lines.append(f"### `{package['path']}`")
            if package.get("name"):
                lines.append(f"- Name: `{package['name']}`")
            if package.get("scripts"):
                lines.append("- Scripts:")
                for key, value in package["scripts"].items():
                    lines.append(f"  - `{key}`: `{value}`")
            deps = package.get("dependencies", [])
            if deps:
                lines.append(f"- Dependencies: {', '.join(f'`{d}`' for d in deps[:50])}")
            if package.get("error"):
                lines.append(f"- Parse error: `{package['error']}`")
            lines.append("")

    if repo["requirements"]:
        lines.extend(["## Python Dependencies", ""])
        for req in repo["requirements"]:
            lines.append(f"### `{req['path']}`")
            for dep in req["dependencies"][:80]:
                lines.append(f"- `{dep}`")
            lines.append("")

    lines.extend(["## README Headings", ""])
    if repo["readme"]["headings"]:
        for item in repo["readme"]["headings"]:
            lines.append(f"- `{item['file']}`: {item['text']}")
    else:
        lines.append("- None detected")
    lines.extend(["", "## README Claims and Operational Notes", ""])
    if repo["readme"]["claims"]:
        for item in repo["readme"]["claims"]:
            lines.append(f"- `{item['file']}`: {item['text']}")
    else:
        lines.append("- None detected")

    lines.extend(["", "## Data Assets", "", bullet_list(repo["data_assets"])])
    lines.extend(["## Model and Artifact Assets", "", bullet_list(repo["model_assets"])])
    lines.extend(["## Notebooks", ""])
    if repo["notebooks"]:
        for nb in repo["notebooks"]:
            lines.append(f"### `{nb['path']}`")
            lines.append(f"- Cells: `{nb['cells']}`")
            if nb["imports"]:
                lines.append(f"- Imports: {', '.join(f'`{i}`' for i in nb['imports'])}")
            if nb["keywords"]:
                lines.append(f"- Keywords: {', '.join(f'`{k}`' for k in nb['keywords'])}")
            if nb["headings"]:
                lines.append("- Headings:")
                for heading in nb["headings"][:20]:
                    lines.append(f"  - {heading}")
            lines.append("")
    else:
        lines.append("- None detected")

    lines.extend(["", "## API Endpoints", "", bullet_list(repo["endpoints"])])
    lines.extend(["## Python Source Signals", ""])
    if repo["python_signals"]:
        for signal in repo["python_signals"]:
            lines.append(f"### `{signal['path']}`")
            if signal["classes"]:
                lines.append(f"- Classes: {', '.join(f'`{c}`' for c in signal['classes'])}")
            if signal["defs"]:
                lines.append(f"- Functions: {', '.join(f'`{d}`' for d in signal['defs'][:35])}")
            if signal["endpoints"]:
                lines.append(f"- Endpoints: {', '.join(f'`{e}`' for e in signal['endpoints'])}")
            if signal["imports"]:
                lines.append(f"- Imports: {', '.join(f'`{i}`' for i in signal['imports'][:25])}")
            lines.append("")
    else:
        lines.append("- None detected")

    lines.extend(["## JavaScript/TypeScript Source Signals", ""])
    if repo["js_signals"]:
        for signal in repo["js_signals"]:
            lines.append(f"### `{signal['path']}`")
            if signal["symbols"]:
                lines.append(f"- Symbols: {', '.join(f'`{s}`' for s in signal['symbols'][:35])}")
            if signal["endpoints"]:
                lines.append(f"- Endpoints: {', '.join(f'`{e}`' for e in signal['endpoints'])}")
            if signal["imports"]:
                lines.append(f"- Imports: {', '.join(f'`{i}`' for i in signal['imports'][:25])}")
            lines.append("")
    else:
        lines.append("- None detected")

    lines.extend(["## Documentation and Presentation Files", "", bullet_list(repo["docs"])])
    lines.extend(["## Test Files", "", bullet_list(repo["tests"])])
    lines.extend(["## File Inventory", ""])
    for entry in repo["file_inventory"]:
        lines.append(f"- `{entry['path']}` | {entry['size']} bytes | `{entry['sha256'][:12]}`")
    if repo["file_inventory_truncated"]:
        lines.append("- Inventory truncated in Markdown; see `_repo_inventory.json` for refresh metadata.")
    lines.extend([
        "",
        "## Refresh Notes",
        "",
        "- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.",
        "- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.",
        "- Treat README claims as unverified until the relevant code path or runtime behavior is checked.",
        "",
    ])
    return "\n".join(lines)


def render_index(repos: list[dict], generated_at: str, repos_dir: Path) -> str:
    lines = [
        "# Competitor Repository Intelligence",
        "",
        f"- Generated at: `{generated_at}`",
        f"- Source directory: `{repos_dir}`",
        f"- Repositories indexed: `{len(repos)}`",
        "",
        "This folder is designed to be refreshed. Rerun:",
        "",
        "```powershell",
        "python tools/update_competitor_notes.py",
        "```",
        "",
        "Each repo note includes the git HEAD when available, a content fingerprint, stack signals, data/model assets, endpoints, notebooks, README claims, source symbols, tests, and an indexed file inventory.",
        "",
        "## Repository Index",
        "",
        "| Repo | Stack | Files | Models/Artifacts | Endpoints | Fingerprint | Notes |",
        "| --- | --- | ---: | ---: | ---: | --- | --- |",
    ]
    for repo in repos:
        note_name = f"{safe_name(repo['repo'])}.md"
        stack = ", ".join(repo["stack"]) or "Unknown"
        lines.append(
            f"| `{repo['repo']}` | {stack} | {repo['file_count']} | {len(repo['model_assets'])} | {len(repo['endpoints'])} | `{repo['fingerprint'][:12]}` | [{note_name}]({note_name}) |"
        )
    lines.extend(["", "## Cross-Repo Feature Signals", ""])
    feature_counts: dict[str, int] = {}
    for repo in repos:
        for item in repo["stack"]:
            feature_counts[item] = feature_counts.get(item, 0) + 1
        for group, words in repo["keywords"].items():
            for word in words:
                feature_counts[word] = feature_counts.get(word, 0) + 1
    for key, count in sorted(feature_counts.items(), key=lambda kv: (-kv[1], kv[0]))[:80]:
        lines.append(f"- `{key}`: {count} repos")
    lines.extend(["", "## Highest Signal Repos To Manually Recheck First", ""])
    ranked = sorted(
        repos,
        key=lambda r: (
            len(r["model_assets"]) * 3
            + len(r["endpoints"]) * 2
            + len(r["notebooks"])
            + len(r["docs"])
            + r["file_count"] / 50
        ),
        reverse=True,
    )
    for repo in ranked[:12]:
        reasons = []
        if repo["model_assets"]:
            reasons.append(f"{len(repo['model_assets'])} model/artifact files")
        if repo["endpoints"]:
            reasons.append(f"{len(repo['endpoints'])} API endpoints")
        if repo["notebooks"]:
            reasons.append(f"{len(repo['notebooks'])} notebooks")
        if repo["docs"]:
            reasons.append(f"{len(repo['docs'])} docs/decks")
        lines.append(f"- `{repo['repo']}`: {', '.join(reasons) if reasons else 'broad file inventory'}")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate detailed notes for extracted public Gridlock repos.")
    parser.add_argument("--repos-dir", default=str(DEFAULT_REPOS_DIR), help="Directory containing extracted repositories.")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Output directory for markdown notes.")
    args = parser.parse_args()

    repos_dir = Path(args.repos_dir)
    output_dir = Path(args.output_dir)
    if not repos_dir.exists():
        raise SystemExit(f"Repository directory not found: {repos_dir}")

    output_dir.mkdir(parents=True, exist_ok=True)
    generated_at = datetime.now(timezone.utc).isoformat()
    repo_dirs = sorted([p for p in repos_dir.iterdir() if p.is_dir()], key=lambda p: p.name.lower())
    repos = []
    for repo_dir in repo_dirs:
        print(f"Indexing {repo_dir.name}...")
        repos.append(analyze_repo(repo_dir))

    inventory = {
        "generated_at": generated_at,
        "source_directory": str(repos_dir),
        "repo_count": len(repos),
        "repos": repos,
    }

    (output_dir / "_repo_inventory.json").write_text(json.dumps(inventory, indent=2), encoding="utf-8")
    (output_dir / "README.md").write_text(render_index(repos, generated_at, repos_dir), encoding="utf-8")
    for repo in repos:
        (output_dir / f"{safe_name(repo['repo'])}.md").write_text(render_repo_markdown(repo), encoding="utf-8")
    print(f"Generated notes for {len(repos)} repositories in {output_dir}")


if __name__ == "__main__":
    main()

