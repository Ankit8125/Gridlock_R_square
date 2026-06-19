import pandas as pd

df = pd.read_csv(r"d:\Coding\gridlock\Round 2\dataset\Astram event data_anonymized.csv", low_memory=False)

# Let's inspect a few rows where created_date, start_datetime, and closed_datetime are all present
sample = df[['start_datetime', 'created_date', 'closed_datetime', 'resolved_datetime', 'event_cause']].dropna(subset=['start_datetime', 'created_date', 'closed_datetime']).head(15)

for idx, row in sample.iterrows():
    print(f"Cause: {row['event_cause']}")
    print(f"  Start  : {row['start_datetime']}")
    print(f"  Created: {row['created_date']}")
    print(f"  Closed : {row['closed_datetime']}")
    print("-" * 50)
