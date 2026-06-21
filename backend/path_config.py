import os
import shutil

# Resolve base directories
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

# Detect Vercel environment or read-only filesystem
IS_VERCEL = os.environ.get("VERCEL") or os.environ.get("VERCEL_ENV") or not os.access(BACKEND_DIR, os.W_OK)

if IS_VERCEL:
    WRITABLE_BASE = "/tmp/gridlock"
else:
    WRITABLE_BASE = PROJECT_ROOT

def initialize_writable_filesystem():
    """Copy reference files to the writable /tmp location if running in Vercel."""
    if not IS_VERCEL:
        return
        
    print(f"Initializing Vercel writable filesystem at: {WRITABLE_BASE}")
    os.makedirs(os.path.join(WRITABLE_BASE, "backend", "artifacts"), exist_ok=True)
    os.makedirs(os.path.join(WRITABLE_BASE, "backend", "models"), exist_ok=True)
    os.makedirs(os.path.join(WRITABLE_BASE, "dataset"), exist_ok=True)
    
    # 1. Copy dataset files
    for ds_file in ["Astram event data_anonymized.csv", "feedback_data.csv"]:
        src = os.path.join(PROJECT_ROOT, "dataset", ds_file)
        dest = os.path.join(WRITABLE_BASE, "dataset", ds_file)
        if not os.path.exists(dest) and os.path.exists(src):
            try:
                shutil.copy(src, dest)
                print(f"Copied dataset {ds_file} to writable base")
            except Exception as e:
                print(f"Error copying {ds_file}: {e}")
        
    # 2. Copy models
    for model_file in ["duration_model.joblib", "priority_model.joblib", "closure_model.joblib"]:
        src = os.path.join(BACKEND_DIR, "models", model_file)
        dest = os.path.join(WRITABLE_BASE, "backend", "models", model_file)
        if not os.path.exists(dest) and os.path.exists(src):
            try:
                shutil.copy(src, dest)
                print(f"Copied model {model_file} to writable base")
            except Exception as e:
                print(f"Error copying model {model_file}: {e}")
            
    # 3. Copy artifacts
    artifacts = [
        "cleaned_events.csv", "dataset_profile.json", "model_comparison_results.json",
        "policy_adjustments.json", "text_enrichment.json", "competitor_analysis_report.json"
    ]
    for art in artifacts:
        src = os.path.join(BACKEND_DIR, "artifacts", art)
        dest = os.path.join(WRITABLE_BASE, "backend", "artifacts", art)
        if not os.path.exists(dest) and os.path.exists(src):
            try:
                shutil.copy(src, dest)
                print(f"Copied artifact {art} to writable base")
            except Exception as e:
                print(f"Error copying artifact {art}: {e}")

# Run initialization immediately if imported/loaded
initialize_writable_filesystem()

def get_path(rel_path: str) -> str:
    """Get the path to a file, using WRITABLE_BASE if running in a writable-restricted environment.
    
    rel_path should be relative to PROJECT_ROOT, e.g. 'dataset/feedback_data.csv' or 'backend/models/duration_model.joblib'
    """
    if IS_VERCEL:
        dest_path = os.path.join(WRITABLE_BASE, rel_path)
        # Ensure parent directory exists in /tmp
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        return dest_path
    return os.path.join(PROJECT_ROOT, rel_path)
