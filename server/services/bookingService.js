let bookings = [];
let bookingId = 1;

export const getAllBookings = () => bookings;

export const createBooking = ({ venueName, partySize }) => {
  const time = new Date().toLocaleTimeString();
  const newBooking = { id: bookingId++, venueName, partySize, time };
  bookings.push(newBooking);
  return newBooking;
};

export const updateBooking = (id, updates) => {
  const index = bookings.findIndex(b => b.id === parseInt(id));
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates };
  return bookings[index];
};

export const deleteBooking = (id) => {
  const index = bookings.findIndex(b => b.id === parseInt(id));
  if (index === -1) return null;
  const deleted = bookings.splice(index, 1)[0];
  return deleted;
};

export const generateRandomBooking = () => {
  const venues = ["Hotel Sunset", "Blue Lagoon", "Sea Breeze", "Green Garden"];
  const sizes = [2, 4, 6, 8];
  const venueName = venues[Math.floor(Math.random() * venues.length)];
  const partySize = sizes[Math.floor(Math.random() * sizes.length)];
  return createBooking({ venueName, partySize });
};
