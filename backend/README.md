# ERP Backend

This is the backend service for the ERP application, built with Node.js, Express, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://www.docker.com/products/docker-desktop) (Highly Recommended)
- [Node.js](https://nodejs.org/) (If running without Docker)
- [PostgreSQL](https://www.postgresql.org/download/) (If running without Docker)

---

## 🚀 Getting Started with Docker

The easiest way to get the backend running is using Docker Compose.

1. **Start the containers:**
   From the `backend` directory, run:
   ```bash
   docker-compose up --build
   ```

2. **Access the API:**
   - Backend API: `http://localhost:5001`
   - Health Check: `http://localhost:5001/health`

*Note: Docker will automatically set up the database and the application for you.*

---

## 🛠️ Manual Setup (Without Docker)

If you don't have Docker installed, follow these steps:

### 1. Database Setup
1. Open your PostgreSQL terminal (psql) or a GUI tool like pgAdmin.
2. Create the database:
   ```sql
   CREATE DATABASE erp_db;
   ```
3. Connect to the database and create the `employees` table:
   ```sql
   CREATE TABLE employees (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       department VARCHAR(100) NOT NULL
   );
   ```
4. Insert some initial records:
   ```sql
   INSERT INTO employees (name, department) VALUES 
   ('John Doe', 'Engineering'),
   ('Jane Smith', 'Marketing'),
   ('Mike Johnson', 'Sales');
   ```

### 2. Environment Configuration
Create a `.env` file in the `backend` directory and add your database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=erp_db
```

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

---

## 📑 API Endpoints

Use these endpoints to build your frontend:

### Employees
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/employees` | Retrieve all employees |
| **POST** | `/employees` | Create a new employee |

#### Example POST Request Body:
```json
{
  "name": "Alice Wonderland",
  "department": "Design"
}
```

### Health Check
- **GET** `/health` - Check if the server is running.

---

## 💡 Building the Frontend
When connecting your frontend to this backend:
- If using Docker, the API URL is `http://localhost:5001`.
- If running manually, the API URL is `http://localhost:5000`.
- Use `fetch` or `axios` to make requests to the `/employees` endpoint to display and manage employee data.
