import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import carRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";



dotenv.config();


const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", carRouter);
app.use("/api/order", orderRouter);

// 📌 New Contact Route
app.post("/api/contact", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Thank you email to User
    await transporter.sendMail({
      from: `"FOODY-(your One stop location of all tastes)" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your query",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background: #f9f9f9;">
          <h2 style="color: #333;">Hi ${fullName},</h2>
          <p>Thank you for reaching out to us. We’ve received your query and will get back to you soon.</p>
          <p style="margin-top: 10px;"><b>Your message:</b></p>
          <blockquote style="color: #555; border-left: 3px solid #007bff; padding-left: 10px;">${message}</blockquote>
          <p style="margin-top: 20px;">Warm Regards,<br/><b>FOODY Team</b></p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Emails sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, message: "Failed to send emails" });
  }
});


app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
