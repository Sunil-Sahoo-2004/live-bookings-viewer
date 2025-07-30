import express from "express";
import {
  handleCreateBooking,
  handleUpdateBooking,
  handleDeleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", handleCreateBooking);
router.put("/:id", handleUpdateBooking);
router.delete("/:id", handleDeleteBooking);

export default router;
