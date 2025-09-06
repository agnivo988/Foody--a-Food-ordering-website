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
app.use("/uploads", express.static("uploads"));
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
      secure : true,
      host: 'smtp.gmail.com',
      port : 587,
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
    <div style="background:#f4f4f4; padding:30px; font-family: Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        
        <!-- Header with Logo -->
        <div style="text-align:center; padding:20px; background:#ff6f61;">
          <img src="https://i.postimg.cc/SQ8G0D0S/Screenshot-2025-08-31-135547.png" alt="FOODY Logo" style="max-width:120px; border-radius:8px;" />
        </div>

        <!-- Body -->
        <div style="padding:30px;">
          <h2 style="color:#333;">Hi ${fullName},</h2>
          <p style="font-size:16px; color:#555; line-height:1.6;">
            Thank you for reaching out to us. We’ve received your query and our team will get back to you soon.
          </p>

          <p style="margin-top:15px; font-weight:bold; color:#333;">Your message:</p>
          <blockquote style="color:#555; border-left:4px solid #ff6f61; padding-left:12px; margin:10px 0; font-style:italic;">
            ${message}
          </blockquote>

          <p style="margin-top:25px; font-size:15px; color:#555;">
            Warm Regards,<br/><b style="color:#ff6f61;">FOODY Team</b>
          </p>

          <!-- Button -->
          <div style="text-align:center; margin-top:30px;">
            <a href="https://foody-ruddy.vercel.app/" 
               style="background:#ff6f61; color:white; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;">
              Visit Our Website
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:15px; background:#f9f9f9; font-size:12px; color:#888;">
          © ${new Date().getFullYear()} FOODY. All rights reserved.
        </div>
      </div>
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
