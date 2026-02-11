"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Card,
  DatePicker,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import { CreateOrderDto, PackageDto } from "@/app/types/order";
import { ordersSerivice } from "@/app/services/ordersService";
import { DASHBOARD_HISTORY } from "@/app/constants/frontendRoute";
import { COLOR_SECTION_BG, COLOR_SECONDARY_BG, COLOR_BORDER_GRAY, COLOR_SUCCESS, COLOR_TEXT_SECONDARY } from "@/app/constants/colors";
import { FORM_LAYOUT, COUNTRY_CODE_OPTIONS, PRIMARY_BUTTON_STYLE } from "@/app/constants/formConstants";

const { Title, Text } = Typography;

function CreateOrderStep1({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Form.Item
            label="Dirección de recolección"
            name="recolectionAddress"
            rules={[{ required: true, message: "Ingresa la dirección" }]}
          >
            <Input
              placeholder="Colonia Las Magnolias, calle militar 1, San Salvador"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Fecha programada"
            name="programedDate"
            rules={[{ required: true, message: "Selecciona la fecha" }]}
          >
            <DatePicker
              placeholder="Seleccionar"
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Nombres"
            name="recipientNames"
            rules={[{ required: true, message: "Ingresa los nombres" }]}
          >
            <Input placeholder="Gabriela Reneé" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Apellidos"
            name="recipientLastNames"
            rules={[{ required: true, message: "Ingresa los apellidos" }]}
          >
            <Input placeholder="Días López" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Correo electrónico"
            name="recipientEmail"
            rules={[
              { required: true, message: "Ingresa el correo" },
              { type: "email", message: "Correo no válido" },
            ]}
          >
            <Input placeholder="gabbydiaz@gmail.com" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Teléfono" required>
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item name="countryCode" noStyle initialValue="503">
                <Select
                  size="large"
                  options={COUNTRY_CODE_OPTIONS}
                  style={{ width: 80 }}
                />
              </Form.Item>
              <Form.Item
                name="recipientCellphone"
                noStyle
                rules={[{ required: true, message: "Ingresa el teléfono" }]}
              >
                <Input placeholder="7777 7777" size="large" style={{ flex: 1 }} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col xs={24} md={16}>
          <Form.Item
            label="Dirección del destinatario"
            name="destinationAddress"
            rules={[{ required: true, message: "Ingresa la dirección" }]}
          >
            <Input
              placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Departamento"
            name="state"
            rules={[{ required: true, message: "Ingresa el departamento" }]}
          >
            <Input placeholder="San Salvador" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Municipio"
            name="city"
            rules={[{ required: true, message: "Ingresa el municipio" }]}
          >
            <Input placeholder="San Salvador" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Punto de referencia"
            name="referencePoint"
          >
            <Input
              placeholder="Cerca de redondel Arbol de la Paz"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Indicaciones" name="additionalInstructions">
            <Input.TextArea
              placeholder="Llamar antes de entregar"
              rows={3}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={onNext}
            style={PRIMARY_BUTTON_STYLE}
          >
            Siguiente &rarr;
          </Button>
        </div>
      </Form.Item>
    </>
  );
}

