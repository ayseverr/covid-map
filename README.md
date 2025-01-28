# covid-map

# 🌍 COVID-19 Tracker

A React & Redux-Saga based application that allows users to view COVID-19 statistics on an interactive world map.

---

## 🚀 Features
- 🌍 **Interactive World Map**: Click on any country to view its COVID-19 statistics.
- 📊 **Detailed Statistics**: Displays confirmed cases, deaths, recoveries, and last updated date for each country.
- 🔄 **Redux-Saga for API Calls**: Manages API calls efficiently and handles asynchronous operations.
- 🛠 **Unit Testing**: Includes Jest & React Testing Library for core functionality testing.
- 🐳 **Dockerized**: Fully containerized for easy deployment.
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop devices.

---

## 🛠 Installation & Setup

### **1. Clone the Repository**
Clone this repository to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/covid-map.git
cd covid-map

2. Install Dependencies

Install all the necessary dependencies using:

npm install

3. Add Environment Variables
	1.	Go to RapidAPI COVID-19 Statistics and sign up for a free account.
	2.	Generate your API key from RapidAPI.
	3.	Create a .env file in the root directory of your project and add the following:

REACT_APP_RAPIDAPI_KEY=your_api_key_here
REACT_APP_API_BASE_URL=https://covid-19-statistics.p.rapidapi.com



Replace your_api_key_here with your actual API key.

✅ Running the Application

Run Locally

Start the development server:

npm start

The app will be accessible at http://localhost:3000.

🐳 Running with Docker

This project is fully dockerized. Follow these steps to build and run the app using Docker:

1. Build the Docker Image

Run the following command to build the Docker image:

docker build --build-arg REACT_APP_RAPIDAPI_KEY=your_api_key_here \
--build-arg REACT_APP_API_BASE_URL=https://covid-19-statistics.p.rapidapi.com -t covid-map .

2. Run the Docker Container

Run the Docker container using:

docker run --env-file .env -p 3000:3000 covid-map

The app will be accessible at http://localhost:3000.

✅ Running Tests

Run All Tests

Run all unit tests:

npm test

Run Tests for a Specific File

Run tests for a specific component:

npm test -- src/components/Map.test.js

🖥️ Browser Compatibility

The application has been tested on:
	•	✅ Google Chrome
	•	✅ Mozilla Firefox
	•	✅ Safari

It works seamlessly across all devices and screen sizes.

📜 License

This project is open-source and available under the MIT License.

📩 Contact

If you have any questions or suggestions, feel free to open an issue or reach out via GitHub.

---
