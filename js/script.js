
const properties = [
  {
    id: 1,
    title: "2 BHK Apartment",
    location: "Delhi",
    price: 2800000,
    bhk: 2,
    type: "Apartment",
    image: "assets/p1.jpg",
    area: "1100 sqft",
    status: "Ready to Move"
  },
  {
    id: 2,
    title: "3 BHK Flat",
    location: "Mumbai",
    price: 5200000,
    bhk: 3,
    type: "Flat",
    image: "assets/p2.jpg",
    area: "1450 sqft",
    status: "Under Construction"
  },
  {
    id: 3,
    title: "1 BHK Studio",
    location: "Pune",
    price: 2400000,
    bhk: 1,
    type: "Studio",
    image: "assets/p3.jpg",
    area: "650 sqft",
    status: "Ready to Move"
  }
];

const container = document.getElementById("listingContainer");

function renderProperties(data) {
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = "<p>No properties found.</p>";
    return;
  }

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p><strong>₹${p.price.toLocaleString()}</strong></p>
      <p>${p.location} | ${p.bhk} BHK</p>
      <p>${p.area} • ${p.status}</p>
      <button onclick="openModal(${p.id})">View Details</button>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const location = document.getElementById("locationFilter").value;
  const bhk = document.getElementById("bhkFilter").value;
  const sort = document.getElementById("sortFilter").value;

  let filtered = properties.filter(p => {
    return (location === "" || p.location === location) &&
           (bhk === "" || p.bhk == bhk);
  });

  if (sort === "low") filtered.sort((a,b)=>a.price-b.price);
  if (sort === "high") filtered.sort((a,b)=>b.price-a.price);

  renderProperties(filtered);
}

function resetFilters() {
  document.getElementById("locationFilter").value = "";
  document.getElementById("bhkFilter").value = "";
  document.getElementById("sortFilter").value = "";
  renderProperties(properties);
}

/* MODAL */
function openModal(id) {
  const p = properties.find(x => x.id === id);
  document.getElementById("modalBody").innerHTML = `
    <h2>${p.title}</h2>
    <img src="${p.image}">
    <p>Location: ${p.location}</p>
    <p>Price: ₹${p.price.toLocaleString()}</p>
    <p>BHK: ${p.bhk}</p>
    <p>Area: ${p.area}</p>
    <p>Status: ${p.status}</p>
  `;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

renderProperties(properties);
