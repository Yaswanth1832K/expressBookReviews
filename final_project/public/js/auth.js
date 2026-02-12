// Authentication Helper Functions
const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('username') !== null;
    },

    // Get current username
    getUsername() {
        return localStorage.getItem('username');
    },

    // Set user (after login)
    setUser(username) {
        localStorage.setItem('username', username);
    },

    // Logout user
    logout() {
        localStorage.removeItem('username');
        window.location.href = '/';
    },

    // Update navigation based on auth status
    updateNav() {
        const navLinks = document.querySelector('.navbar-nav');
        if (!navLinks) return;

        if (this.isLoggedIn()) {
            const username = this.getUsername();
            navLinks.innerHTML = `
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/search.html" class="nav-link">Search</a></li>
        <li><a href="/add-book.html" class="nav-link">Add Book</a></li>
        <li><span class="nav-link">Welcome, ${username}</span></li>
        <li><a href="#" onclick="Auth.logout(); return false;" class="nav-link">Logout</a></li>
      `;
        } else {
            navLinks.innerHTML = `
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/search.html" class="nav-link">Search</a></li>
        <li><a href="/login.html" class="nav-link">Login</a></li>
        <li><a href="/register.html" class="nav-link">Register</a></li>
      `;
        }
    },

    // Protect page (redirect to login if not authenticated)
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateNav();
});