function CreateOrderStep2({
  products,
  onAddProduct,
  onRemoveProduct,
  onBack,
  onSubmit,
}: {
  products: PackageDto[];
  onAddProduct: (p: PackageDto) => void;
  onRemoveProduct: (index: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [largo, setLargo] = useState("");
  const [alto, setAlto] = useState("");
  const [ancho, setAncho] = useState("");
  const [pesoLibras, setPesoLibras] = useState("");
  const [contenido, setContenido] = useState("");

  const handleAdd = () => {
    const l = Number(largo);
    const a = Number(alto);
    const w = Number(ancho);
    const p = Number(pesoLibras);
    if (!l || !a || !w || !p || !contenido.trim()) return;
    onAddProduct({
      length: l,
      height: a,
      width: w,
      weight: p,
      content: contenido.trim(),
    });
    setLargo("");
    setAlto("");
    setAncho("");
    setPesoLibras("");
    setContenido("");
  };

  return (
    <div>
      <Title level={5} style={{ marginBottom: 16, fontWeight: 600 }}>
        Agrega tus productos
      </Title>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end",
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 18, opacity: 0.7 }}>&#9641;</span>
        <Input
          placeholder="Largo"
          value={largo}
          onChange={(e) => setLargo(e.target.value)}
          size="large"
          addonAfter="cm"
          style={{ width: 100 }}
        />
        <Input
          placeholder="Alto"
          value={alto}
          onChange={(e) => setAlto(e.target.value)}
          size="large"
          addonAfter="cm"
          style={{ width: 100 }}
        />
        <Input
          placeholder="Ancho"
          value={ancho}
          onChange={(e) => setAncho(e.target.value)}
          size="large"
          addonAfter="cm"
          style={{ width: 100 }}
        />
        <Input
          placeholder="Peso"
          value={pesoLibras}
          onChange={(e) => setPesoLibras(e.target.value)}
          size="large"
          addonAfter="libras"
          style={{ width: 120 }}
        />
        <Input
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          size="large"
          style={{ width: 200 }}
        />
        <Button
          size="large"
          onClick={handleAdd}
          style={{ background: COLOR_SECONDARY_BG, borderColor: COLOR_BORDER_GRAY }}
        >
          Agregar +
        </Button>
      </div>

      {products.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          {products.map((p, index) => (
            <div
              key={p.content}
              style={{
                border: `2px solid ${COLOR_SUCCESS}`,
                borderRadius: 8,
                padding: "12px 16px",
                marginBottom: 12,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Input
                size="middle"
                value={`${p.weight} libras`}
                readOnly
                style={{ width: 100 }}
              />
              <Input
                size="middle"
                value={p.content}
                readOnly
                style={{ width: 180 }}
              />
              <span style={{ fontSize: 16, opacity: 0.7 }}>&#9641;</span>
              <Input
                size="middle"
                value={`${p.length} cm`}
                readOnly
                style={{ width: 80 }}
              />
              <Input
                size="middle"
                value={`${p.height} cm`}
                readOnly
                style={{ width: 80 }}
              />
              <Input
                size="middle"
                value={`${p.width} cm`}
                readOnly
                style={{ width: 80 }}
              />
              <Button
                type="text"
                danger
                size="middle"
                onClick={() => onRemoveProduct(index)}
                aria-label="Eliminar"
              >
                &#128465;
              </Button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 24,
        }}
      >
        <Button
          size="large"
          onClick={onBack}
          style={{ background: COLOR_SECONDARY_BG, borderColor: COLOR_BORDER_GRAY, height: 44 }}
        >
          &larr; Regresar
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={onSubmit}
          style={PRIMARY_BUTTON_STYLE}
        >
          Enviar &rarr;
        </Button>
      </div>
    </div>
  );
}

export default function CreateOrderForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<PackageDto[]>([]);

  const handleStep1Next = async () => {
    try {
      await form.validateFields();
      setStep(1);
    } catch {
      // validation failed
    }
  };

  const handleAddProduct = (p: PackageDto) => {
    setProducts((prev) => [...prev, p]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const { countryCode, recipientCellphone, programedDate, ...rest } = form.getFieldsValue();

    const dto: CreateOrderDto = {
      ...rest,
      programedDate: dayjs(programedDate).toISOString(),
      recipientCellphone: `+${countryCode}${recipientCellphone}`,
      packages: products,
    };
    console.log("dto:", JSON.stringify(dto, null, 2));

    await ordersSerivice.create(dto);
    router.push(DASHBOARD_HISTORY);
  };

  return (
    <div style={{ background: COLOR_SECTION_BG, padding: "24px 0" }}>
      <Space direction="vertical" size={8} style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Crea una orden
        </Title>
        <Text style={{ fontSize: 14, color: COLOR_TEXT_SECONDARY }}>
          Dale una ventaja competitiva a tu negocio con entregas{" "}
          <strong>el mismo día</strong> (Área Metropolitana) y{" "}
          <strong>el día siguiente</strong> a nivel nacional.
        </Text>
      </Space>

      <Card
        style={{
          borderRadius: 8,
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
        styles={{ body: { padding: 24 } }}
      >
        <Form form={form} layout="vertical" {...FORM_LAYOUT}>
          <div style={{ display: step === 0 ? "block" : "none" }}>
            <Title level={5} style={{ marginBottom: 24, fontWeight: 600 }}>
              Completa los datos
            </Title>
            <CreateOrderStep1 onNext={handleStep1Next} />
          </div>
          {step === 1 && (
            <CreateOrderStep2
              products={products}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
              onBack={() => setStep(0)}
              onSubmit={handleSubmit}
            />
          )}
        </Form>
      </Card>
    </div>
  );
}
