# 💰 InvestBuddy: Modern Microservices Architecture 🌐

---

## 🔍 Project Overview
Welcome to the **InvestBuddy** project! This platform is designed to deliver **innovative** and **cutting-edge financial services** using a modern, scalable, and predictive microservices-based architecture deployed on AWS. ✨

### 🌟 Why This Project?
InvestBuddy bridges the gap between modern financial needs and robust technology, offering:
- **Scalable architecture** to handle high-volume transactions.
- **Advanced predictive capabilities** for insightful decision-making.
- **User-centric design** for a seamless experience.

## 🕹️ Workflow Diagram

### 🔄 Project Workflow
![image](https://github.com/user-attachments/assets/8b2fe604-7d63-479b-86fd-47a2dfe5c5a9)

> This diagram illustrates interactions between microservices, the frontend, backend. It showcases the data flow and modularity of the system.

---

### 🔧 Key Components
- **Backend**: Microservices built with Spring Boot for modularity.
- **Predictive Analysis**: scikit-learn for market trend forecasting and credit risk evaluation.
- **Deployment**: Cloud-native setup with Docker, Kubernetes (EKS), and Terraform.
- **Frontend**: Angular for an intuitive and responsive user interface.
- **Messaging**: Kafka ensures asynchronous, reliable inter-service communication.

## 🖼️ Screenshots
### 🏠 Home Page
![image](https://github.com/user-attachments/assets/b20afe23-cb55-4b97-9f1b-cdb91d955d41)

### 🔑 Login Page
![image](https://github.com/user-attachments/assets/6f2bbafb-b979-4bfe-8538-a1373aae20a6)

### 📝 Registration Page
![image](https://github.com/user-attachments/assets/9c34c0e5-78e6-4495-9ce0-a0b4e3699f6c)

### 🕵️ KYC Verification
![image](https://github.com/user-attachments/assets/3e00db3e-8187-431d-9de9-8b81cfef02a3)

### 🏠 User Dashboard
![image](https://github.com/user-attachments/assets/a8517ad3-1b50-42c0-99ad-66e99742a247)

### 📧 Email Verification Notification
![image](https://github.com/user-attachments/assets/95b143a3-c97c-44d8-90a2-9c165e6a6052)

### 📊 Prediction Dashboard
![image](https://github.com/user-attachments/assets/c7ee1bdc-c812-43f1-babe-5cb6e98eb1e4)

![image](https://github.com/user-attachments/assets/4ff806d2-0df4-4739-a621-54b8d5ee08bb)

---
### 🎯 Project Objectives
1. Deliver scalable financial transaction and account management services.
2. 📈 Utilize predictive analytics for market trends and credit risk evaluations.
3. 📊 Real-time dashboards to provide financial insights and system monitoring.
4. ⚙️ Integrate a seamless CI/CD pipeline powered by cutting-edge DevOps practices.
![image](https://github.com/user-attachments/assets/5110cc60-b529-4f08-bf91-448e8f70e08d)

---

## 🗃️ Frontend Repository Structure
Below is the detailed structure of the Angular frontend repository:

```plaintext
src/app
├── components
│   ├── email-verif-notif
│   ├── kyc-pending
│   ├── kyc-verification
│   ├── login-page
│   ├── register-page
│   ├── user-dashboard
│   ├── user-profile
│   ├── verification-success
│   └── shared
│       ├── particules-dash
│       └── three-particles
├── guards
│   └── kyc.guard.ts
├── services
│   ├── auth.service.ts
│   ├── kyc.service.ts
│   ├── session-service.service.ts
│   └── user-profile.service.ts
└── shared
    └── navbar
```

### 🔹 Key Highlights
- **Authentication**: Login and registration flows using token-based authentication with user ID.
- **KYC Workflow**: Components for pending, approved, and declined states.
- **Dashboard**: Personalized user dashboard with real-time financial insights.
- **Responsive Design**: Seamlessly adapts to all devices.

---

## 🌍 Frontend Features

### 1. 🔑 Authentication Flow
- Token-based login and registration processes.
- Email verification integrated with notifications.

### 2. ✅ KYC Verification
- Dynamic handling of KYC statuses: pending, approved, and declined.
- Real-time API integration for KYC status retrieval.

### 3. 🏛️ User Dashboard
- Financial account management and real-time prediction insights.
- Integration with predictive backend services for trend visualization.

### 4. 🖥️ Component Breakdown
- **email-verif-notif**: Displays email verification notifications.
- **kyc-pending**: Shows KYC status as pending and prompts for necessary actions.
- **kyc-verification**: Manages KYC form submission and status updates.
- **login-page**: Handles user login with token-based authentication.
- **register-page**: User registration with email and password.
- **user-dashboard**: Displays user financial data and predictive insights.
- **user-profile**: Allows users to manage and update their profiles.
- **verification-success**: Confirms successful verification of user credentials.
- **particules-dash & three-particles**: Adds dynamic and interactive visuals to enhance user experience.

### 5. 📱 Responsive Design
- Fully responsive UI for mobile, tablet, and desktop devices.

---




## 🛠️ Installation and Setup

### 🔧 Prerequisites
1. Node.js and Angular CLI installed on your machine.
2. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```

### 🔄 Installation Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   ```plaintext
   API_URL=https://api.example.com
   MAILGUN_API_KEY=your_mailgun_api_key
   KAFKA_BROKER_URL=your_kafka_broker_url
   ```
3. Run the application locally:
   ```bash
   ng serve
   ```
4. Access the application at `http://localhost:4200`.

---

## 🕵️ Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 🎯 Additional Notes
- **DevOps Tools**: The project leverages Jenkins, Terraform, and Kubernetes for seamless CI/CD.
- **Predictive Models**: scikit-learn models deployed to predict financial market trends and assess credit risks.
- **Frontend Role**: Ensures an engaging and secure user experience.

---

### 💎 License
[MIT License](LICENSE)

---

### 📢 Contact
For any questions, please reach out to the project maintainer:
- **Email**: mohamed.barbych@etu.uae.ac.ma
- **LinkedIn**: [Click Here](https://www.linkedin.com/in/mohamed-barbych-42217b276/)
