export const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "none",
};
// export const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
// };
