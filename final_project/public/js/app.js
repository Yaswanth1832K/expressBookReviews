// API Base URL
const API_BASE = 'http://localhost:5000';

// API Client Functions
const API = {
    // Get all books
    async getAllBooks() {
        try {
            const response = await fetch(`${API_BASE}/`);
            const data = await response.json();
            return typeof data === 'string' ? JSON.parse(data) : data;
        } catch (error) {
            console.error('Error fetching books:', error);
            return {};
        }
    },

    // Get book by ISBN
    async getBookByISBN(isbn) {
        try {
            const response = await fetch(`${API_BASE}/isbn/${isbn}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching book:', error);
            return null;
        }
    },

    // Search books by author
    async searchByAuthor(author) {
        try {
            const response = await fetch(`${API_BASE}/author/${encodeURIComponent(author)}`);
            return await response.json();
        } catch (error) {
            console.error('Error searching by author:', error);
            return [];
        }
    },

    // Search books by title
    async searchByTitle(title) {
        try {
            const response = await fetch(`${API_BASE}/title/${encodeURIComponent(title)}`);
            return await response.json();
        } catch (error) {
            console.error('Error searching by title:', error);
            return [];
        }
    },

    // Get reviews for a book
    async getReviews(isbn) {
        try {
            const response = await fetch(`${API_BASE}/review/${isbn}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return {};
        }
    },

    // Register new user
    async register(username, password) {
        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering:', error);
            return { message: 'Registration failed' };
        }
    },

    // Login user
    async login(username, password) {
        try {
            const response = await fetch(`${API_BASE}/customer/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                Auth.setUser(username);
            }
            return data;
        } catch (error) {
            console.error('Error logging in:', error);
            return { message: 'Login failed' };
        }
    },

    // Add or update review (authenticated)
    async addReview(isbn, review) {
        try {
            const response = await fetch(`${API_BASE}/customer/auth/review/${isbn}?review=${encodeURIComponent(review)}`, {
                method: 'PUT',
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding review:', error);
            return { message: 'Failed to add review' };
        }
    },

    // Delete review (authenticated)
    async deleteReview(isbn) {
        try {
            const response = await fetch(`${API_BASE}/customer/auth/review/${isbn}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting review:', error);
            return { message: 'Failed to delete review' };
        }
    }
};

// Utility Functions
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    while (stars.length < 5) {
        stars += '☆';
    }

    return stars;
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 5000);
}
