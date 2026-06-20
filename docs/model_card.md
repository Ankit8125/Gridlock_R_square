# Model Card: ASTRAM Traffic Obstruction Models

This model card details the training, validation, and diagnostic findings for the machine learning models deployed in the **ASTRAM Obstruction & Event Intelligence Dashboard**.

---

## 1. Model Summary & Target Targets

We train three distinct estimators for high-volume incident causes in Bengaluru:

1. **Duration Regressor**: Estimates the clearance time in minutes for an incident.
   * **Target**: `duration_capped` (Incident duration capped at the 90th percentile to mitigate administrative noise).
   * **Type**: `RandomForestRegressor` (Tuned).
2. **Priority Classifier**: Classifies whether an incident is high or low priority.
   * **Target**: `priority_clean` (`high` or `low`).
   * **Type**: `RandomForestClassifier` (Tuned).
3. **Road Closure Classifier**: Predicts the probability that an incident will require barricading and road closures.
   * **Target**: `requires_road_closure` (Boolean).
   * **Type**: `RandomForestClassifier` (Tuned with balanced class weights).

---

## 2. Validation Methodology & Leakage Checks

### Temporal Validation Split
To verify that our models generalize to future traffic incidents, we perform a chronological temporal split rather than a simple random split:
* **Train Set**: November 9, 2023, to March 9, 2024 (approx. 80% of data).
* **Test Set**: March 10, 2024, to April 8, 2024 (approx. 20% of data).
This setup prevents temporal leakage of city-wide construction surges, seasonal monsoons (which affect waterlogging distributions), and changing police department shifts.

### Leakage Diagnostic: Why is Priority Classifier F1-Score 100%?
During evaluation, the priority classifier achieved a perfect **100% test accuracy and F1-score**. We conducted an ablation study and cross-tabulation check to identify target leakage.

#### Corridor vs. Priority Cross-Tabulation:
* **Corridor Incidents**: 1,893 events on corridors $\rightarrow$ **1,887 High Priority** ($99.7\%$), **6 Low Priority** ($0.3\%$).
* **Non-Corridor Incidents**: 3,144 events off-corridors $\rightarrow$ **3,137 Low Priority** ($99.8\%$), **7 High Priority** ($0.2\%$).

#### Finding:
The `priority` target is essentially a deterministic operational label assigned by the traffic logging system based on the presence of a named transit corridor (e.g. Outer Ring Road, Hosur Road). 
* **Remediation**: This is not data leakage or training error; it is a direct encoding of a strict departmental escalation policy. The model learns this operational rule perfectly. For rare causes where the classifier is bypassed, the system falls back to this same rule deterministically.

---

## 3. Duration Regressor Noise & Evaluation Metrics

A major challenge in the ASTRAM dataset is the distribution of incident resolution times:
* **Mean Resolution Time**: **4.3 days** (6,229 minutes)
* **Median Resolution Time**: **64 minutes** (1.07 hours)
* **90th Percentile (p90)**: **11.6 days** (16,708 minutes)

### The Noise Problem:
Many tickets are left open administratively for days or weeks after the physical breakdown or obstruction is cleared. Training directly on uncapped durations causes models to aggressively over-predict.

### Mitigation:
1. We filter out data-entry errors (durations $< 0$).
2. We cap durations at the 90th percentile ($p90$) to limit outlier residuals.
3. We evaluate using **Median Absolute Error (MedAE)** rather than **Mean Absolute Error (MAE)** to assess performance on normal traffic clearance:
   * **Random Forest Regressor Test MedAE**: **55.56 minutes** (Our model's median prediction is within 55 minutes of the actual clearance time).
   * **Gradient Boosting Test MedAE**: **202.73 minutes**.
   * **Hist Gradient Boosting Test MedAE**: **241.11 minutes**.

To ensure honest communication with operators, the dashboard reframes duration predictions into qualitative **Duration Bands** (*Quick*, *Moderate*, *Extended*, *Administrative*) in addition to displaying the numerical $p50$ (median) estimate.

---

## 4. Road Closure Classifier

Road closure prediction is critical for barricade staging. Because road closures are relatively rare ($15.2\%$ of the dataset), we train the classifier using balanced class weights to avoid under-predicting closure need.
* **Test ROC-AUC**: **0.811** (Highly discriminative spatial-temporal features)
* **Test F1-Score**: **0.422**
* **Test Recall**: **0.563** (Ensures that more than 56% of incidents requiring barricading are flagged early)
* **Inference Policy**: If `closure_probability >= 0.50` or the dispatcher manual checkbox is checked, the system triggers road diversion and detour recommendations.
