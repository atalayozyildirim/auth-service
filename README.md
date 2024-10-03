### NODE JS + MYSQL AUTH SERVICE

#### Project Description
This project aims to build an authentication API using Node.js and MySQL. It allows users to register, login and perform authentication processes.

#### Features
- User registration and login procedures
- Authentication with JWT (JSON Web Token)
- MySQL database integration
- Encryption and security measures

#### Requirements
- Node.js
- MySQL
- Redis
- npm (Node Package Manager)

#### Installation
1. Clone the project:
    ```bash
    git clone <repository-url>
    ```
2. Go to the project directory:
    ```bash
    cd project-directory
    ```
3. Install the necessary packages:
    ```bash
    npm install
    ```
4. Configure the database:
    - Open `prisma/database.js` and enter your MySQL connection details.

5. Create the database and add tables:
    ``bash
    npm run migrate
    ```

#### Usage
1. Start the server:
    ```bash
    npm start
    ```
2. Perform user registration and login using the API.

#### API Endpoints
- **POST /api/auth/register**: New user registration
- **POST** /api/auth/login**: User login
  **POST /api/auth/password/reset** Password reset
  **POST /api/auth/password/change** Password change

Translated with DeepL.com (free version)
