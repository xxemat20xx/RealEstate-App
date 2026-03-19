import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import { connectDB } from "./lib/db.js";

// routes
import propertyRoutes from "./routes/property.routes.js";
import userRoutes from "./routes/user.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import agentRoutes from "./routes/agent.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 1. SECURITY HEADERS
app.use(helmet());

// ✅ 2. PREVENT MONGO INJECTION
app.use(mongoSanitize());

// ✅ 3. CORS FIXED
const allowedOrigins = [
  process.env.CLIENT_URL || "https://www.ematsproject.store",
  "https://www.ematsproject.store",
  "https://ematsproject.store", // in case someone hits non-www
];

// Custom CORS function
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (curl, Postman)
    if (!origin) return callback(null, true);

    // allow localhost for development
    if (origin.includes("localhost")) return callback(null, true);

    // allow Vercel deployments
    if (origin.endsWith(".vercel.app")) return callback(null, true);

    // allow whitelisted domains
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // reject all others
    return callback(new Error(`CORS policy: ${origin} not allowed`));
  },
  credentials: true, // allows cookies to be sent
};

app.use(cors(corsOptions));

// ✅ 4. BODY PARSER
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// ✅ 5. COOKIES
app.use(cookieParser());

// ✅ 6. ROUTES
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/agents", agentRoutes);

// ✅ 7. HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ 8. START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
