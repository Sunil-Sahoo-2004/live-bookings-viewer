const BASE_URL = "http://localhost:5000"; 
const socket = io(BASE_URL);

const bookingList = document.getElementById("booking-list");
const form = document.getElementById("booking-form");
const venueInput = document.getElementById("venueName");
const sizeInput = document.getElementById("partySize");

function createBookingElement(data) {
  const li = document.createElement("li");
  li.id = `booking-${data.id}`;
  li.innerHTML = `
    <strong>Venue:</strong> <span class="venue-name">${data.venueName}</span><br>
    <strong>Party Size:</strong> <span class="party-size">${data.partySize}</span><br>
    <strong>Time:</strong> ${data.time}
    <div class="actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
   `;

  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  editBtn.onclick = () => {
    const newVenue = prompt("Enter new venue name:", data.venueName);
    if (!newVenue) return;

    const newSize = prompt("Enter new party size:", data.partySize);
    if (!newSize) return;

    fetch(`${BASE_URL}/bookings/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ venueName: newVenue, partySize: newSize }),
    });
  };

  deleteBtn.onclick = () => {
    fetch(`${BASE_URL}/bookings/${data.id}`, {
      method: "DELETE",
    });
  };

  return li;
}

// Handle new booking from backend 
socket.on("new-booking", (data) => {
  const li = createBookingElement(data);
  bookingList.insertBefore(li, bookingList.firstChild);
});

// Handle updated booking
socket.on("updated-booking", (data) => {
  const li = document.getElementById(`booking-${data.id}`);
  if (li) {
    li.querySelector(".venue-name").textContent = data.venueName;
    li.querySelector(".party-size").textContent = data.partySize;
  }
});

// Handle deleted booking
socket.on("deleted-booking", (data) => {
  const li = document.getElementById(`booking-${data.id}`);
  if (li) li.remove();
});

// Handle form submission
form.onsubmit = (e) => {
  e.preventDefault();
  const venueName = venueInput.value.trim();
  const partySize = parseInt(sizeInput.value.trim());

  if (!venueName || !partySize) return;

  fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ venueName, partySize }),
  });

  venueInput.value = "";
  sizeInput.value = "";
};