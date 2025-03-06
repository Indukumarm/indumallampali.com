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
async function loadReviews() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIkWsryajtIMUlOfuNE_F94R_F6TTtyfs_0vrkQpp_id0PQoA4UPG894fzgC3Oklfua5aiMI8IPLE5/pub?output=csv"; // Replace with actual CSV link

    try {
        const response = await fetch(sheetURL);
        const text = await response.text();
        
        console.log("Fetched Data from Google Sheets:", text); // Debugging Step

        let rows = text.split("\n").map(row => row.split(","));
        console.log("Parsed Rows Before Sorting:", rows); // Debugging Step

        const newList = document.getElementById("new-reviews-list");
        const oldList = document.getElementById("old-reviews-list");
        newList.innerHTML = "";  
        oldList.innerHTML = "";  

        rows.shift(); // Remove header row

        // Convert MM/DD/YYYY format to Date object for sorting
        rows.sort((a, b) => {
            const dateA = new Date(a[3].trim()); 
            const dateB = new Date(b[3].trim());
            return dateB - dateA;
        });

        console.log("Parsed Rows After Sorting:", rows); // Debugging Step

        rows.forEach((row, index) => {
            const [title, content, type, date] = row;

            console.log(`Processing: ${title} - ${date}`); // Debugging Step

            const reviewItem = document.createElement("li");
            reviewItem.className = "list-group-item review-item";
            reviewItem.innerHTML = `
                <a href="#" class="review-title" onclick="toggleReview(${index})">${title}</a>
                <p id="review-${index}" class="review-content" style="display: none;">${content}</p>
            `;

            if (index < 2) {  
                newList.appendChild(reviewItem);
            } else {  
                oldList.appendChild(reviewItem);
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to toggle full review
function toggleReview(index) {
    const reviewContent = document.getElementById(`review-${index}`);
    reviewContent.style.display = (reviewContent.style.display === "none") ? "block" : "none";
}

loadReviews();

// Call the function to load reviews when the page loads
document.addEventListener("DOMContentLoaded", loadReviews);
