# ERP Backend

This is the backend service for the ERP application, built with Node.js, Express, and PostgreSQL.

> [!IMPORTANT]
> This application **must** be run using Docker. Manual or local local machine installation is not supported.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Docker & Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 🚀 Getting Started with Docker

The only supported way to run the backend is via Docker Compose.

### 1. Start the Containers
From the `backend` directory, run:
```bash
docker-compose up --build
```

### 2. Access the API
- **Backend API:** `http://localhost:5001`
- **Health Check:** `http://localhost:5001/health`

---

## 💾 Initializing the Database (Inside Docker)

> [!WARNING]
> If this is your first time running the containers, **you must insert data into the PostgreSQL container before trying the API endpoints.**

Follow these steps exactly to initialize your database inside the Docker container:

### Step 1: Access the PostgreSQL Shell
Open a new terminal window on your machine and execute this command to enter the running Postgres container:
```bash
docker exec -it erp-postgres psql -U postgres
```

### Step 2: Connect to your database
*The database defined in your `docker-compose.yml` is `erp_db`.*

If your database is named **erp_db**:
```sql
\c erp_db
```

If your database is named **erp**:
```sql
\c erp
```

You should see this confirmation message:
```text
You are now connected to database "erp_db" (or "erp")
```

### Step 3: Create the Employees Table
Run the following SQL statement in the prompt to create the `employees` schema:
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

To verify that the table has been successfully created:
```sql
\dt
```
**Expected Output:**
```text
          List of relations
 Schema |   Name    | Type  |  Owner   
--------+-----------+-------+----------
 public | employees | table | postgres
(1 row)
```

### Step 4: Insert Dummy Data
Populate the table with initial dummy data:
```sql
INSERT INTO employees(name, department)
VALUES ('Rashmi', 'Engineering');
```
**Expected Output:**
```text
INSERT 0 1
```

### Step 5: Verify the Data
Retrieve the row(s) to verify successful insertion:
```sql
SELECT * FROM employees;
```
**Expected Output:**
```text
 id |  name   | department  |         created_at         
----+---------+-------------+----------------------------
  1 | Rashmi  | Engineering | 2026-...
(1 row)
```

### Step 6: Exit PostgreSQL Prompt
Once verified, exit the `psql` command line tool:
```sql
\q
```

---

## 📑 API Endpoints

Use these endpoints to build and test your frontend:

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
- The API URL is **always** `http://localhost:5001`.
- Use `fetch` or `axios` to make requests to the `/employees` endpoint to display and manage employee data.
