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

// ✅ Inquiry email template
export const inquiryTemplate = ({ inquiry, property }) => {
  const image = property?.images?.[0];

  return React.createElement(
    Html,
    null,
    React.createElement(Head),
    React.createElement(
      Body,
      {
        style: {
          background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        },
      },
      React.createElement(
        Container,
        {
          style: {
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            maxWidth: "600px",
            margin: "0 auto",
            border: "2px solid #e2e8f0",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          },
        },
        // Header
        React.createElement(
          Heading,
          {
            as: "h2",
            style: {
              color: "#1f2937",
              textAlign: "center",
              marginBottom: "25px",
              fontWeight: "700",
            },
          },
          "🏡 New Property Inquiry",
        ),

        // Hero Image
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
                border: "1px solid #e2e8f0",
              },
            }),
          ),

        // Property Title
        React.createElement(
          Text,
          {
            style: {
              fontSize: "22px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "20px",
              textAlign: "center",
            },
          },
          property?.title,
        ),

        // Inquiry Details Card
        React.createElement(
          Container,
          {
            style: {
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              marginBottom: "20px",
            },
          },
          React.createElement(
            Text,
            {
              style: {
                marginBottom: "10px",
                fontSize: "16px",
                color: "#374151",
              },
            },
            `👤 Name: ${inquiry.firstName} ${inquiry.lastName}`,
          ),
          React.createElement(
            Text,
            {
              style: {
                marginBottom: "10px",
                fontSize: "16px",
                color: "#374151",
              },
            },
            `📧 Email: ${inquiry.email}`,
          ),
          React.createElement(
            Text,
            {
              style: {
                marginBottom: "10px",
                fontSize: "16px",
                color: "#374151",
              },
            },
            `📞 Phone: ${inquiry.contactNumber || inquiry.phoneNumber}`,
          ),
          React.createElement(
            Text,
            {
              style: { marginTop: "10px", fontSize: "16px", color: "#374151" },
            },
            `💬 Message: ${inquiry.message}`,
          ),
        ),

        // Footer / Note
        React.createElement(
          Text,
          {
            style: {
              fontSize: "14px",
              color: "#6b7280",
              textAlign: "center",
              marginTop: "25px",
              lineHeight: "1.5",
            },
          },
          "Thank you for choosing RealEstate. Our team will contact you shortly!",
        ),
      ),
    ),
  );
};

// ✅ Your OTP Email Template
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
            "Use the One-Time Password (OTP) below to complete your verification. This code will expire shortly.",
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
            `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
          ),
        ),
      ),
    ),
  );
};

// ✅ Tailwind-like JS style objects
const main = {
  backgroundColor: "#f3f4f6",
  padding: "40px 0",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 20px",
};

const sectionCenter = {
  textAlign: "center",
  marginBottom: "30px",
};

const logo = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#111827",
  margin: "0",
};

const card = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};

const heading = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#111827",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#374151",
  marginBottom: "16px",
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
