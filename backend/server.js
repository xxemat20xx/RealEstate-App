import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

// routes
import propertyRoutes from "./routes/property.routes.js";
import userRoutes from "./routes/user.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import agentRoutes from "./routes/agent.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 3. CORS (keep your config)
// const allowedOrigins = [
//   process.env.CLIENT_URL,
//   "https://www.ematsproject.store",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (origin.includes("localhost")) return callback(null, true);
//       if (origin.endsWith(".vercel.app")) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// ✅ 4. BODY PARSER (⚠️ reduce limit!)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// ✅ 5. COOKIES
app.use(cookieParser());

// routes
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/agents", agentRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
