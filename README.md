# BookHub - Premium Book Review Platform 📚

A modern, full-stack book review application featuring a premium Navy & Gold aesthetic, glassmorphism design, and seamless user experience. Built with Express.js backend and vanilla JavaScript frontend.

## 🌟 Features

### Premium UI/UX
- **Navy & Gold Theme**: Sophisticated color palette with glassmorphism effects
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Hero Section**: Eye-catching landing page with gradient background
- **Book Grid**: Beautiful card layout with cover images and ratings

### Core Functionality
- **Browse Books**: Explore a curated collection of 10 classic literary works
- **Search**: Find books by title, author, or ISBN
- **User Authentication**: Secure JWT-based registration and login
- **Reviews**: Add, edit, and delete your book reviews (authenticated users)
- **Book Details**: View comprehensive information including descriptions, ratings, and all reviews

### Technical Highlights
- **REST API**: Clean Express.js backend with organized routes
- **Session Management**: JWT tokens with express-session
- **LocalStorage Auth**: Client-side authentication state management
- **Async/Await**: Modern JavaScript for API communication
- **No Framework Frontend**: Pure HTML/CSS/JavaScript for maximum performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yaswanth1832K/expressBookReviews.git
   cd expressBookReviews/final_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to: `http://localhost:5000`

## 📖 Usage Guide

### Browsing Books
1. Visit the homepage to see all available books
2. Use the quick search bar to filter by title or author
3. Click on any book card to view detailed information

### User Registration
1. Click "Register" in the navigation bar
2. Enter a unique username and password
3. Confirm your password and submit
4. You'll be redirected to the login page

### Adding Reviews
1. Login to your account
2. Navigate to any book detail page
3. Scroll to the "Add Your Review" section
4. Write your review and click "Submit Review"
5. Your review will appear immediately with your username

### Managing Reviews
- **Edit**: Submit a new review for the same book (overwrites previous)
- **Delete**: Click the "Delete Review" button on your own reviews

### Advanced Search
1. Click "Search" in the navigation
2. Select search type (Title, Author, or ISBN)
3. Enter your query and click "Search"
4. Results will display in a grid format

## 🛠️ Technology Stack

### Backend
- **Express.js 4.18.1**: Web application framework
- **JWT (jsonwebtoken 8.5.1)**: Authentication tokens
- **express-session 1.17.3**: Session management
- **Axios 1.13.2**: HTTP client for async operations
- **Nodemon 2.0.19**: Development auto-reload

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom variables, animations, glassmorphism
- **JavaScript (ES6+)**: Async/await, fetch API, modules
- **Google Fonts**: Outfit font family

## 📁 Project Structure

```
expressBookReviews/
└── final_project/
    ├── public/                 # Frontend files
    │   ├── css/
    │   │   └── style.css      # Premium styling
    │   ├── js/
    │   │   ├── app.js         # API client
    │   │   └── auth.js        # Authentication
    │   ├── index.html         # Homepage
    │   ├── book-detail.html   # Book detail page
    │   ├── login.html         # Login page
    │   ├── register.html      # Registration page
    │   └── search.html        # Search page
    ├── router/
    │   ├── auth_users.js      # Authenticated routes
    │   ├── general.js         # Public routes
    │   └── booksdb.js         # Books database
    ├── index.js               # Server entry point
    └── package.json           # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary (Navy)**: `#1a3a52` - Navigation, headings, buttons
- **Secondary (Gold)**: `#d4af37` - Accents, highlights, ratings
- **Accent (Teal)**: `#00d2ff` - Links, hover states
- **Background**: `#f5f5f5` - Page background
- **Card**: `rgba(255, 255, 255, 0.85)` - Glassmorphism cards

### Typography
- **Font Family**: Outfit (Google Fonts)
- **Headings**: 800 weight, Navy color
- **Body**: 400 weight, Dark gray
- **Special**: Gradient text effects on hero

### Components
- **Glassmorphism Cards**: Frosted glass with backdrop blur
- **Hover Lift**: translateY(-12px) + scale(1.02)
- **Star Ratings**: Gold stars (★) with half-star support
- **Rounded Buttons**: 50px border-radius with gradients

## 🔌 API Endpoints

### Public Routes
- `GET /` - Get all books
- `GET /isbn/:isbn` - Get book by ISBN
- `GET /author/:author` - Search books by author
- `GET /title/:title` - Search books by title
- `GET /review/:isbn` - Get reviews for a book
- `POST /register` - Register new user

### Authenticated Routes (require login)
- `POST /customer/login` - Login user
- `PUT /customer/auth/review/:isbn` - Add/update review
- `DELETE /customer/auth/review/:isbn` - Delete review

### Async Routes (Tasks 10-13)
- `GET /async/books` - Async get all books
- `GET /async/isbn/:isbn` - Async get by ISBN
- `GET /async/author/:author` - Async search by author
- `GET /async/title/:title` - Async search by title

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads with all 10 books
- [ ] Quick search filters books correctly
- [ ] Book detail page shows cover, info, and reviews
- [ ] Registration creates new user
- [ ] Login authenticates and stores session
- [ ] Logged-in users can add reviews
- [ ] Users can delete their own reviews
- [ ] Search by title/author/ISBN returns correct results
- [ ] Responsive design works on mobile/tablet
- [ ] Navigation updates based on auth status

### API Testing (using curl)
```bash
# Get all books
curl http://localhost:5000/

# Get book by ISBN
curl http://localhost:5000/isbn/1

# Search by author
curl http://localhost:5000/author/Jane%20Austen

# Register user
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

## 🐛 Troubleshooting

### Server won't start
- **Issue**: Port 5000 already in use
- **Solution**: Kill existing process or change port in `index.js`

### Books not loading
- **Issue**: API returns empty object
- **Solution**: Check `booksdb.js` is properly formatted
- **Solution**: Verify static files are being served

### Reviews not submitting
- **Issue**: 403 Forbidden error
- **Solution**: Ensure you're logged in
- **Solution**: Check JWT token in session storage

### Styles not loading
- **Issue**: CSS file returns 404
- **Solution**: Verify `express.static('public')` is configured
- **Solution**: Check file path is `/css/style.css` not `css/style.css`

## 📝 License

This project is part of an educational assignment and is available for learning purposes.

## 🙏 Acknowledgments

- **Book Data**: Classic literature from Open Library
- **Cover Images**: Open Library Covers API
- **Fonts**: Google Fonts (Outfit)
- **Inspiration**: Modern book review platforms

## 👨‍💻 Developer

**Yaswanth**
- GitHub: [@Yaswanth1832K](https://github.com/Yaswanth1832K)

---

**Built with ❤️ for book lovers everywhere**