"use client";

import React from "react";
import Link from "next/link";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Space,
} from "antd";
import dayjs from "dayjs";
import { Sex } from "@/app/types/auth";
import type { RegisterDto } from "@/app/types/auth";
import { authService } from "@/app/services/authService";
import { LOGIN } from "@/app/constants/frontendRoute";
import { COLOR_PRIMARY } from "@/app/constants/colors";

const { Title, Text } = Typography;

const formLayout = {
  wrapperCol: { span: 24 },
};

const GENDER_OPTIONS = [
  { value: Sex.M, label: "Masculino" },
  { value: Sex.F, label: "Femenino" },
  { value: Sex.OTHER, label: "Otro" },
];

const COUNTRY_CODE_OPTIONS = [
  { value: "503", label: "+503" },
  { value: "52", label: "+52" },
  { value: "57", label: "+57" },
  { value: "54", label: "+54" },
  { value: "1", label: "+1" },
];

export default function RegisterForm() {
  const [form] = Form.useForm();

  const onFinish = (values: RegisterDto & { countryCode: string; confirmPassword: string } ) => {
    const { confirmPassword, countryCode, phone, borndate, ...rest } = values;
    const dto: RegisterDto = {
      ...rest,
      borndate: dayjs(borndate).toISOString(),
      phone: `+${countryCode}${phone}`,
    };
    authService.register(dto);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <Space orientation="vertical" size={0} style={{ marginBottom: 24 }}>
        <Space align="center" size={12} style={{ marginBottom: 8 }}>
          <Link href={LOGIN}>
            <Button
              type="text"
              style={{ padding: 4, fontSize: 18 }}
              aria-label="Volver"
            >
              &lt;
            </Button>
          </Link>
          <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
            Cuéntanos de ti
          </Title>
        </Space>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Completa la información de registro
        </Text>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        {...formLayout}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nombre"
              name="firstnames"
              rules={[{ required: true, message: "Ingresa tu nombre" }]}
            >
              <Input placeholder="Digita tu nombre" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Apellido"
              name="lastnames"
              rules={[{ required: true, message: "Ingresa tu apellido" }]}
            >
              <Input placeholder="Digita tu apellido" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Sexo"
              name="sex"
              rules={[{ required: true, message: "Selecciona" }]}
            >
              <Select
                placeholder="Seleccionar"
                size="large"
                options={GENDER_OPTIONS}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Fecha de nacimiento"
              name="borndate"
              rules={[{ required: true, message: "Selecciona la fecha" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD/MM/AAAA"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[
                { required: true, message: "Ingresa tu correo" },
                { type: "email", message: "Correo no válido" },
              ]}
            >
              <Input placeholder="Digitar correo" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Número de whatsapp">
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item name="countryCode" noStyle initialValue="503">
                  <Select
                    placeholder=""
                    size="large"
                    options={COUNTRY_CODE_OPTIONS}
                    style={{ width: 80 }}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  noStyle
                  rules={[{ required: true, message: "Ingresa el número" }]}
                >
                  <Input placeholder="7777 7777" size="large" style={{ flex: 1 }} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Digita tu contraseña" }]}
            >
              <Input.Password
                placeholder="Digitar contraseña"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Repetir contraseña"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Repite la contraseña" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Las contraseñas no coinciden"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Digitar contraseña"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{
              backgroundColor: COLOR_PRIMARY,
              borderColor: COLOR_PRIMARY,
              height: 44,
            }}
          >
            Siguiente
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
