# ERP Project Folder & Architecture Diagram

This document provides a visual directory tree, a functional relationship diagram, and an explanation of the core components of the **ERP** project workspace.

---

## 1. Directory Tree

Below is the complete, high-level directory structure of the repository:

```text
erp/ (Project Root)
├── backend/                             # Express.js REST API & container orchestrations
│   ├── src/                             # Backend source code
│   │   ├── controllers/
│   │   │   └── employee.controller.js   # Request handlers and business logic
│   │   ├── db/
│   │   │   └── db.js                    # PostgreSQL database connection client
│   │   ├── routes/
│   │   │   └── employee.routes.js       # Express route handlers for employee endpoints
│   │   ├── app.js                       # Express app configuration & middleware pipeline
│   │   └── server.js                    # Application entry point to start the server
│   ├── .gitignore                       # Node/Docker patterns to ignore in git
│   ├── Dockerfile                       # Multi-stage build manifest for the backend app
│   ├── docker-compose.yml               # Multi-container orchestration (App, DB, Observability)
│   ├── package.json                     # Node.js project manifests & scripts
│   ├── package-lock.json                # Strict locks for installed dependency trees
│   └── README.md                        # Documentation of backend setup and commands
├── frontend/                            # Client-side single-page app directory
│   └── README.md                        # Front-end setup instructions (Currently a placeholder)
└── observability/                       # Shared configurations for logging & metrics
    ├── loki/
    │   └── loki.yml                     # Loki log aggregator configuration
    ├── prometheus/
    │   └── prometheus.yml               # Prometheus scraping interval and targets
    └── promtail/
        └── promtail.yml                 # Promtail log discovery and target definitions
```

---

## 2. Directory Hierarchy Diagram

This flowchart outlines the folder structure and categorized items:

```mermaid
graph TD
    classDef default fill:#1e1e2e,stroke:#cdd6f4,stroke-width:1px,color:#cdd6f4;
    classDef root fill:#f5c2e7,stroke:#cdd6f4,stroke-width:2px,color:#11111b;
    classDef folder fill:#89b4fa,stroke:#cdd6f4,stroke-width:1px,color:#11111b;
    classDef file fill:#a6e3a1,stroke:#cdd6f4,stroke-width:1px,color:#11111b;
    classDef config fill:#fab387,stroke:#cdd6f4,stroke-width:1px,color:#11111b;

    Root["erp/ (Project Root)"]:::root
    
    Backend["backend/ (Express App)"]:::folder
    Frontend["frontend/ (Web UI - Placeholder)"]:::folder
    Obs["observability/ (Telemetry Configs)"]:::folder

    Root --> Backend
    Root --> Frontend
    Root --> Obs

    %% Backend Files
    Src["src/ (Source Code)"]:::folder
    Backend --> Src
    Backend --> B_Docker["docker-compose.yml"]:::config
    Backend --> B_DF["Dockerfile"]:::config
    Backend --> B_PKG["package.json"]:::config
    Backend --> B_RM["README.md"]:::file

    Controllers["controllers/"]:::folder
    Db["db/"]:::folder
    Routes["routes/"]:::folder

    Src --> Controllers
    Src --> Db
    Src --> Routes
    Src --> AppJS["app.js"]:::file
    Src --> ServerJS["server.js"]:::file

    Controllers --> EmpCont["employee.controller.js"]:::file
    Db --> DbJS["db.js"]:::file
    Routes --> EmpRoutes["employee.routes.js"]:::file

    %% Frontend Files
    Frontend --> F_RM["README.md"]:::file

    %% Observability Files
    LokiDir["loki/"]:::folder
    PromDir["prometheus/"]:::folder
    TailDir["promtail/"]:::folder

    Obs --> LokiDir
    Obs --> PromDir
    Obs --> TailDir

    LokiDir --> LokiYML["loki.yml"]:::config
    PromDir --> PromYML["prometheus.yml"]:::config
    TailDir --> TailYML["promtail.yml"]:::config
```

---

## 3. Data Flow & Integration Diagram

Here is how the directories interact dynamically during runtime:

```mermaid
flowchart LR
    subgraph Client Space
        Browser["Web Browser / Postman"]
    end

    subgraph Backend Container [erp-app]
        AppJS["app.js (Express Middleware)"]
        RoutesJS["routes/employee.routes.js"]
        CtrlJS["controllers/employee.controller.js"]
        AppJS --> RoutesJS --> CtrlJS
    end

    subgraph Database Container [erp-postgres]
        PG["PostgreSQL (erp_db)"]
    end

    subgraph Observability Stack
        Prom["Prometheus Container"]
        Loki["Loki Container"]
        Grafana["Grafana Dashboard"]
        Promtail["Promtail Container"]
    end

    %% Client Interactions
    Browser -- "HTTP Request (Port 5001)" --> AppJS
    Browser -- "View Analytics (Port 3000)" --> Grafana

    %% Database Flows
    CtrlJS -- "SQL Queries (db.js)" --> PG

    %% Metrics Flows
    Prom -- "Scrapes Metrics (Port 5000/metrics)" --> AppJS
    Grafana -- "Queries Metrics" --> Prom

    %% Logging Flows
    Promtail -- "Scrapes stdout / docker.sock" --> BackendContainerLogs["Docker Logs"]
    Promtail -- "Ships Logs (Port 3100)" --> Loki
    Grafana -- "Queries Logs" --> Loki
```

---

## 4. Key Components Description

| Path | Primary Responsibility | Detail |
| :--- | :--- | :--- |
| `backend/src/app.js` | Express Pipeline Configuration | Integrates essential security/utilities (cors, helmet, morgan) and the Prometheus `express-prom-bundle` middleware. |
| `backend/src/server.js` | Server Entry Point | Spins up the HTTP listener on the configured port. |
| `backend/docker-compose.yml` | Container Orchestration | Spawns and interconnects the Postgres, App, Prometheus, Loki, Promtail, and Grafana containers. |
| `observability/` | Centralized Telemetry Configs | Groups monitoring files for Prometheus, Loki, and Promtail outside of application-specific dirs. |
