# DevLife — Student Life Manager

> A full-stack MERN application built for hostel students to manage their daily tasks, expenses, and habits — all in one place.

🔗 **Live Demo:** [dev-life-kappa.vercel.app](https://dev-life-kappa.vercel.app)

---

## 🚀 Features

- **Authentication** — Secure register/login with JWT tokens and bcrypt password hashing
- **Task Manager** — Add, view, and delete daily tasks with completion status
- **Expense Tracker** — Track income and expenses with purpose categorization
- **Habit Tracker** — Build and monitor daily/weekly habits
- **Dashboard** — Real-time summary of tasks, expenses, and habit completion
- **Protected Routes** — Unauthorized users redirected to login
- **Responsive Design** — Works on mobile and desktop

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

**Deployment**
- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

## 📁 Project Structure

```
DevLife/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, ProtectedRoute
│   │   ├── pages/          # Login, Register, Dashboard, Tasks, Expenses, Habits
│   │   └── utils/          # API URL config
│   └── package.json
├── server/                 # Node.js backend
│   ├── middleware/         # JWT auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   └── server.js
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js installed
- MongoDB Compass installed (for local DB)
- Git

### Clone the repo
```bash
git clone https://github.com/vivekyadav-hash/DevLife.git
cd DevLife
```

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server folder:
```
MONGO_URI=mongodb://localhost:27017/devlife
PORT=8080
JWT_SECRET=your_secret_key
```

Start MongoDB server, then:
```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Server port (default 8080) |
| `JWT_SECRET` | Secret key for JWT signing |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

### Habits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habits` | Get all habits |
| POST | `/api/habits` | Add habit |
| PUT | `/api/habits/:id` | Update habit |
| DELETE | `/api/habits/:id` | Delete habit |

---

## 🗺 Roadmap

- [x] JWT Authentication
- [x] Task CRUD
- [x] Expense CRUD
- [x] Habit CRUD
- [x] Dashboard summary
- [x] Responsive design
- [x] Deployment

Future features are : -
- [ ] Mark task/habit as complete from UI
- [ ] Study tracker module
- [ ] AI-powered goal roadmap
- [ ] Friend accountability system
- [ ] Push notifications

---

## 👨‍💻 Author

**Vivek Yadav**
- GitHub: [@vivekyadav-hash](https://github.com/vivekyadav-hash)
- LinkedIn:www.linkedin.com/in/vivek-yadav-50b012275

---

> Built from scratch — not a tutorial clone. Every feature designed, debugged, and deployed independently.
