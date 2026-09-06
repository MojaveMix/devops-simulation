# Simple CRUD Project

This is a simple CRUD (Create, Read, Update, Delete) application built with **Express**, **MySQL**, **React** (Vite), and **Tailwind CSS**.

## Folder Structure
- `/backend`: The Express server and MySQL database configuration.
- `/frontend`: The React application with Tailwind CSS.

## Prerequisites
- Node.js installed.
- MySQL server running locally.

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or CLI).
2. Execute the `schema.sql` script located in the `backend` folder to create the database and table:
   ```bash
   mysql -u root -p < backend/schema.sql
   ```
   *(Alternatively, copy and paste the contents of `backend/schema.sql` into your SQL client).*

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. (Optional) Check the `.env` file and make sure the MySQL credentials match your local setup.
3. Start the Express server:
   ```bash
   npm run dev
   # or
   node server.js
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the URL provided (usually `http://localhost:5173`).

You should now see the React application where you can Create, Read, Update, and Delete items, connected directly to your local MySQL database.
