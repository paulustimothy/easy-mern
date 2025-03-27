# Product Store MERN Application

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to manage products.

![screenshot](https://github.com/user-attachments/assets/2e52e180-adf6-4f98-bfcf-205e455c4776)

## Features

- Create and view products
- Responsive design using Chakra UI
- RESTful API backend
- MongoDB database integration
- State management using Zustand

## Tech Stack

### Frontend
- React.js
- Chakra UI
- Zustand (State Management)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/paulustimothy/easy-mern.git
cd easy
```

2. Install backend dependencies and cross-env
```bash
npm install
npm install cross-env --save-dev
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```env
MONGO_URL=your_mongodb_connection_string
PORT=3000
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
# From the root directory
npm run dev
```

2. Start the frontend development server:
```bash
# From the frontend directory
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:3000`

### Production Mode

To build and run the application in production mode:

```bash
# From the root directory
npm run build
npm start
```

## Credit
Special Thanks to As a Programmer
