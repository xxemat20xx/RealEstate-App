import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten(),
    });
  }

  // ✅ THIS is what you need
  req.validatedData = result.data;

  next();
};
