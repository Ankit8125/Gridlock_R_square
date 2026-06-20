import os
import json
import re
import pandas as pd

# Translation mapping for common Kannada phrases found in the dataset descriptions
KANNADA_TRANSLATION_MAP = {
    "ಕೆಟ್ಟು ನಿಂತಿದೆ": "is broken down and stopped",
    "ಬಿಎಂಟಿಸಿ ಬಸ್": "BMTC Bus",
    "ಮರ ಬಿದ್ದಿರುತ್ತೆ": "tree has fallen",
    "ಮರ ಬಿದ್ದಿರುವುದರಿಂದ": "due to tree fall",
    "ಟ್ರಾಫಿಕ್ ಸ್ಲೋ": "traffic is slow",
    "ಸ್ವಲ್ಪ ನಿಧಾನಗತಿಯಲ್ಲಿ ಇರುತ್ತದೆ": "is moving a bit slowly",
    "ನಿಧಾನಗತಿಯಲ್ಲಿ": "slow-moving",
    "ಒಳಚರಂಡಿ": "sewer / drainage",
    "ಚೇಂಬರ್ ಗೆ": "to the chamber",
    "ಹೊಸದಾಗಿ ಸಿಮೆಂಟ್ ಹಾಕಿದ್ದು": "newly cemented",
    "ಮ್ಯಾನ್ ಹೋಲ್ ಕವರ್": "manhole cover",
    "ಮುರಿದಿರುತ್ತದೆ": "is broken",
    "ಟೈರ್ ಪಂಚರ್": "tire punctured",
    "ರಸ್ತೆ ಮಧ್ಯದಲ್ಲೇ": "in the middle of the road",
    "ಸುಗಮ ಸಂಚಾರಕ್ಕೆ": "for smooth traffic flow",
    "ಗೇರ್ ರಾಡ್ ಕಟ್ ಆಗಿ": "gear rod got cut",
    "ಒಳಚರಂಡಿ ಚೇಂಬರ್": "drainage chamber",
    "ರಸ್ತೆ ಮಧ್ಯೆ": "in the middle of the road",
    "ಟ್ರಾಫಿಕ್ ಜಾಮ್": "traffic jam",
    "ನಿಂತಿದೆ": "is standing / stopped",
    "ಬಿದ್ದಿದೆ": "has fallen",
    "ಮಳೆ ನೀರು": "rain water",
    "ನಿಂತು ಕೊಂಡಿದೆ": "is stopped",
    "ಕೆಲಸ ನಡೆಯುತ್ತಿದೆ": "work is going on",
    "ಕಾಮಗಾರಿ": "construction / work",
    "ಅಪಘಾತ": "accident",
    "ಗಾರ್ಬೇಜ್": "garbage",
    "ಕಸ": "garbage / waste"
}

def detect_language(text):
    if not isinstance(text, str):
        return "unknown"
    # Kannada unicode range: \u0c80-\u0cff
    has_kannada = bool(re.search(r'[\u0c80-\u0cff]', text))
    has_english = bool(re.search(r'[a-zA-Z]', text))
    
    if has_kannada and has_english:
        return "mixed"
    elif has_kannada:
        return "kannada"
    elif has_english:
        return "english"
    else:
        return "other"

def get_translated_text(text, lang):
    if lang not in ["kannada", "mixed"] or not isinstance(text, str):
        return text
    
    translated = text
    # Replace Kannada words with English equivalents from map
    for kan, eng in KANNADA_TRANSLATION_MAP.items():
        translated = translated.replace(kan, f"[{eng}]")
        
    return translated

