#  Compliance Management System – Backend

A Node.js + Express backend system to manage organizational compliance tasks with proper role-based access control.

---

##  Features

-  **User Authentication** (JWT)
-  **Role-Based Access** (Admin, Auditor, Employee)
-  **Control Management** by Admins
-  **Task Assignment** linked to Controls
-  **Employee Task Completion + Comments**
-  **Audit Logs** for all critical actions

---

## 🧾 Roles & Permissions

| Feature                  | Admin | Auditor | Employee |
|--------------------------|:-----:|:-------:|:--------:|
| Create/Edit Controls     |  ✅   |    ❌    |    ❌    |
| Assign Controls/Tasks    |  ✅   |    ❌    |    ❌    |
| View Org Data            |  ✅   |    ✅    |  ✅ (own) |
| Complete Task/Add Notes  |  ❌   |    ❌    |    ✅    |
| View Audit Logs          |  ✅   |    ✅    |    ❌    |

---
1. Clone the repo

git clone https://github.com/Subratlitu/complience-control.git
cd complience-control

2. Install dependencies
npm install


3. Add .env file
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


4. Start the server
npm run dev
