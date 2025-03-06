// Navbar Scroll Effect
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Function to Load Movie Reviews from Google Sheets
// Function to Fetch Reviews Securely from Google Sheets
async function loadReviews() {
    const API_KEY = "AIzaSyDeMlopwgQH2z604m1LTDZWC8gdw6qYg80"; // Replace with actual API key
    const SHEET_ID = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIkWsryajtIMUlOfuNE_F94R_F6TTtyfs_0vrkQpp_id0PQoA4UPG894fzgC3Oklfua5aiMI8IPLE5/pub?output=csv"; // Replace with actual Google Sheet ID
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched Secure Data:", data);

        // Process & Display Data
        displayReviews(data.values);
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
    }
}

// Function to Display Reviews Dynamically
function displayReviews(reviews) {
    const newFlashingDiv = document.getElementById("newFlashing");
    const olderReviewsDiv = document.getElementById("olderReviews");
    newFlashingDiv.innerHTML = "";
    olderReviewsDiv.innerHTML = "";

    // Get today's date in MM/DD/YYYY format
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    reviews.forEach((review, index) => {
        if (index === 0) return; // Skip headers row

        const [title, content, type, date] = review;
        const reviewDate = new Date(date);
        reviewDate.setHours(0, 0, 0, 0);

        // ✅ Only Sanitize Display Text, Not URLs
        const safeTitle = sanitizeInput(title);
        const safeContent = sanitizeInput(content);

        const link = document.createElement("a");
        link.href = `review.html?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`;
        link.textContent = safeTitle;
        link.classList.add("review-link");

        const paragraph = document.createElement("p");
        paragraph.appendChild(link);

        if (reviewDate >= today) {
            newFlashingDiv.appendChild(paragraph);
        } else {
            olderReviewsDiv.appendChild(paragraph);
        }
    });
}

// ✅ Fix: Apply Sanitization Only to Display Text (Not URLs)
function sanitizeInput(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ✅ Keep Dynamic Content Secure
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-secure]").forEach(el => {
        el.innerHTML = sanitizeInput(el.innerHTML);
    });
});

// Call Function to Load Reviews
loadReviews();

// Call the function to load reviews when the page loads
document.addEventListener("DOMContentLoaded", loadReviews);
