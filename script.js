// ✅ Navbar Scroll Effect (Place at the very top)
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ✅ Function to Load Movie Reviews List from GitHub (Place after Navbar function)
async function loadReviewList() {
    const reviewsDiv = document.getElementById("newFlashing");
    reviewsDiv.innerHTML = ""; // Clear existing content

    // GitHub API URL to get the list of files in the `reviews/` folder
    const repoOwner = "Indukumarm"; // Replace with your GitHub username
    const repoName = "indumallampali.com"; // Replace with your repo name
    const reviewsFolder = "reviews"; // Folder where reviews are stored
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${reviewsFolder}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch review files.");

        const files = await response.json();

        files.forEach(file => {
            if (file.name.endsWith(".txt")) {
                const movieTitle = file.name.replace(".txt", "").replace(/-/g, " ").toUpperCase();
                const safeFileName = encodeURIComponent(file.name); // Encode filename to prevent URL issues
                const link = document.createElement("a");
                link.href = `review.html?file=${safeFileName}`;
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

// ✅ Function to Load Full Review in `review.html`
async function loadReview() {
    const urlParams = new URLSearchParams(window.location.search);
    let fileName = urlParams.get("file");

    if (!fileName) {
        showError("Invalid or missing review file.");
        return;
    }

    fileName = decodeURIComponent(fileName); // Decode the file name
    if (!/^[a-zA-Z0-9-_ ]+\.txt$/.test(fileName)) {
        showError("Invalid file format.");
        return;
    }

    const repoOwner = "Indukumarm"; // Your GitHub Username
    const repoName = "indumallampali.com"; // Your Repository Name
    const reviewsFolder = "reviews"; // Folder where reviews are stored

    const rawFileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${reviewsFolder}/${fileName}`;

    try {
        const response = await fetch(rawFileUrl);
        if (!response.ok) throw new Error("Review not found.");

        const content = await response.text();
        document.getElementById("review-title").textContent = fileName.replace(".txt", "").replace(/-/g, " ").toUpperCase();
        document.getElementById("review-content").textContent = content;
        document.getElementById("page-title").textContent = fileName.replace(".txt", "").replace(/-/g, " ") + " - Movie Review";
    } catch (error) {
        showError("Review not found.");
    }
}

// ✅ Function to Show Error Message
function showError(message) {
    document.getElementById("review-title").textContent = "Error";
    document.getElementById("review-content").textContent = message;
}

// ✅ Run Functions After Page Loads (Final Section of script.js)
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("newFlashing")) {
        loadReviewList();  // Load the movie list on the review page
    } else {
        loadReview();  // Load the full review content on review.html
    }
});
