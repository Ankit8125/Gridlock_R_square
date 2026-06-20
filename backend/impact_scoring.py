ARTERIAL_CORRIDORS = {
    "orr east 1",
    "orr east 2",
    "orr north 1",
    "orr north 2",
    "orr west",
    "hosur road",
    "tumkur road",
    "mysore road",
    "bellary road 1",
    "bellary road 2",
    "old madras road",
    "bannerghata road",
    "airport road",
}

HIGH_RISK_CAUSES = {
    "accident",
    "construction",
    "water_logging",
    "public_event",
    "procession",
    "protest",
    "vip_movement",
    "tree_fall",
}


def duration_band(minutes):
    if minutes is None:
        return "Unknown"
    if minutes < 60:
        return "Quick"
    if minutes < 180:
        return "Moderate"
    if minutes < 720:
        return "Extended"
    return "Administrative/Stale"


def duration_score(minutes):
    if minutes is None:
        return 0.35
    if minutes < 60:
        return 0.20
    if minutes < 180:
        return 0.45
    if minutes < 720:
        return 0.75
    return 1.00


def impact_class(score):
    if score >= 75:
        return "Critical"
    if score >= 50:
        return "High"
    if score >= 25:
        return "Moderate"
    return "Low"


def confidence_label(data_basis, priority_probability, closure_probability):
    if data_basis == "learned" and priority_probability is not None and closure_probability is not None:
        return "High"
    if data_basis == "similarity_retrieval":
        return "Medium"
    return "Low"


def corridor_score(corridor):
    clean = str(corridor or "").strip().lower()
    if not clean or clean == "non-corridor":
        return 0.15
    if clean in ARTERIAL_CORRIDORS or "orr" in clean:
        return 0.85
    return 0.55


def cause_score(cause):
    clean = str(cause or "").strip().lower()
    if clean in HIGH_RISK_CAUSES:
        return 0.80
    if clean in {"pot_holes", "road_conditions", "congestion"}:
        return 0.55
    return 0.35


def compute_impact_score(
    *,
    predicted_duration_minutes,
    priority_probability,
    closure_probability,
    predicted_priority,
    corridor,
    cause,
    is_peak_hour,
    data_basis,
):
    priority_prob = priority_probability
    if priority_prob is None:
        priority_prob = 0.75 if str(predicted_priority).lower() == "high" else 0.25

    closure_prob = closure_probability
    if closure_prob is None:
        closure_prob = 0.20

    score = (
        32 * priority_prob
        + 24 * closure_prob
        + 18 * duration_score(predicted_duration_minutes)
        + 10 * corridor_score(corridor)
        + 8 * cause_score(cause)
        + 8 * (1.0 if is_peak_hour else 0.0)
    )
    score = int(round(max(0, min(100, score))))

    explanations = []
    if priority_prob >= 0.70:
        explanations.append("High priority probability drives escalation.")
    elif priority_prob <= 0.35:
        explanations.append("Priority signal is currently low.")

    if closure_prob >= 0.60:
        explanations.append("Road-closure probability is high enough to stage barricades early.")
    elif closure_prob >= 0.35:
        explanations.append("Road-closure probability is moderate; keep barricades ready.")

    band = duration_band(predicted_duration_minutes)
    if band in {"Extended", "Administrative/Stale"}:
        explanations.append(f"Predicted clearance band is {band.lower()}, so rotation and monitoring are needed.")

    if corridor_score(corridor) >= 0.80:
        explanations.append("The selected corridor is historically high-impact.")

    if cause_score(cause) >= 0.80:
        explanations.append("The event cause has elevated operational risk.")

    if is_peak_hour:
        explanations.append("The event overlaps Bengaluru peak-hour traffic.")

    if data_basis == "similarity_retrieval":
        explanations.append("Rare event category: estimate is based on nearby similar historical events.")
    elif data_basis == "policy_only":
        explanations.append("Unknown or sparse event category: estimate uses conservative policy defaults.")

    return {
        "score": score,
        "class": impact_class(score),
        "confidence": confidence_label(data_basis, priority_probability, closure_probability),
        "duration_band": band,
        "explanations": explanations,
    }
