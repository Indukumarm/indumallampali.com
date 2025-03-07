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
async function loadReviewList() {
    const reviewsDiv = document.getElementById("newFlashing");
    reviewsDiv.innerHTML = ""; // Clear existing content

    // GitHub API URL to get the list of files in the `reviews/` folder
    const repoOwner = "Indukumarrr"; // Replace with your GitHub username
    const repoName = "indumallampali.com"; // Replace with your repo name
    const reviewsFolder = "reviews"; // Folder where reviews are stored
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${reviewsFolder}`;

    try {
        const response = await fetch(url);
        const files = await response.json();

        files.forEach(file => {
            if (file.name.endsWith(".txt")) {
                const movieTitle = file.name.replace(".txt", "").replace(/-/g, " ").toUpperCase();
                const link = document.createElement("a");
                link.href = `review.html?file=${file.name}`;
                link.textContent = movieTitle;
                link.classList.add("review-link");

                const paragraph = document.createElement("p");
                paragraph.appendChild(link);
                reviewsDiv.appendChild(paragraph);
            }
        });

    } catch (error) {
        console.error("Error fetching review files:", error);
    }
}

// Call function when page loads
document.addEventListener("DOMContentLoaded", loadReviewList);

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
