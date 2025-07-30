import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
app.use(cors());

const port = process.env.PORT || 3000;

const bookings = [];

function generateRandomBooking() {
    const venues = ["Hotel Sunset", "Blue Lagoon", "Sea Breeze", "Green Garden"];
    const sizes = [2, 4, 6, 8];
    const venueName = venues[Math.floor(Math.random() * venues.length)];
    const partySize = sizes[Math.floor(Math.random() * sizes.length)];
    const time = new Date().toLocaleTimeString();

    return { venueName, partySize, time };
}

setInterval(() => {
  const booking = generateRandomBooking();
  bookings.push(booking);
  io.emit("new-booking", booking);
}, 5000);


app.get('/', (req, res) => {
  res.send("Live Bookings Server is running");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})