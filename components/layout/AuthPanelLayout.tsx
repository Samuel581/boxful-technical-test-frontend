import React from "react";
import { Col, Row } from "antd";

export default function AuthPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        {children}
      </Col>
      <Col
        xs={0}
        md={12}
        style={{
          backgroundColor: "#d9d9d9",
          minHeight: "100vh",
        }}
      />
    </Row>
  );
}
