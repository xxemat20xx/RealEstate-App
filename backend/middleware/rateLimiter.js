import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 requests per email
  message: {
    message: "Too many password reset requests for this email, try again later",
  },
  keyGenerator: (req) => {
    // Normalize email and use as key, fallback to IPv6-safe IP
    const emailKey =
      req.validatedData?.email?.toLowerCase().trim() ||
      req.body.email?.toLowerCase().trim();
    return emailKey || ipKeyGenerator(req);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
