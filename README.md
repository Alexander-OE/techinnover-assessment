# E-Commerce API

## Project Overview

This project is an E-Commerce API built using NestJS, designed to provide a platform where users can manage products and administrators can oversee both products and users. The API features user registration, authentication, product management, and role-based access control.

### Objectives

- Implement user registration and authentication.
- Ensure role-based access control where only admins can manage users and approve/disapprove products.
- Allow authenticated users to manage their own products.
- Allow unauthenticated users to view only approved products.

## Environment Setup

### Prerequisites

- Node.js 
- npm  
- MongoDB 

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Alexander-OE/techinnover-assessment.git
   cd techinnover-assessment

2. **Install Dependencies**

   ```bash
   npm install

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory of your project and configure the environment variable as shown in the `.env.example` file.

    ```bash
   MONGO_URI=mongodb://localhost:27017/ecommerce
    JWT_SECRET=your_jwt_secret

5. **Run the Application**

   To start the application in development mode, run:

     ```bash
     npm run start:dev
      ```
    The application will run on `http://localhost:3000`.

6. **Swagger Implementation**

   To view all the available APIs, visit:

   ```bash
   http://localhost:3000/api
      ```

 ## API Functionalities
   **User Management**
   
  - **Signup**: Users can register with a name, email, and password.
   
  - **Login**: Users can log in using their email and password.
    
  - **Role-Based Access**:
    
      - Only admins can view, ban, or unban users.
     
      - Banned users cannot log in or interact with the system.

   **Product Management**
   
   - **Authenticated Users**:
     
      - Can create, update, and delete their own products.
        
   - **Admins**:
     
     - Can approve or disapprove products.
       
     - Only approved products are visible to unauthenticated users.
       
   - **Unauthenticated Users**:
   
      - Can view only approved products.
   

   
