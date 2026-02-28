# Leave Tracker System

A Full Stack Leave Management System built using Spring Boot, Hibernate, MySQL, and React.js.  
The application allows employees to apply for leave and managers to review, approve, or reject requests with role-based authentication.

---

## 🚀 Features

- Role-based login (Employee / Manager)
- Apply for leave with date validation
- Manager approval and rejection workflow
- Automatic leave status updates
- RESTful API integration
- Layered architecture (Controller – Service – Repository)

---

## 🛠 Tech Stack

### Backend
- Java
- Spring Boot
- Hibernate
- JPA
- MySQL
- Maven

### Frontend
- React.js
- Vite
- Axios
- Bootstrap

---

## 📁 Project Structure

```
leaveTrackerSystem
│
├── leavetracker (Spring Boot Backend)
└── leave-tracker-frontend (React Frontend)
```

---

## ⚙️ How to Run the Project

### Backend (Spring Boot)

1. Navigate to backend folder:
   ```
   cd leavetracker
   ```
2. Configure MySQL in `application.properties`
3. Run:
   ```
   mvn spring-boot:run
   ```
Backend runs on:
```
http://localhost:8080
```

---

### Frontend (React)

1. Navigate to frontend folder:
   ```
   cd leave-tracker-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run:
   ```
   npm run dev
   ```

Frontend runs on:
```
http://localhost:5173
```

---

## 🔐 Authentication Flow

- User logs in
- Backend validates credentials
- Role determines dashboard access
- Employees can apply for leave
- Managers can approve or reject leave

---

## 📌 Future Improvements

- JWT Authentication
- Email Notifications
- Leave Balance Tracking
- Admin Dashboard
- Deployment to Cloud

---

## 👨‍💻 Author

Sakib Sheikh  
Java Full Stack Developer