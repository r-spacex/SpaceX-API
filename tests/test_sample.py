import unittest
import requests

class TestSpaceXAPI(unittest.TestCase):

    BASE_URL = "https://api.spacexdata.com/v4"

    def test_latest_launch(self):
        url = f"{self.BASE_URL}/launches/latest"
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        #checks to make sure that there is a response of a name, date, and a rocket that is used in the launch
        self.assertIn("name", data)
        self.assertIn("date_utc", data)
        self.assertIn("rocket", data)

    def test_all_rockets(self):
        url = f"{self.BASE_URL}/rockets"
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        if data:  # checks to see that there is at least one rocket in the response that is received from the API
            self.assertIn("name", data[0])
            self.assertIn("active", data[0])
            self.assertIn("stages", data[0])

if __name__ == '__main__':
    unittest.main()