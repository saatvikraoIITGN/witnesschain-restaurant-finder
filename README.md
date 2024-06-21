# witnesschain-restaurant-finder

This project is a single-page application (SPA) that allows users to add and search for restaurants by location and display them on a map. The application handles multiple users concurrently and is built using a client-server architecture.

## Hosting

The web app is hosted using Vercel (for client-side) + Render.com (for server side). You can access the application via the following link: [WitnessChain Restaurant Finder](https://deploy-saatvik.vercel.app/).

**Note:** The server is hosted on Render.com's free tier, which may cause the server to spin down after periods of inactivity. If you experience a delay when accessing the application, please wait a moment for the server to spin up again.

## Usage
### Adding a Restaurant
- Click on the map to add a pin, which will auto-fill the latitude and longitude fields.
- Enter the restaurant name and click “Add Restaurant.”

### Searching for Restaurants
- Enter the latitude and longitude coordinates in the search fields.
- Click “Search Restaurants” to display the results on the map.
- The map will automatically adjust to fit the bounds of the search results.

## Features

- Add restaurants with location coordinates by clicking on the map or entering the fields manually.
- Search for restaurants by location and display results on a map.
- Automatically fit the map view to display all search results.
- Concurrency handling for multiple users.


## Technologies and Tools Used
### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Leaflet**: An open-source JavaScript library for interactive maps.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing restaurant data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.

### Deployment

- **Vercel**: Hosting service for frontend applications.
- **Render.com**: Hosting service for backend applications.


## Local Setup 
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/witnesschain-restaurant-finder.git
   cd witnesschain-restaurant-finder
   ```
2. **Set up the server:**
    - Navigate to the server directory:
    ```bash
    cd server
    ```
    - Install server dependencies:
    ```bash
    npm install
    ```
    - Create a .env file in the server directory and add your MongoDB URI:
    ```bash
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    PORT=5001
    ```
3. **Set up the client:**
     - Navigate to the client directory:
       ```bash
       cd ../client
       ```
    - Instal client dependencies:
      ```bash
      npm install
      ```

## Running the application
1. Start the server:
     - From the server directory: 
      ```bash
      npm run dev
      ```
2. Start the client:
    - From the client directory:
     ```bash
     npm start
     ```
3. Access the applicatoin:
     - Open your browser and navigate to:
     ```bash
     http://localhost:3000
     ```
     
