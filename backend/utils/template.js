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
} from "@react-email/components";

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
            `📞 Phone: ${inquiry.phoneNumber}`,
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
