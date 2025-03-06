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
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIkWsryajtIMUlOfuNE_F94R_F6TTtyfs_0vrkQpp_id0PQoA4UPG894fzgC3Oklfua5aiMI8IPLE5/pub?output=csv"; // Replace with actual link

    try {
        const response = await fetch(sheetURL);
        const text = await response.text();
        
        console.log("Fetched Data from Google Sheets:", text); // Debugging Step

        let rows = text.split("\n").map(row => row.split(","));
        console.log("Parsed Rows:", rows); // Debugging Step

        const newList = document.getElementById("new-reviews-list");
        const oldList = document.getElementById("old-reviews-list");
        newList.innerHTML = "";  
        oldList.innerHTML = "";  

        rows.shift(); // Remove header row

        // Convert date string to actual date objects for sorting
        rows.sort((a, b) => new Date(b[3]) - new Date(a[3]));

        rows.forEach((row, index) => {
            const [title, content, type, date] = row;

            if (index < 2) {  // Newest two reviews go to "New "
                newList.innerHTML += `<li class="list-group-item new-review"><a href="#">${title}</a> - ${content.substring(0, 100)}...</li>`;
            } else {  // Older reviews go to archive
                oldList.innerHTML += `<li class="list-group-item old-review"><a href="#">${title}</a> - ${content.substring(0, 100)}...</li>`;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

loadReviews();

// Call the function to load reviews when the page loads
document.addEventListener("DOMContentLoaded", loadReviews);
