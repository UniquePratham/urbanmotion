# URBANMOTION - Car Rental System

[![Website](https://img.shields.io/badge/website-live-brightgreen)](https://urbanmotion.vercel.app/)

![URBANMOTION](https://via.placeholder.com/800x400?text=URBANMOTION+Car+Rental+System)

URBANMOTION is a cutting-edge car rental system designed to enhance urban mobility by streamlining car rental operations for customers, retailers, and management personnel. With real-time data synchronization, intuitive user interfaces, and robust backend support, URBANMOTION delivers a seamless and efficient car rental experience.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Use-Case Diagram](#use-case-diagram)
- [Installation](#installation)
- [Usage](#usage)
- [System Roles](#system-roles)
- [Non-Functional Requirements](#non-functional-requirements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
URBANMOTION integrates essential features like car inventory management, real-time availability tracking, secure payment systems, and comprehensive administrative tools. It caters to multiple actors including customers, retailers, managers, and admins (CTO, CFO, Owners).

*Live Demo:* [urbanmotion.vercel.app](https://urbanmotion.vercel.app/)

## Screenshots
![Home Page](/public/ss.png "HomePage")
![PaymentPage](/public/ss1.png "PaymentPage")
![My Booking](/public/ss2.png "MyBooking")


---

## Features
- *Car Inventory Management:* Add, update, and remove cars with real-time availability tracking.
- *Online Booking:* Customers can book and return cars with ease.
- *Payment Processing:* Secure handling of payments and fines.
- *Automated Notifications:* Alerts for bookings, returns, and overdue payments.
- *Role-Based Access Control:* Admins, retailers, customers, and managers have distinct privileges.
- *Performance Optimization:* Scalable, responsive design handling up to 10,000 concurrent users.
- *Multi-Platform Accessibility:* Supports web and mobile interfaces.

---

## System Architecture
URBANMOTION follows a modular architecture with the following components:
- *Frontend:* React.js for dynamic and responsive user interfaces.
- *Backend:* Node.js with Express for robust API handling.
- *Database:* MongoDB for scalable and secure data storage.
- *Hosting:* Vercel for seamless deployment.
- *Payment Gateway:* Integration with Stripe for secure payment processing.

---

## Use-Case Diagram
![Use-Case Diagram](/public/usecase%20diagram.png "Use-Case Diagram")

The use-case diagram outlines the interactions between actors (customers, retailers, managers, and admins) and the URBANMOTION system. It highlights key functionalities such as booking cars, managing inventory, processing payments, and generating reports.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (or any compatible database)

### Steps
1. Clone the repository:
   bash
   git clone https://github.com/username/urbanmotion.git
   
2. Navigate to the project directory:
   bash
   cd urbanmotion
   
3. Install dependencies:
   bash
   npm install
   
4. Configure environment variables in a .env file:
   env
   DB_URI=<Your_MongoDB_URI>
   PAYMENT_GATEWAY_KEY=<Your_Stripe_Key>
   
5. Start the development server:
   bash
   npm start
   
6. Access the application at http://localhost:3000.

---

## Usage

### Customer
- Sign up or log in.
- Browse available cars and book rentals.
- Manage bookings and make payments.

### Retailer
- Add, update, and manage car inventory.
- Monitor rental statuses and revenue.

### Manager/Admin
- Oversee operations and ensure system functionality.
- Generate reports on rentals and revenue.
- Manage users and roles.

---

## System Roles

1. *Customer:*
   - Book and return cars.
   - Manage rentals and payments.

2. *Retailer:*
   - Maintain car inventory and rental operations.

3. *Manager:*
   - Monitor daily operations and car conditions.

4. *Admin (CTO, CFO, Owner):*
   - Perform high-level administrative tasks and decision-making.

---

## Non-Functional Requirements
- *Performance:* Respond to user actions within 2 seconds for 95% of transactions under a load of 10,000 concurrent users.
- *Security:* Role-based access control and encrypted communication.
- *Scalability:* Supports future growth in user base and features.
- *Accessibility:* Compliant with accessibility standards for diverse users.

---

## Contributing
We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
   bash
   git checkout -b feature-name
   
3. Commit your changes:
   bash
   git commit -m "Add new feature"
   
4. Push to the branch:
   bash
   git push origin feature-name
   
5. Submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For inquiries or support, reach out to us:

*Email:* support@urbanmotion.com  
*Website:* [urbanmotion.vercel.app](https://urbanmotion.vercel.app/)

---

Thank you for choosing URBANMOTION!