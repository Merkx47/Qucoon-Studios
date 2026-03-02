import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/bookings", async (req, res) => {
    try {
      const data = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(data);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors.map(e => e.message).join(", ") });
      } else {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get("/api/bookings", async (_req, res) => {
    try {
      const allBookings = await storage.getBookings();
      res.json(allBookings);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(data);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors.map(e => e.message).join(", ") });
      } else {
        console.error("Contact error:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  return httpServer;
}
