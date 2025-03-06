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
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIkWsryajtIMUlOfuNE_F94R_F6TTtyfs_0vrkQpp_id0PQoA4UPG894fzgC3Oklfua5aiMI8IPLE5/pubhtml"; // Replace with your actual Google Sheet CSV link
    const response = await fetch(sheetURL);
    const text = await response.text();
    
    const rows = text.split("\n").map(row => row.split(","));
    const list = document.getElementById("reviews-list");
    list.innerHTML = "";  // Clear existing content

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip headers
        const [title, content, type] = row;
        if (type.trim() === "Review") {
            list.innerHTML += `<li class="list-group-item"><a href="#">${title}</a> - ${content.substring(0, 100)}...</li>`;
        }
    });
}

// Call the function to load reviews when the page loads
document.addEventListener("DOMContentLoaded", loadReviews);
