import pandas as pd
import numpy as np

cleaned_csv = r"d:\Coding\gridlock\Round 2\backend\artifacts\cleaned_events.csv"
df = pd.read_csv(cleaned_csv)

print("Priority counts:")
print(df['priority_clean'].value_counts())

print("\nCorridor vs Priority Crosstab:")
crosstab = pd.crosstab(df['corridor_clean'], df['priority_clean'], margins=True)
print(crosstab)

print("\nChecking if priority is perfectly predicted by corridor:")
corridor_priority_counts = df.groupby('corridor_clean')['priority_clean'].nunique()
print(corridor_priority_counts)

print("\nLet's check if any corridor has both high and low priority events:")
for corridor, group in df.groupby('corridor_clean'):
    print(f"Corridor: {corridor} | Priority counts: {group['priority_clean'].value_counts().to_dict()}")

print("\nLet's check the date/time range of the dataset:")
df['start_dt'] = pd.to_datetime(df['start'])
print(f"Min date: {df['start_dt'].min()} | Max date: {df['start_dt'].max()}")
