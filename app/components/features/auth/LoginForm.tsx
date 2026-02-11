"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Button, Typography, Space, message } from "antd";
import type { LoginDto } from "@/app/types/auth";
import { useAuth } from "@/app/context/AuthContext";

const { Title, Text } = Typography;

const formLayout = {
  wrapperCol: { span: 24 },
};

export default function LoginForm() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginDto) => {
    setLoading(true);
    try {
      await login(values);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Error al iniciar sesión";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Space orientation="vertical" size={4} style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Bienvenido
        </Title>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Por favor ingresa tus credenciales
        </Text>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        {...formLayout}
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: "Ingresa tu correo electrónico" },
            { type: "email", message: "Correo electrónico no válido" },
          ]}
        >
          <Input placeholder="Digita tu correo" size="large" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Ingresa tu contraseña" },
            { min: 8, message: "La contraseña debe tener al menos 8 caracteres" },
          ]}
        >
          <Input.Password
            placeholder="Digita el NIT del comercio"
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 24, marginBottom: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{
              backgroundColor: "#4242B5",
              borderColor: "#4242B5",
              height: 44,
            }}
          >
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Text type="secondary">¿Necesitas una cuenta? </Text>
        <Link
          href="/register"
          style={{ color: "#4242B5", fontWeight: 600, fontSize: 14 }}
        >
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
