import unittest
import urllib.request
import urllib.error
import json

BASE_URL = "http://127.0.0.1:8000/api"

class TestBackendAPI(unittest.TestCase):
    
    def test_01_health_check(self):
        print("Testing /api/health...")
        req = urllib.request.Request(f"{BASE_URL}/health")
        try:
            with urllib.request.urlopen(req) as response:
                self.assertEqual(response.status, 200)
                data = json.loads(response.read().decode('utf-8'))
                self.assertEqual(data["status"], "healthy")
                self.assertEqual(data["timezone"], "Asia/Kolkata")
        except urllib.error.URLError as e:
            self.fail(f"Failed to connect to API server: {e}")

    def test_02_analytics(self):
        print("Testing /api/analytics...")
        req = urllib.request.Request(f"{BASE_URL}/analytics")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("kpis", data)
            self.assertIn("cause_breakdown", data)
            self.assertIn("vehicle_breakdown_types", data)
            self.assertIn("hourly_distribution", data)
            self.assertIn("top_police_stations", data)
            self.assertGreater(data["kpis"]["total_events"], 0)

    def test_03_junctions(self):
        print("Testing /api/junctions...")
        req = urllib.request.Request(f"{BASE_URL}/junctions")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("junctions", data)
            self.assertGreater(len(data["junctions"]), 0)

    def test_04_predict_high_volume(self):
        print("Testing /api/predict for high-volume cause...")
        payload = {
            "cause": "accident",
            "event_type": "unplanned",
            "latitude": 12.9218,
            "longitude": 77.6451,
            "requires_road_closure": False,
            "corridor": "ORR East 1",
            "hour": 9,
            "day_of_week": 1
        }
        req = urllib.request.Request(
            f"{BASE_URL}/predict?testing=true",
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertEqual(data["data_basis"], "learned")
            self.assertEqual(data["predicted_priority"], "high")
            self.assertGreater(data["predicted_duration_minutes"], 0)
            self.assertIn("duration_band", data)
            self.assertIn("closure_probability", data)
            self.assertIn("closure_recommended", data)
            self.assertIn("impact", data)
            self.assertIn("score", data["impact"])
            self.assertIn("class", data["impact"])
            self.assertIn("confidence", data["impact"])
            self.assertIn("explanations", data["impact"])
            self.assertIn("resources", data)
            self.assertGreater(data["resources"]["manpower"]["total_officers"], 0)

    def test_05_predict_low_volume(self):
        print("Testing /api/predict for low-volume cause...")
        payload = {
            "cause": "protest",
            "event_type": "unplanned",
            "latitude": 12.9740,
            "longitude": 77.5452,
            "requires_road_closure": True,
            "corridor": "Non-corridor",
            "hour": 18,
            "day_of_week": 4
        }
        req = urllib.request.Request(
            f"{BASE_URL}/predict?testing=true",
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertEqual(data["data_basis"], "similarity_retrieval")
            self.assertIn("closure_probability", data)
            self.assertIn("impact", data)
            self.assertGreaterEqual(data["impact"]["score"], 0)
            self.assertIn("similar_historical_events", data)
            self.assertGreater(len(data["similar_historical_events"]), 0)

    def test_06_feedback(self):
        print("Testing /api/feedback logging...")
        payload = {
            "event_id": "FKID000001",
            "actual_duration": 45.0,
            "actual_manpower_total": 4,
            "actual_barricades": 10,
            "police_station": "yelahanka",
            "notes": "Test validation log"
        }
        req = urllib.request.Request(
            f"{BASE_URL}/feedback",
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertEqual(data["status"], "success")

    def test_07_feedback_summary(self):
        print("Testing /api/feedback/summary...")
        req = urllib.request.Request(f"{BASE_URL}/feedback/summary")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("logs", data)
            self.assertGreater(len(data["logs"]), 0)
            # Check if our test log is there
            ids = [l["event_id"] for l in data["logs"]]
            self.assertIn("FKID000001", ids)

    def test_08_correlation(self):
        print("Testing /api/correlation...")
        req = urllib.request.Request(f"{BASE_URL}/correlation")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("labels", data)
            self.assertIn("matrix", data)
            self.assertGreater(len(data["labels"]), 0)
            self.assertEqual(len(data["labels"]), len(data["matrix"]))

    def test_09_hotspots(self):
        print("Testing /api/hotspots...")
        req = urllib.request.Request(f"{BASE_URL}/hotspots")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("hotspots", data)
            self.assertGreater(len(data["hotspots"]), 0)
            # Verify required fields in hotspots output (DBSCAN structures)
            first_hs = data["hotspots"][0]
            self.assertIn("police_station_clean", first_hs)
            self.assertIn("incident_count", first_hs)
            self.assertIn("risk_score", first_hs)
            self.assertIn("dominant_cause", first_hs)
            self.assertIn("lat", first_hs)
            self.assertIn("lon", first_hs)

    def test_10_corridor_risk(self):
        print("Testing /api/corridor-risk...")
        req = urllib.request.Request(f"{BASE_URL}/corridor-risk")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("corridor_risks", data)
            self.assertGreater(len(data["corridor_risks"]), 0)
            # Verify required fields in corridor risks output
            first_cr = data["corridor_risks"][0]
            self.assertIn("corridor_clean", first_cr)
            self.assertIn("incident_count", first_cr)
            self.assertIn("risk_score", first_cr)

    def test_11_agent_command(self):
        print("Testing /api/agent/command...")
        payload = {
            "text_report": "Waterlogging on Bellary road near yelahanka. Major flooding, road needs to be closed."
        }
        req = urllib.request.Request(
            f"{BASE_URL}/agent/command?testing=true",
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertIn("parsed_parameters", data)
            self.assertIn("prediction", data)
            self.assertIn("dispatch_briefing", data)
            self.assertEqual(data["parsed_parameters"]["cause"], "water_logging")
            self.assertEqual(data["parsed_parameters"]["corridor"], "Bellary Road 1")
            self.assertTrue(data["parsed_parameters"]["requires_road_closure"])

    def test_12_upload_csv(self):
        print("Testing /api/upload-csv...")
        boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        filename = 'test_upload.csv'
        file_content = "event_cause,event_type,latitude,longitude,requires_road_closure,corridor,police_station\naccident,unplanned,12.9716,77.5946,False,Non-corridor,yelahanka\nwater_logging,unplanned,12.9218,77.6451,True,ORR East 1,yelahanka\n"
        
        body = []
        body.append(f'--{boundary}')
        body.append(f'Content-Disposition: form-data; name="file"; filename="{filename}"')
        body.append('Content-Type: text/csv')
        body.append('')
        body.append(file_content)
        body.append(f'--{boundary}--')
        body.append('')
        
        body_bytes = '\r\n'.join(body).encode('utf-8')
        
        headers = {
            'Content-Type': f'multipart/form-data; boundary={boundary}',
            'Content-Length': str(len(body_bytes))
        }
        
        req = urllib.request.Request(
            f"{BASE_URL}/upload-csv",
            data=body_bytes,
            headers=headers
        )
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertEqual(data["status"], "success")
            self.assertIn("uploaded_records_count", data)
            self.assertIn("total_records_count", data)
            self.assertEqual(data["uploaded_records_count"], 2)

    def test_13_model_diagnostic(self):
        print("Testing /api/model-diagnostic...")
        req = urllib.request.Request(f"{BASE_URL}/model-diagnostic")
        with urllib.request.urlopen(req) as response:
            self.assertEqual(response.status, 200)
            data = json.loads(response.read().decode('utf-8'))
            self.assertTrue(isinstance(data, dict))
            self.assertIn("regression", data)
            self.assertIn("feature_importances", data)
            self.assertIn("duration_model", data["feature_importances"])

if __name__ == "__main__":
    unittest.main()
