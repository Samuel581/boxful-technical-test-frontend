import React from "react";
import { Col, Row } from "antd";
import { COLOR_PANEL_BG } from "@/app/constants/colors";

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
          backgroundColor: COLOR_PANEL_BG,
          minHeight: "100vh",
        }}
      />
    </Row>
  );
}
