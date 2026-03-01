# SUVIDHA OneTouch - Backend Architecture

This project implements a **Modular Monolith** architecture designed to be easily split into true microservices for hybrid cloud deployment.

## Architecture Overview

The backend is built with **Node.js, Express, and PostgreSQL**. It uses an API Gateway pattern to route requests to distinct service modules.

### Services

1. **Auth Service** (`/api/v1/auth`): Handles citizen and admin authentication, JWT generation, and role-based access control.
2. **Billing Service** (`/api/v1/billing`): Manages utility bills (Electricity, Water, Gas), payment processing, and transaction history.
3. **Grievance Service** (`/api/v1/grievance`): Handles lodging, tracking, and resolving citizen complaints.
4. **Admin Service** (`/api/v1/admin`): Provides analytics, dashboard stats, and management capabilities for municipal staff.
5. **Notification Service** (`/api/v1/notification`): Manages SMS, Email, and in-app alerts for citizens.

## Folder Structure

```text
server/
├── config/
│   └── db.ts             # Shared PostgreSQL connection pool
├── services/
│   ├── admin/            # Admin Microservice
│   ├── auth/             # Authentication Microservice
│   ├── billing/          # Billing & Payments Microservice
│   ├── grievance/        # Grievance Redressal Microservice
│   └── notification/     # Notification Microservice
└── index.ts              # API Gateway / Router
```

## Deployment (Docker & Hybrid Cloud)

The provided `docker-compose.yml` sets up:
- The Node.js API Gateway
- A PostgreSQL database
- A Redis instance (for caching/rate-limiting)

### Scaling to True Microservices
To deploy this in a Kubernetes or Hybrid Cloud environment:
1. Extract each folder inside `server/services/` into its own repository or Docker container.
2. Replace the Express `apiGateway` with a true API Gateway (like Kong, NGINX, or AWS API Gateway).
3. Give each service its own isolated PostgreSQL database schema.
4. Implement an event bus (like RabbitMQ or Kafka) for inter-service communication (e.g., Billing service telling Notification service to send an SMS).