def extract_sub_cause_and_urgency(text):
    if not isinstance(text, str):
        return "general_obstruction", "medium"
    
    text_lower = text.lower()
    
    # Heuristics for refined sub-causes
    sub_cause = "general_obstruction"
    urgency = "medium"
    
    # Sub-causes check
    if any(k in text_lower for k in ["tyre", "tire", "puncher", "blast", "ಪಂಚರ್", "ಬ್ಲಾಸ್ಟ್"]):
        sub_cause = "tyre_issue"
        urgency = "high"
    elif any(k in text_lower for k in ["bmtc", "ksrtc", "bus", "ಬಸ್", "ಬಿಎಂಟಿಸಿ"]):
        sub_cause = "bus_breakdown"
        urgency = "high"
    elif any(k in text_lower for k in ["starting problem", "start index", "battery"]):
        sub_cause = "starting_problem"
    elif any(k in text_lower for k in ["clutch", "gear", "ಗೇರ್"]):
        sub_cause = "mechanical_failure"
    elif any(k in text_lower for k in ["cricket", "match", "stadium", "chinnaswamy", "ಪಂದ್ಯ"]):
        sub_cause = "sports_event"
        urgency = "high"
    elif any(k in text_lower for k in ["metro", "kride", "k-ride", "ಮೇಟ್ರೋ"]):
        sub_cause = "metro_construction"
    elif any(k in text_lower for k in ["water", "logging", "underpass", "flood", "ನೀರು"]):
        sub_cause = "water_logging_underpass"
        urgency = "high"
    elif any(k in text_lower for k in ["manhole", "chamber", "sewage", "ಚೇಂಬರ್", "ಮ್ಯಾನ್ ಹೋಲ್"]):
        sub_cause = "drainage_issue"
    elif any(k in text_lower for k in ["accident", "collision", "hit", "ಅಪಘಾತ"]):
        sub_cause = "accident_scene"
        urgency = "high"
    elif any(k in text_lower for k in ["fallen tree", "tree fall", "ಮರ ಬಿದ್ದ"]):
        sub_cause = "tree_fall_obstruction"
        urgency = "high"
    elif any(k in text_lower for k in ["vip", "movement", "cm", "minister", "ವಿಐಪಿ"]):
        sub_cause = "vip_movement"
        urgency = "high"

    # Explicit urgency keywords
    if any(k in text_lower for k in ["critical", "severe", "blocked", "closed", "emergency", "rasta roko", "strike", "road block"]):
        urgency = "high"
    elif any(k in text_lower for k in ["slow", "slow moving", "delay", "ನಿಧಾನಗತಿ"]):
        urgency = "medium"
    elif any(k in text_lower for k in ["normal", "no problem", "clear", "ಮೂವ್ಮೆಂಟ್ ಸಾಮಾನ್ಯ"]):
        urgency = "low"
        
    return sub_cause, urgency

def enrich_text_descriptions(csv_path):
    print("Starting description text enrichment...")
    df = pd.read_csv(csv_path, low_memory=False)
    
    enriched_data = {}
    
    # Fill description nulls and enrich
    df['description'] = df['description'].fillna("")
    
    count = 0
    for idx, row in df.iterrows():
        event_id = row['id']
        desc = row['description']
        
        if not desc:
            continue
            
        lang = detect_language(desc)
        sub_cause, urgency = extract_sub_cause_and_urgency(desc)
        translation = get_translated_text(desc, lang)
        
        # Simple landmark detector: extract uppercase words or specific patterns
        landmarks = []
        if isinstance(row['address'], str):
            # Extract landmarks like 'Jalahalli Cross', 'Mekhri Circle' etc.
            match = re.search(r'([A-Za-z0-9\s]+Circle|[A-Za-z0-9\s]+Junction|[A-Za-z0-9\s]+Cross|[A-Za-z0-9\s]+Stadium|[A-Za-z0-9\s]+Flyover)', row['address'])
            if match:
                landmarks.append(match.group(1).strip())
                
        enriched_data[event_id] = {
            "id": event_id,
            "detected_language": lang,
            "refined_sub_cause": sub_cause,
            "urgency": urgency,
            "landmarks": list(set(landmarks)),
            "english_translation": translation
        }
        count += 1
        
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(SCRIPT_DIR, "artifacts")
    os.makedirs(output_dir, exist_ok=True)
    
    output_path = os.path.join(output_dir, "text_enrichment.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(enriched_data, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully enriched {count} descriptions and saved to {output_path}")

if __name__ == "__main__":
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
    csv_path = os.path.join(PROJECT_ROOT, "dataset", "Astram event data_anonymized.csv")
    enrich_text_descriptions(csv_path)
