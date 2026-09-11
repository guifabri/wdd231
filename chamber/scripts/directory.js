// --- 1. Dates and Footer ---
const currentYearSpan = document.querySelector("#currentyear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.querySelector("#lastModified");
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}

// --- 2. Mobile Navigation Menu ---
const mainNav = document.querySelector(".navigation");
const hamburgerBtn = document.querySelector("#menu");

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
  });
}

// --- 3. Fetch JSON Data ---
const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembersData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayMembers(data);
    } else {
      console.error("Failed to load members:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// --- 4. Render Member Cards (Wireframe Layout) ---
const displayMembers = (members) => {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p class="tagline">${member.membership} Member</p>
      <hr>
      <div class="card-body">
        <div class="logo-box">
          <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
        </div>
        <div class="card-info">
          <p><strong>ADDRESS:</strong> ${member.address}</p>
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> <a href="https://${member.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener">${member.website}</a></p>
        </div>
      </div>
    `;

    membersContainer.appendChild(card);
  });
};

getMembersData();

// --- 5. View Switcher (Grid / List) ---
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });
}