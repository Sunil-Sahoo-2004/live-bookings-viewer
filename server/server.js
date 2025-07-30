import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import bookingRoutes from "./routes/bookingRoutes.js";
import { setSocketInstance } from "./controllers/bookingController.js";
import { generateRandomBooking } from "./services/bookingService.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

setSocketInstance(io);

app.get("/", (req, res) => {
  res.send("Live Bookings Server is running");
});

app.use(cors());
app.use(express.json());
app.use("/bookings", bookingRoutes);

const port = process.env.PORT || 3000;

setInterval(() => {
  const booking = generateRandomBooking();
  io.emit("new-booking", booking);
}, 5000);

server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});