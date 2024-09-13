# 🍴 Savoria - Restaurant Website
Savoria is a restaurant website built to provide an interactive and user-friendly experience. It is designed with a modern aesthetic and is built using the PERN stack, which includes PostgreSQL, Express, React, and Node.js. The application also uses additional tools like GraphQL and Apollo Client for data management.

![App Screenshot](/client/public/hero.png)

**Live Demo**: [Watch on youtube](https://youtu.be/TfMRoETMRvA)



## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - ShadcnUi
  - @react-email/components

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Prisma
  - GraphQL
  - Apollo Client

- **Authentication:**
  - JWT && bcryptjs

- **Email Service:**
  - Resend


## Setup and Installation

1. **🌌 Clone the Repository:**

```bash
https://github.com/HmadAfzal/restaurant-website.git
```


2. **👨‍💻 Install Dependencies:**

 For the backend:

```bash
cd server
npm install
```
 For the frontend:

```bash
cd client
npm install
```

3. **📄 Environment Setup (.env File):**

Create a .env file in the server directory with the following variables:

```env
DATABASE_URL=""
JWT_SECRET=""
RESEND_API_KEY=""
```

4. **🏃‍♂️ Run Migrations:**

Apply database migrations using Prisma:

```bash
cd server
npx prisma migrate deploy
```

5. **🕺 Run the Application**

 For the backend:

```bash
cd server
npm run build
npm run dev
```

```bash
cd client
npm run dev
```
The frontend should now be available at http://localhost:3000, and the backend API at http://localhost:4000/graphql.


## Screenshots
![App Screenshot](/client/public/landing.png)
![App Screenshot](/client/public/signup.png)
![App Screenshot](/client/public/login.png)
![App Screenshot](/client/public/login.png)


## Contact
[hmadafzal00@gmail.com](mailto:hmadafzal00@gmail.com)
