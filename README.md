#  Expense Tracker - MERN Stack Application

A full-stack web application built with **MongoDB, Express.js, React.js, and Node.js (MERN)** that helps users track their expenses efficiently with intuitive categorization, filtering, and visual analytics.

##  Features

-  **User Authentication** - Secure registration and login with JWT tokens
-  **Add/Edit/Delete Expenses** - Full CRUD operations on expense records
-  **Category-based Tracking** - Organize expenses by categories (Food, Transport, Entertainment, Utilities, Health, Shopping, Other)
-  **Filter & Search** - Filter expenses by category and date range
-  **Analytics Dashboard** - Visual charts showing spending patterns using Recharts
-  **Statistics** - Total spent, average expense, and expense count metrics
-  **Responsive Design** - Mobile-friendly UI that works on all devices
-  **JWT-based Security** - Protected API endpoints with token authentication
-  **Password Hashing** - Secure password storage using bcryptjs

##  Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API routing
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-Origin Resource Sharing for frontend-backend communication

### Frontend
- **React.js** - UI library for building interactive components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Recharts** - Chart library for data visualization
- **CSS3** - Styling with gradients and responsive design

##  Project Structure

```
expense-tracker-mern/
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection setup
│   ├── models/
│   │   ├── User.js        # User schema with password hashing
│   │   └── Expense.js     # Expense schema with categories
│   ├── controllers/
│   │   ├── authController.js      # Auth logic (register, login)
│   │   └── expenseController.js   # Expense CRUD logic
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── expenseRoutes.js  # Expense endpoints
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json
│
└── client/                # Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── ExpenseForm.jsx     # Form to add/edit expenses
    │   │   ├── ExpenseList.jsx     # Table view of expenses
    │   │   └── ExpenseStats.jsx    # Stats and charts
    │   ├── pages/
    │   │   ├── Login.jsx           # Login page
    │   │   ├── Register.jsx        # Registration page
    │   │   └── Dashboard.jsx       # Main dashboard
    │   ├── context/
    │   │   └── AuthContext.jsx     # Auth state management
    │   ├── services/
    │   │   └── api.js              # Axios API client
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── ExpenseForm.css
    │   │   ├── ExpenseList.css
    │   │   └── ExpenseStats.css
    │   ├── App.jsx         # Main app with routing
    │   └── main.jsx        # Entry point
    └── package.json
```

##  Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file with:**
   ```
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   PORT=5000
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start MongoDB:**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update `MONGODB_URI` with your connection string

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

## 📱 How to Run the Application

1. **Start MongoDB:**
   ```bash
   mongod
   ```

2. **Start Backend Server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Start Frontend (in another terminal):**
   ```bash
   cd client
   npm run dev
   ```

4. **Open in Browser:**
   - Navigate to `http://localhost:5173`
   - Register a new account or login

##  API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expense Endpoints (Protected)
- `POST /api/expenses` - Add new expense
- `GET /api/expenses` - Get all expenses (with filters)
- `GET /api/expenses/stats` - Get spending statistics
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

##  AI Tool Usage

### Code0 / Kiro Integration

I used **GitHub Copilot** (AI Development Tool) extensively during development for:

1. **Backend API Development** - Generating Express route handlers and controllers
2. **Database Schema Design** - Creating MongoDB models with proper validation
3. **Authentication System** - Implementing JWT-based auth middleware
4. **React Components** - Building reusable UI components (Form, List, Stats)
5. **API Integration** - Creating Axios service for seamless frontend-backend communication
6. **CSS Styling** - Designing responsive layouts with modern gradients
7. **Error Handling** - Adding proper error boundaries and validation

### Specific Tasks Where AI Was Used:

1. **ExpenseForm Component** - AI generated form state management and validation logic
2. **ExpenseController** - AI created CRUD logic with MongoDB queries and error handling
3. **Dashboard Layout** - AI suggested responsive grid layouts and styling
4. **Auth Middleware** - AI implemented JWT verification and token extraction
5. **Expense Filtering** - AI created query builders for category and date filtering

##  Debugging & Problem Solving

- Handled CORS errors by configuring proper headers in Express
- Fixed password comparison by using bcryptjs's built-in methods
- Resolved token persistence with localStorage caching
- Debugged async/await issues in React useEffect hooks
- Fixed MongoDB connection pooling for production environments

## Sample Usage

1. **Register** → Create new account
2. **Login** → Access dashboard
3. **Add Expense** → Fill form with amount, category, date, description
4. **View Dashboard** → See all expenses and statistics
5. **Filter Expenses** → Filter by category or date range
6. **Edit/Delete** → Modify or remove expenses
7. **View Analytics** → See pie chart of spending by category

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Input validation on server-side
- CORS configuration for safe cross-origin requests
- Error messages don't leak sensitive information

## UI/UX Highlights

- Modern gradient design with purple theme
- Smooth transitions and hover effects
- Modal forms for expense management
- Responsive table view with category badges
- Visual statistics cards
- Interactive pie charts

## Production Deployment

### Backend Deployment (Railway/Render)
- Update `.env` with production MongoDB URI
- Set `NODE_ENV=production`
- Deploy server code

### Frontend Deployment (Vercel/Netlify)
- Update API URL in `services/api.js` to production backend
- Build: `npm run build`
- Deploy dist folder

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Expense Model
```javascript
{
  userId: ObjectId (reference to User),
  amount: Number,
  category: String (enum),
  description: String,
  date: Date
}
```

##  Contributing

Feel free to fork this project and submit pull requests for any improvements.

##  License

This project is open source and available under the MIT License.

## Author

Built as a demonstration of MERN stack development with AI-assisted coding tools.

---
**
