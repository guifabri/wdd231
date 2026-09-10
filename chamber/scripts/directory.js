// --- 1. Fechas y Footer ---
const currentYearSpan = document.querySelector("#currentyear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.querySelector("#lastModified");
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}

// --- 2. Menú de Navegación Móvil ---
const mainNav = document.querySelector(".navigation");
const hamburgerBtn = document.querySelector("#menu");

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
  });
}

// --- 3. Cargar Datos del JSON con Fetch y Async/Await ---
const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembersData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayMembers(data);
    } else {
      console.error("Error al cargar los miembros:", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud fetch:", error);
  }
}

// --- 4. Renderizar las Tarjetas de Miembros ---
const displayMembers = (members) => {
  membersContainer.innerHTML = ""; // Limpiar contenido previo

  members.forEach((member) => {
    // Crear elementos HTML para cada tarjeta
    const card = document.createElement("section");
    card.classList.add("member-card");

    const img = document.createElement("img");
    img.setAttribute("src", member.image);
    img.setAttribute("alt", `Logo of ${member.name}`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "100");
    img.setAttribute("height", "100");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.setAttribute("rel", "noopener");
    website.textContent = member.website;

    const membership = document.createElement("p");
    membership.classList.add("membership-level");
    membership.textContent = `Membership: ${member.membership}`;

    // Agregar elementos a la tarjeta
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);

    // Agregar tarjeta al contenedor principal
    membersContainer.appendChild(card);
  });
};

getMembersData();

// --- 5. Alternar Vistas (Grid / List) ---
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
}