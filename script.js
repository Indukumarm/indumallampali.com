// Navbar Scroll Effect
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Function to Load Movie Reviews List
async function loadReviews() {
    const reviews = ["inception", "interstellar", "the-matrix"]; // List of available reviews
    const newFlashingDiv = document.getElementById("newFlashing");
    const olderReviewsDiv = document.getElementById("olderReviews");
    newFlashingDiv.innerHTML = "";
    olderReviewsDiv.innerHTML = "";

    reviews.forEach(reviewId => {
        const link = document.createElement("a");
        link.href = `review.html?id=${reviewId}`;
        link.textContent = reviewId.replace("-", " ").toUpperCase(); // Format title nicely
        link.classList.add("review-link");

        const paragraph = document.createElement("p");
        paragraph.appendChild(link);

        // Assume first two are new, others are old
        if (newFlashingDiv.children.length < 2) {
            newFlashingDiv.appendChild(paragraph);
        } else {
            olderReviewsDiv.appendChild(paragraph);
        }
    });
}

// Function to Load Full Review in review.html
async function loadReview() {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get("id");

    if (!reviewId) {
        document.getElementById("review-title").textContent = "Review Not Found";
        document.getElementById("review-content").textContent = "Sorry, this review does not exist.";
        return;
    }

    try {
        const response = await fetch(`reviews/${reviewId}.txt`); // Fetch the .txt file
        if (!response.ok) throw new Error("Review not found");

        const content = await response.text();
        document.getElementById("review-title").textContent = reviewId.replace("-", " ").toUpperCase();
        document.getElementById("review-content").textContent = content;
        document.getElementById("page-title").textContent = reviewId.replace("-", " ") + " - Movie Review";
    } catch (error) {
        document.getElementById("review-title").textContent = "Review Not Found";
        document.getElementById("review-content").textContent = "Sorry, this review does not exist.";
    }
}

// Load functions on page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("newFlashing")) {
        loadReviews();
    } else {
        loadReview();
    }
});
