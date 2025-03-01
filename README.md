# Frontend Service

This is the frontend service for the project, built with React and TypeScript. The application is containerized using Docker and can be run using docker compose.

## Prerequisites

- Docker installed on your system

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aliakbarazizi/innoscripta-frontend frontend
cd frontend
```

### 2. Create an .env.local File (Optional)

Define the following environment variable:

```
APP_PORT=8000 # Change as needed
```

### 3. Run the Application

```bash
docker compose up -d
```

The application should now be running on `http://localhost:8000`.
