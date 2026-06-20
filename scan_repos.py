import os
import glob
import re
import json

base_dir = r"D:\Coding\gridlock\Extracted Repos"
repos = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]

# Core traffic problem keywords to verify relevance
RELEVANT_KEYWORDS = [
    "astram", "bengaluru", "bangalore", "traffic", "congestion", "obstruction", 
    "police", "barricade", "constable", "road_closure", "detour", "osrm", 
    "breakdown", "accident", "duration", "priority", "corridor", "junction"
]

report = []
unrelated_repos = []

for repo in repos:
    repo_path = os.path.join(base_dir, repo)
    
    # 1. Walk the directory to collect file structures
    all_files = []
    content_samples = []
    
    for root, dirs, files in os.walk(repo_path):
        # Skip common build/dependency artifacts to save time
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'venv', '__pycache__', 'build', 'dist']]
        for file in files:
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, repo_path)
            all_files.append(rel_path)
            
            # Read first 1-2KB of text files for keyword matching
            if file.endswith(('.md', '.py', '.js', '.jsx', '.json', '.html', '.txt', '.csv')):
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content_samples.append(f.read(2048))
                except Exception:
                    pass

    full_text_sample = " ".join(content_samples).lower()
    
    # 2. Check relevance
    matched_keywords = [kw for kw in RELEVANT_KEYWORDS if kw in full_text_sample or kw in repo.lower()]
    is_relevant = len(matched_keywords) >= 3  # Must match at least 3 distinct keywords to be considered relevant
    
    if not is_relevant:
        unrelated_repos.append((repo, matched_keywords))
        
    # 3. Detect features, models, routing, and tech stack
    models = []
    if "xgboost" in full_text_sample or "xgb" in full_text_sample: models.append("XGBoost")
    if "lightgbm" in full_text_sample or "lgb" in full_text_sample: models.append("LightGBM")
    if "random forest" in full_text_sample or "randomforest" in full_text_sample or " rf " in full_text_sample: models.append("Random Forest")
    if "catboost" in full_text_sample: models.append("CatBoost")
    if "lstm" in full_text_sample or "rnn" in full_text_sample or "gru" in full_text_sample: models.append("LSTM/RNN")
    if "linear regression" in full_text_sample or "ridge" in full_text_sample or "lasso" in full_text_sample: models.append("Linear/Ridge/Lasso")
    if "knn" in full_text_sample or "k-nn" in full_text_sample or "nearest neighbor" in full_text_sample: models.append("k-NN")
    if "arima" in full_text_sample or "prophet" in full_text_sample: models.append("ARIMA/Prophet")
    if "neural network" in full_text_sample or "deep learning" in full_text_sample or "tensorflow" in full_text_sample or "pytorch" in full_text_sample: models.append("Deep Learning")
    
    routing = []
    if "osrm" in full_text_sample or "open source routing" in full_text_sample: routing.append("OSRM")
    if "mapbox" in full_text_sample: routing.append("Mapbox")
    if "google maps" in full_text_sample or "gmaps" in full_text_sample: routing.append("Google Maps")
    if "dijkstra" in full_text_sample or "a*" in full_text_sample or "astar" in full_text_sample: routing.append("Dijkstra/A*")
    
    tech_stack = []
    if "react" in full_text_sample: tech_stack.append("React")
    if "next.js" in full_text_sample or "nextjs" in full_text_sample: tech_stack.append("Next.js")
    if "vue" in full_text_sample: tech_stack.append("Vue")
    if "flask" in full_text_sample: tech_stack.append("Flask")
    if "django" in full_text_sample: tech_stack.append("Django")
    if "fastapi" in full_text_sample: tech_stack.append("FastAPI")
    if "express" in full_text_sample or "node.js" in full_text_sample: tech_stack.append("Node.js/Express")
    if "streamlit" in full_text_sample: tech_stack.append("Streamlit")
    
    # Look for unique files in repo
    models_saved = [f for f in all_files if f.endswith(('.joblib', '.pkl', '.h5', '.onnx', '.json')) and 'model' in f.lower()]
    
    report.append({
        "repo": repo,
        "is_relevant": is_relevant,
        "matched_keywords": matched_keywords,
        "models": models,
        "routing": routing,
        "tech_stack": tech_stack,
        "total_files": len(all_files),
        "saved_models": models_saved[:5],
        "top_files": [f for f in all_files if '/' not in f][:15] # files in root
    })

# Output JSON report
output_report_path = r"d:\Coding\gridlock\Round 2\backend\artifacts\competitor_analysis_report.json"
with open(output_report_path, 'w', encoding='utf-8') as f:
    json.dump({
        "total_scanned": len(repos),
        "unrelated_repos": unrelated_repos,
        "repos": report
    }, f, indent=2)

print(f"COMPLETED: Scanned {len(repos)} repositories.")
print(f"Unrelated repositories flagged: {len(unrelated_repos)}")
print(f"Report saved to {output_report_path}")
