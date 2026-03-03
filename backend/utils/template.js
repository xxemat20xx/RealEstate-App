import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Heading,
  Hr,
} from "@react-email/components";

// ======================================================
// 🏡 PROPERTY INQUIRY EMAIL
// ======================================================
export const inquiryTemplate = ({ inquiry, property }) => {
  const image = property?.images?.[0];

  return React.createElement(
    Html,
    null,
    React.createElement(Head),
    React.createElement(
      Body,
      { style: inquiryMain },
      React.createElement(
        Container,
        { style: inquiryContainer },

        React.createElement(
          Heading,
          { as: "h2", style: inquiryHeading },
          "🏡 New Property Inquiry",
        ),

        image &&
          React.createElement(
            Section,
            { style: { marginBottom: "25px", textAlign: "center" } },
            React.createElement(Img, {
              src: image,
              alt: "Property Image",
              width: "100%",
              style: {
                borderRadius: "12px",
                maxHeight: "300px",
                objectFit: "cover",
              },
            }),
          ),

        React.createElement(
          Text,
          { style: inquiryPropertyTitle },
          property?.title,
        ),

        React.createElement(
          Container,
          { style: inquiryCard },
          React.createElement(
            Text,
            { style: inquiryText },
            `👤 Name: ${inquiry.firstName} ${inquiry.lastName}`,
          ),
          React.createElement(
            Text,
            { style: inquiryText },
            `📧 Email: ${inquiry.email}`,
          ),
          React.createElement(
            Text,
            { style: inquiryText },
            `📞 Phone: ${inquiry.contactNumber || inquiry.phoneNumber}`,
          ),
          React.createElement(
            Text,
            { style: inquiryText },
            `💬 Message: ${inquiry.message}`,
          ),
        ),

        React.createElement(
          Text,
          { style: inquiryFooter },
          "Thank you for choosing Real Estate App. Our team will contact you shortly!",
        ),
      ),
    ),
  );
};

// ======================================================
// 🔐 OTP EMAIL TEMPLATE
// ======================================================
export const otpEmailTemplate = ({ name, otp }) => {
  return React.createElement(
    Html,
    null,
    React.createElement(Head),
    React.createElement(
      Body,
      { style: main },
      React.createElement(
        Container,
        { style: container },

        React.createElement(
          Section,
          { style: sectionCenter },
          React.createElement(Heading, { style: logo }, "Real Estate App"),
        ),

        React.createElement(
          Section,
          { style: card },
          React.createElement(
            Heading,
            { style: heading },
            "Verify Your Account",
          ),
          React.createElement(
            Text,
            { style: paragraph },
            `Hi ${name || "there"},`,
          ),
          React.createElement(
            Text,
            { style: paragraph },
            "Use the One-Time Password (OTP) below to complete your verification.",
          ),
          React.createElement(
            Section,
            { style: otpContainer },
            React.createElement(Text, { style: otpText }, otp),
          ),
          React.createElement(
            Text,
            { style: smallText },
            "If you didn’t request this code, you can safely ignore this email.",
          ),
          React.createElement(Hr, { style: divider }),
          React.createElement(
            Text,
            { style: footer },
            `© ${new Date().getFullYear()} Real Estate App. All rights reserved.`,
          ),
        ),
      ),
    ),
  );
};

// ======================================================
// 🔑 RESET PASSWORD EMAIL TEMPLATE (Luxury Style)
// ======================================================
export const resetPasswordEmailTemplate = ({ name, resetUrl }) => {
  return React.createElement(
    Html,
    null,
    React.createElement(Head),
    React.createElement(
      Body,
      { style: resetMain },
      React.createElement(
        Container,
        { style: container },

        React.createElement(
          Section,
          { style: sectionCenter },
          React.createElement(
            Heading,
            { style: resetLogo },
            "Luxury Property Console",
          ),
        ),

        React.createElement(
          Section,
          { style: resetCard },
          React.createElement(
            Heading,
            { style: resetHeading },
            "Reset Your Password",
          ),
          React.createElement(
            Text,
            { style: paragraph },
            `Hi ${name || "there"},`,
          ),
          React.createElement(
            Text,
            { style: paragraph },
            "Click the button below to reset your password. This link will expire in 15 minutes.",
          ),

          React.createElement(
            Section,
            { style: buttonContainer },
            React.createElement(
              "a",
              {
                href: resetUrl,
                style: resetButton,
              },
              "RESET PASSWORD",
            ),
          ),

          React.createElement(
            Text,
            { style: smallText },
            "If you didn’t request this reset, you can safely ignore this email.",
          ),
          React.createElement(Hr, { style: divider }),
          React.createElement(
            Text,
            { style: footer },
            `© ${new Date().getFullYear()} Luxury Property Console. All rights reserved.`,
          ),
        ),
      ),
    ),
  );
};

// ======================================================
// 🎨 STYLES
// ======================================================

// Shared styles
const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 20px",
};

const sectionCenter = {
  textAlign: "center",
  marginBottom: "30px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#374151",
  marginBottom: "16px",
};

const smallText = {
  fontSize: "14px",
  color: "#6b7280",
  marginTop: "20px",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "30px 0",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center",
};

// OTP Styles
const main = {
  backgroundColor: "#f3f4f6",
  padding: "40px 0",
  fontFamily: "Arial, sans-serif",
};

const logo = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#111827",
};

const card = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "12px",
};

const heading = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#111827",
};

const otpContainer = {
  textAlign: "center",
  margin: "30px 0",
};

const otpText = {
  display: "inline-block",
  fontSize: "28px",
  letterSpacing: "8px",
  fontWeight: "700",
  padding: "14px 28px",
  borderRadius: "8px",
  backgroundColor: "#f59e0b",
  color: "#ffffff",
};

// Inquiry Styles
const inquiryMain = {
  background: "#f0f4f8",
  padding: "40px 0",
  fontFamily: "Arial, sans-serif",
};

const inquiryContainer = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "16px",
  maxWidth: "600px",
  margin: "0 auto",
};

const inquiryHeading = {
  textAlign: "center",
  marginBottom: "25px",
};

const inquiryPropertyTitle = {
  fontSize: "22px",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: "20px",
};

const inquiryCard = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const inquiryText = {
  fontSize: "16px",
  color: "#374151",
  marginBottom: "10px",
};

const inquiryFooter = {
  fontSize: "14px",
  color: "#6b7280",
  textAlign: "center",
};

// Reset Styles (Luxury)
const resetMain = {
  backgroundColor: "#0f172a",
  padding: "60px 20px",
  fontFamily: "Arial, sans-serif",
};

const resetLogo = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#ffffff",
};

const resetCard = {
  backgroundColor: "#ffffff",
  padding: "48px 40px",
  borderRadius: "24px",
};

const resetHeading = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#0f172a",
};

const buttonContainer = {
  textAlign: "center",
  margin: "40px 0",
};

const resetButton = {
  display: "inline-block",
  padding: "16px 36px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2px",
  textDecoration: "none",
  textTransform: "uppercase",
  color: "#ffffff",
  backgroundColor: "#d97706", // safer than gradient for email
};
