# Portfolio Tracker Backend

This is the backend for the Portfolio Tracker application, built with **Express.js**, **MySQL**, and **Yahoo Finance** for real-time stock data fetching.

## Features
- **RESTful APIs**:
  - Add a new stock.
  - Update existing stock details.
  - Delete a stock.
  - Fetch all stocks and calculate the portfolio value.
  - Seach all stocks using its ticker
- **Real-time Stock Data**: Fetches stock prices from Yahoo Finance every minute to keep the data updated.
- **Exception Handling**: Properly handles exceptions and returns meaningful HTTP status codes.
- **Search Functionality**: Search for stocks using ticker symbols from Yahoo Finance.

## Tech Stack
- **Express.js**: Web framework for handling API requests.
- **MySQL**: Database for storing stock details and portfolio information.
- **Yahoo Finance API**: For fetching real-time stock data.
- **Node.js**: Runtime environment for the server.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ShanuRocky/portfolio-backend.git
   cd portfolio-backend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory and add your environment variables:
   - DB_HOST=your-database-host
   - DB_USER=your-database-user
   - DB_PASSWORD=your-database-password
   - DB_NAME=your-database-name
   - PORT=3001

4. Run the development server:
   ```bash
   npm run dev

## Assumptions and Limitations
- The application assumes you have a MySQL database set up with the correct configurations.
- The backend fetches real-time stock prices every minute from Yahoo Finance.

## Deployed Application
- The backend is hosted on Render

## API Documentation
- The backend provides a set of RESTful APIs for managing stocks and fetching real-time data. 
- The API documentation is available at: https://portfolio-backend-ahwd.onrender.com
