💰 Expense Tracker – Full Stack Application (Spring Boot + React + Oracle)

A personal finance management web application that helps users track their income and expenses, visualize spending patterns, and maintain financial discipline.
Built with Spring Boot (Java) for the backend, React.js for the frontend, and Oracle SQL as the database.

🚀 Features

🔐 User Authentication (optional JWT)

➕ Add, Edit, Delete, and View expenses

🧾 Categorize expenses (Food, Travel, Bills, etc.)

📅 Filter by Date Range or Category

📊 Dashboard & Analytics (Total Income, Total Expense, Balance)

📈 Interactive Charts (Bar/Pie using Chart.js or Recharts)

💾 Oracle Database Integration

☁️ Ready for AWS or Oracle Cloud deployment

🏗️ Architecture

Type: Monolithic Full Stack App
Frontend: React.js
Backend: Spring Boot (Java)
Database: Oracle SQL

React (Frontend)
     ↓
Spring Boot REST APIs
     ↓
Oracle Database (via Spring Data JPA)

⚙️ Tech Stack
Layer	Technology
Frontend	React.js, Axios, Bootstrap / Material UI
Backend	Spring Boot, Spring Data JPA, Maven
Database	Oracle SQL
Security	Spring Security + JWT (optional)
Tools	IntelliJ IDEA, VS Code, Postman, Git, Docker (optional)
Deployment	AWS EC2 / Oracle Cloud Free Tier / Render
📁 Folder Structure
Backend – Spring Boot
backend/
 ├── src/main/java/com/expense/tracker/
 │    ├── controller/
 │    │     └── ExpenseController.java
 │    ├── service/
 │    │     └── ExpenseService.java
 │    ├── repository/
 │    │     └── ExpenseRepository.java
 │    ├── model/
 │    │     └── Expense.java
 │    ├── config/
 │    │     └── SecurityConfig.java (if JWT enabled)
 │    └── ExpenseTrackerApplication.java
 ├── src/main/resources/
 │    └── application.properties
 └── pom.xml

Frontend – React
frontend/
 ├── src/
 │    ├── components/
 │    │     ├── ExpenseList.jsx
 │    │     ├── AddExpenseForm.jsx
 │    │     └── Dashboard.jsx
 │    ├── services/
 │    │     └── api.js
 │    ├── App.js
 │    └── index.js
 ├── package.json
 └── public/

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/v1/expense/add	Add a new expense
GET	/api/v1/expense/all	Get all expenses
PUT	/api/v1/expense/update/{id}	Update expense details
DELETE	/api/v1/expense/delete/{id}	Delete an expense
GET	/api/v1/expense/category/{category}	Filter by category
GET	/api/v1/expense/summary	Get total income, expense, and balance
⚙️ Configuration
Backend (Spring Boot)

In application.properties:

spring.datasource.url=jdbc:oracle:thin:@//localhost:1521/XEPDB1
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.Oracle12cDialect
server.port=8080

Frontend (React)

In src/services/api.js:

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

🧠 How It Works

The user adds an expense via a React form.

React sends a REST API request to the Spring Boot backend.

Spring Boot saves or retrieves data from Oracle DB using JPA/Hibernate.

The backend returns the response, and React updates the UI dynamically.

The dashboard computes totals and visualizes expenses via charts.

🧰 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

2️⃣ Backend Setup
cd backend
mvn clean install
mvn spring-boot:run

3️⃣ Frontend Setup
cd frontend
npm install
npm start

4️⃣ Access App

Open http://localhost:3000
 in your browser.

🔐 Optional: JWT Authentication

Login endpoint: /api/v1/auth/login

Register endpoint: /api/v1/auth/register

Use the JWT token in headers for all secured endpoints:

Authorization: Bearer <token>

📊 Future Enhancements

🧮 Monthly Expense Reports

📂 Excel Upload/Download

🖼️ Upload receipts to AWS S3

📱 Mobile responsive design

🧭 Multi-user support with roles

👨‍💻 Author

Karthik Veerla
Full Stack Developer | Java • Spring Boot • React • Oracle • AWS
📧 your.email@example.com

🔗 LinkedIn Profile
