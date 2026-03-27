const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least 3 chars" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid email address" }),

  phone: z
    .string({ required_error: "Phone number is Required" })
    .min(10, { message: "Phone must be at least 10 digits" })
    .max(10, { message: "Phone must be exactly 10 digits" }),

  password: z
    .string({ required_error: "Password is Required" })
    .min(6, { message: "Password must be at least 6 chars" })
    .max(1024, { message: "Password must not exceed 1024 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is Required" })
    .min(6, { message: "Password must be at least 6 chars" }),
});

module.exports = { signupSchema, loginSchema };