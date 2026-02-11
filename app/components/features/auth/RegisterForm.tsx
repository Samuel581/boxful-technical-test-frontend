"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  message,
  Modal,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Sex } from "@/app/types/auth";
import type { RegisterDto } from "@/app/types/auth";
import { authService } from "@/app/services/authService";
import { LOGIN } from "@/app/constants/frontendRoute";
import { COLOR_PRIMARY } from "@/app/constants/colors";
import { FORM_LAYOUT, COUNTRY_CODE_OPTIONS, PRIMARY_BUTTON_STYLE } from "@/app/constants/formConstants";
import { emailRules, passwordRules, phoneRules, dateRules } from "@/app/form-rules/commonRules";
import { firstNameRules, lastNameRules, sexRules, confirmPasswordRules } from "@/app/form-rules/registerRules";

const { Title, Text } = Typography;

const GENDER_OPTIONS = [
  { value: Sex.M, label: "Masculino" },
  { value: Sex.F, label: "Femenino" },
  { value: Sex.OTHER, label: "Otro" },
];

export default function RegisterForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmPhoneOpen, setConfirmPhoneOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<
    (RegisterDto & { countryCode: string; confirmPassword: string }) | null
  >(null);

  const handleRegister = async (values: RegisterDto & { countryCode: string; confirmPassword: string }) => {
    const { confirmPassword, countryCode, phone, borndate, ...rest } = values;
    const dto: RegisterDto = {
      ...rest,
      borndate: dayjs(borndate).toISOString(),
      phone: `+${countryCode}${phone}`,
    };

    setLoading(true);
    try {
      await authService.register(dto);
      message.success("Registro exitoso. Inicia sesión para continuar.");
      router.push(LOGIN);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Error al registrarse";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: RegisterDto & { countryCode: string; confirmPassword: string }) => {
    setPendingValues(values);
    setConfirmPhoneOpen(true);
  };

  const handleCancelConfirm = () => {
    setConfirmPhoneOpen(false);
    setPendingValues(null);
  };

  const handleConfirmPhone = async () => {
    if (!pendingValues) return;
    setConfirmPhoneOpen(false);
    await handleRegister(pendingValues);
    setPendingValues(null);
  };

  const formattedPhone = React.useMemo(() => {
    if (!pendingValues) return "";
    const countryCode = pendingValues.countryCode || "";
    const phone = pendingValues.phone || "";
    return `+${countryCode} ${phone}`;
  }, [pendingValues]);

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
        {...FORM_LAYOUT}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nombre"
              name="firstnames"
              rules={firstNameRules}
            >
              <Input placeholder="Digita tu nombre" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Apellido"
              name="lastnames"
              rules={lastNameRules}
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
              rules={sexRules}
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
              rules={dateRules}
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
              rules={emailRules}
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
                  rules={phoneRules}
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
              rules={passwordRules}
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
              rules={confirmPasswordRules}
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
            loading={loading}
            style={PRIMARY_BUTTON_STYLE}
          >
            Siguiente
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={confirmPhoneOpen}
        onCancel={handleCancelConfirm}
        footer={null}
        centered
        closable
      >
        <Space
          direction="vertical"
          size={24}
          style={{ width: "100%", alignItems: "center", textAlign: "center" }}
        >
          <ExclamationCircleFilled style={{ fontSize: 48, color: COLOR_PRIMARY }} />
          <Space direction="vertical" size={8}>
            <Title level={4} style={{ margin: 0 }}>
              Confirmar número de teléfono
            </Title>
            <Text type="secondary">
              Está seguro de que desea continuar con el número{" "}
              <Text strong>{formattedPhone}</Text>?
            </Text>
          </Space>
          <Space size={12}>
            <Button size="large" onClick={handleCancelConfirm}>
              Cancelar
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleConfirmPhone}
              loading={loading}
              style={PRIMARY_BUTTON_STYLE}
            >
              Aceptar
            </Button>
          </Space>
        </Space>
      </Modal>
    </div>
  );
}
