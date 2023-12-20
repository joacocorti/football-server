# Football Data Service

Welcome to the Football Data Service, an application designed to manage football-related data including teams, players, and match details. This service uses PostgreSQL as its database and provides an API to interact with the stored data.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (v14 or later recommended)
- PostgreSQL installed and running
- Yarn package manager (optional, but recommended)

## Setting up the Database

1. **Create PostgreSQL Database:**
   - Launch PostgreSQL and create a new database named `football`.

2. **Create Tables:**
   - Within the `football` database, create the following tables:
     - `teams`: To store team data.
     - `team_players`: To store player data.
     - `matches`: To store match data.
   - Refer to the structure defined in the application code for column details.

## Installation

1. **Clone the Repository:**
   ```sh
   git clone git@github.com:joacocorti/football-server.git

   cd football-server

2. **Install Dependencies:**
   ```sh
    yarn install
## Environment Variables:

Copy the .env.example file to a new file named .env.
Fill in the environment variables including PostgreSQL credentials and any API keys needed.

## Running the Application
   
**Start the Server:**
  
    yarn run dev
     
This will start the server on localhost:4000.

## Running Cron Job:

The application includes a cron job that fetches and saves data daily at midnight. Ensure your system's date and time settings are correct.

# Testing
**Run Tests:**

    yarn test


This command runs the test suite defined in teamRoutes.test.js and teamController.test.js.

## API Endpoints

#### The service provides several endpoints to interact with football data:

GET /teams: Fetch all teams.

GET /teams/:teamId/matches: Get matches for a specific team.

GET /teams/:teamId/players: Get players of a specific team.

GET /teams/:teamId: Get specific team details.
