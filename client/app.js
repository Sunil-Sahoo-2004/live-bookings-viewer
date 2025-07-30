// Connect to backend
const socket = io("http://localhost:5000");

// Get the list container
const bookingList = document.getElementById("booking-list");

// Handle incoming booking data
socket.on("new-booking", (data) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>Venue:</strong> ${data.venueName}<br>
    <strong>Party Size:</strong> ${data.partySize}<br>
    <strong>Time:</strong> ${data.time}
  `;
  // Add new booking to the top of the list
  bookingList.insertBefore(li, bookingList.firstChild);
});
