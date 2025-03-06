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
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIkWsryajtIMUlOfuNE_F94R_F6TTtyfs_0vrkQpp_id0PQoA4UPG894fzgC3Oklfua5aiMI8IPLE5/pub?output=csv"; // Replace with your actual Google Sheet link
    const response = await fetch(sheetURL);
    const text = await response.text();
    
    const rows = text.split("\n").map(row => row.split(","));
    const newList = document.getElementById("new-reviews-list");
    const oldList = document.getElementById("old-reviews-list");
    newList.innerHTML = "";  
    oldList.innerHTML = "";  

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip headers
        const [title, content, type, date] = row;

        // Assume first 2 reviews are new, the rest are old
        if (index <= 2) { 
            newList.innerHTML += `<li class="list-group-item new-review"><a href="#">${title}</a> - ${content.substring(0, 100)}...</li>`;
        } else {
            oldList.innerHTML += `<li class="list-group-item old-review"><a href="#">${title}</a> - ${content.substring(0, 100)}...</li>`;
        }
    });
}

loadReviews();

// Call the function to load reviews when the page loads
document.addEventListener("DOMContentLoaded", loadReviews);
