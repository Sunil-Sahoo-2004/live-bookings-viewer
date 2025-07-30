import {
  createBooking,
  updateBooking,
  deleteBooking,
} from "../services/bookingService.js";

let io;

export const setSocketInstance = (socket) => {
  io = socket;
};

export const handleCreateBooking = (req, res) => {
  const { venueName, partySize } = req.body;
  const booking = createBooking({ venueName, partySize });
  io.emit("new-booking", booking);
  res.status(201).json(booking);
};

export const handleUpdateBooking = (req, res) => {
  const booking = updateBooking(req.params.id, req.body);
  if (!booking) return res.status(404).send("Booking not found.");
  io.emit("updated-booking", booking);
  res.json(booking);
};

export const handleDeleteBooking = (req, res) => {
  const deleted = deleteBooking(req.params.id);
  if (!deleted) return res.status(404).send("Booking not found.");
  io.emit("deleted-booking", deleted);
  res.json(deleted);
};
