import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def generate_correlation_heatmap():
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    cleaned_csv = os.path.join(SCRIPT_DIR, "artifacts", "cleaned_events.csv")
    if not os.path.exists(cleaned_csv):
        print("Cleaned dataset not found. Run pipeline first.")
        return
        
    df = pd.read_csv(cleaned_csv)
    
    # Filter valid rows for duration mapping
    df_corr = df[df['is_trainable_duration'] == True].copy()
    
    # Convert categorical to numerical indicators
    df_corr['requires_road_closure_num'] = df_corr['requires_road_closure'].astype(int)
    df_corr['priority_num'] = (df_corr['priority_clean'] == 'high').astype(int)
    df_corr['cause_breakdown'] = (df_corr['event_cause_clean'] == 'vehicle_breakdown').astype(int)
    df_corr['cause_accident'] = (df_corr['event_cause_clean'] == 'accident').astype(int)
    df_corr['cause_construction'] = (df_corr['event_cause_clean'] == 'construction').astype(int)
    df_corr['cause_water_logging'] = (df_corr['event_cause_clean'] == 'water_logging').astype(int)
    df_corr['cause_potholes'] = (df_corr['event_cause_clean'] == 'pot_holes').astype(int)
    df_corr['cause_tree_fall'] = (df_corr['event_cause_clean'] == 'tree_fall').astype(int)
    
    cols = [
        'duration_capped', 'requires_road_closure_num', 'priority_num', 
        'is_peak_hour', 'local_hour', 'local_day_of_week', 
        'latitude', 'longitude', 'cause_breakdown', 'cause_accident',
        'cause_construction', 'cause_water_logging', 'cause_potholes', 'cause_tree_fall'
    ]
    
    labels = [
        'Duration', 'Road Closure', 'Priority', 
        'Peak Hour', 'Hour of Day', 'Day of Week', 
        'Latitude', 'Longitude', 'Breakdown', 'Accident', 
        'Construction', 'Water Logging', 'Potholes', 'Tree Fall'
    ]
    
    corr_df = df_corr[cols].corr().fillna(0)
    
    # Set up styling for dark mode/premium visualization
    plt.style.use('dark_background')
    fig, ax = plt.subplots(figsize=(12, 10))
    
    # Draw heatmap using coolwarm/diverging color map
    cax = ax.imshow(corr_df.values, cmap='RdBu', vmin=-1.0, vmax=1.0)
    
    # Add colorbar
    cbar = fig.colorbar(cax, shrink=0.8)
    cbar.set_label('Pearson Correlation (r)', rotation=270, labelpad=15, color='#94a3b8')
    cbar.ax.tick_params(colors='#94a3b8')
    
    # Set labels
    ax.set_xticks(np.arange(len(labels)))
    ax.set_yticks(np.arange(len(labels)))
    ax.set_xticklabels(labels, rotation=45, ha='right', color='#f8fafc')
    ax.set_yticklabels(labels, color='#f8fafc')
    
    # Customize grid and spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color((1.0, 1.0, 1.0, 0.1))
    ax.spines['left'].set_color((1.0, 1.0, 1.0, 0.1))
    
    # Annotate values inside the matrix cells
    for i in range(len(labels)):
        for j in range(len(labels)):
            val = corr_df.values[i, j]
            # Use white text for dark colors and black text for light colors
            color = 'black' if abs(val) > 0.4 else 'white'
            ax.text(j, i, f"{val:.2f}", ha='center', va='center', color=color, fontsize=8, fontweight='bold')
            
    ax.set_title("ASTRAM Traffic Obstruction - Feature Correlation Heatmap", fontsize=14, fontweight='bold', pad=20, color='#fff')
    plt.tight_layout()
    
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    local_artifacts = os.path.join(SCRIPT_DIR, "artifacts")
    os.makedirs(local_artifacts, exist_ok=True)
    
    local_img_path = os.path.join(local_artifacts, "correlation_heatmap.png")
    plt.savefig(local_img_path, dpi=150, bbox_inches='tight')
    
    # Try to copy to the active Gemini brain artifacts folder for user visibility
    home = os.path.expanduser("~")
    convo_id = "c1cc2f59-b286-468b-a54f-114598e39315"
    artifact_dir = os.path.join(home, ".gemini", "antigravity-ide", "brain", convo_id)
    artifact_img_path = None
    if os.path.exists(artifact_dir):
        artifact_img_path = os.path.join(artifact_dir, "correlation_heatmap.png")
        plt.savefig(artifact_img_path, dpi=150, bbox_inches='tight')
        print(f"Heatmap saved to Local and Artifact: {artifact_img_path}")
    else:
        print(f"Heatmap saved to Local: {local_img_path}")
        
    plt.close()
    
    print(f"Heatmap plotted and saved to:\n  - Local: {local_img_path}\n  - Artifact: {artifact_img_path}")

if __name__ == "__main__":
    generate_correlation_heatmap()
