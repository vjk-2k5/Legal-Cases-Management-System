# Legal Cases Management System

## Introduction

The **Legal Cases Management System** is a web-based application designed to assist law firms and legal professionals in managing cases, appointments, clients, and lawyers efficiently. The system streamlines the workflow by providing functionalities for scheduling appointments, tracking case statuses, and managing client and lawyer information.

---

## Features

- **Case Management**: Create, update, and track legal cases with details such as status, next hearing date, and associated clients and lawyers.
- **Appointment Scheduling**: Schedule appointments between clients and lawyers with specified date, time, and location.
- **User Roles and Authentication**:
  - Secure authentication system with protected routes based on user roles (client, lawyer, administrator).
  - **Clients**: Access to personal case information and appointments.
  - **Lawyers**: Manage cases, appointments, and add case notes.
- **Location Management**: Utilize predefined courtroom locations using TypeScript enums.
- **Notes and Collaboration**: Add and manage notes related to cases for better collaboration between legal professionals.

---

## Technology Stack

### Frontend

- **Framework**: Next.js (React) with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: NextUI
- **State Management**: React Hooks and Context API
- **Routing**: Next.js Routing

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **ORM**: TypeORM

---

## Prerequisites

- **Node.js** (v14 or newer)
- **npm** (v6 or newer) or **Yarn** (v1.22 or newer)
- **PostgreSQL** (v12 or newer)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/RO-HIT17/Legal_Cases_Management_System.git
cd Legal_Cases_Management_System
```

---

### 2. Backend Setup

1. Navigate to the `server` Directory:
   ```bash
   cd server
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `server` directory and add the following:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/yourdatabase
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   Replace `username`, `password`, `yourdatabase`, and `your_jwt_secret` with your actual PostgreSQL credentials and a secret key for JWT.


4. Start the Server:
   ```bash
   npm start
   ```
   The backend server should now be running on [http://localhost:5000](http://localhost:5000).

---

### 3. Frontend Setup

1. Navigate to the `client` Directory:
   ```bash
   cd client
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   If your frontend requires environment variables, create a `.env.local` file in the `client` directory.

4. Start the Frontend Application:
   ```bash
   npm run dev
   ```
   The frontend application should now be running on [http://localhost:3000](http://localhost:3000).

---

## Usage

### User Registration:
- Clients and lawyers can register by providing personal details.
- Role selection determines the access level (client or lawyer).

### Login:
- Secure authentication using JWT tokens.
- Access to protected routes and functionalities based on user role.

### Dashboard:
- **Clients**: View personal cases, appointments, and update profiles.
- **Lawyers**: Manage assigned cases, view appointments, and add case notes.

### Case Operations:
- Create new cases with details like title, status, and associated parties.
- Update case information and track status changes.
- View case details and associated notes.

### Appointment Management:
- Schedule appointments specifying date, time, and courtroom location.
- View upcoming appointments.
- Integration with calendar systems (future enhancement).

### Locations:
- Select courtroom locations from predefined options managed using TypeScript enums.

---

## Project Structure

```
Legal_Cases_Management_System/
├── server/               # Backend code
│   ├── src/              # Source files
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
├── client/               # Frontend code
│   ├── src/              # Source files
│   ├── public/           # Public assets
│   ├── .env.local        # Environment variables
│   └── package.json      # Frontend dependencies
└── README.md             # Documentation
```

---

## Future Enhancements

- Integration with calendar services for appointments.
- Advanced analytics for case trends and lawyer performance.
- Multi-language support.

---