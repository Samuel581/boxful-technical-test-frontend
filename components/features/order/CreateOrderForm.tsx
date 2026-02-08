"use client";

import React, { useState } from "react";
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

const { Title, Text } = Typography;

const formLayout = { wrapperCol: { span: 24 } };

const COUNTRY_CODE_OPTIONS = [
  { value: "503", label: "503" },
  { value: "52", label: "52" },
  { value: "57", label: "57" },
  { value: "54", label: "54" },
  { value: "1", label: "1" },
];

export interface OrderProduct {
  id: string;
  largo: number;
  alto: number;
  ancho: number;
  pesoLibras: number;
  contenido: string;
}

export interface CreateOrderFormValues {
  direccionRecoleccion: string;
  fechaProgramada: unknown;
  nombres: string;
  apellidos: string;
  correo: string;
  countryCode: string;
  telefono: string;
  direccionDestinatario: string;
  departamento: string;
  municipio: string;
  puntoReferencia: string;
  indicaciones: string;
}

const PRIMARY_BUTTON_STYLE = {
  backgroundColor: "#4242B5",
  borderColor: "#4242B5",
};

function CreateOrderStep1({
  form,
  onNext,
}: {
  form: ReturnType<typeof Form.useForm>[0];
  onNext: () => void;
}) {
  return (
    <Form form={form} layout="vertical" {...formLayout}>
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Form.Item
            label="Dirección de recolección"
            name="direccionRecoleccion"
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
            name="fechaProgramada"
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
            name="nombres"
            rules={[{ required: true, message: "Ingresa los nombres" }]}
          >
            <Input placeholder="Gabriela Reneé" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Apellidos"
            name="apellidos"
            rules={[{ required: true, message: "Ingresa los apellidos" }]}
          >
            <Input placeholder="Días López" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Correo electrónico"
            name="correo"
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
                name="telefono"
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
            name="direccionDestinatario"
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
            name="departamento"
            rules={[{ required: true, message: "Ingresa el departamento" }]}
          >
            <Input placeholder="San Salvador" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Municipio"
            name="municipio"
            rules={[{ required: true, message: "Ingresa el municipio" }]}
          >
            <Input placeholder="San Salvador" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Punto de referencia"
            name="puntoReferencia"
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
          <Form.Item label="Indicaciones" name="indicaciones">
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
            style={{ ...PRIMARY_BUTTON_STYLE, height: 44 }}
          >
            Siguiente &rarr;
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

function CreateOrderStep2({
  products,
  onAddProduct,
  onRemoveProduct,
  onBack,
  onSubmit,
}: {
  products: OrderProduct[];
  onAddProduct: (p: Omit<OrderProduct, "id">) => void;
  onRemoveProduct: (id: string) => void;
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
      largo: l,
      alto: a,
      ancho: w,
      pesoLibras: p,
      contenido: contenido.trim(),
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
          style={{ background: "#f5f5f5", borderColor: "#d9d9d9" }}
        >
          Agregar +
        </Button>
      </div>

      {products.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          {products.map((p, index) => (
            <div
              key={p.id}
              style={{
                border: "2px solid #52c41a",
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
                value={`${p.pesoLibras} libras`}
                readOnly
                style={{ width: 100 }}
              />
              <Input
                size="middle"
                value={p.contenido}
                readOnly
                style={{ width: 180 }}
              />
              <span style={{ fontSize: 16, opacity: 0.7 }}>&#9641;</span>
              <Input
                size="middle"
                value={`${p.largo} cm`}
                readOnly
                style={{ width: 80 }}
              />
              <Input
                size="middle"
                value={`${p.alto} cm`}
                readOnly
                style={{ width: 80 }}
              />
              <Input
                size="middle"
                value={`${p.ancho} cm`}
                readOnly
                style={{ width: 80 }}
              />
              <Button
                type="text"
                danger
                size="middle"
                onClick={() => onRemoveProduct(p.id)}
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
          style={{ background: "#f5f5f5", borderColor: "#d9d9d9", height: 44 }}
        >
          &larr; Regresar
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={onSubmit}
          style={{ ...PRIMARY_BUTTON_STYLE, height: 44 }}
        >
          Enviar &rarr;
        </Button>
      </div>
    </div>
  );
}

export default function CreateOrderForm() {
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<OrderProduct[]>([]);

  const handleStep1Next = async () => {
    try {
      await form.validateFields();
      setStep(1);
    } catch {
      // validation failed
    }
  };

  const handleAddProduct = (p: Omit<OrderProduct, "id">) => {
    setProducts((prev) => [
      ...prev,
      { ...p, id: `product-${Date.now()}-${Math.random().toString(36).slice(2)}` },
    ]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const payload = {
      ...values,
      products,
    };
    console.log("Create order payload:", payload);
    // TODO: call API
  };

  return (
    <div style={{ background: "#fafafa", padding: "24px 0" }}>
      <Space direction="vertical" size={8} style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Crea una orden
        </Title>
        <Text style={{ fontSize: 14, color: "#595959" }}>
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
        {step === 0 && (
          <>
            <Title level={5} style={{ marginBottom: 24, fontWeight: 600 }}>
              Completa los datos
            </Title>
            <CreateOrderStep1 form={form} onNext={handleStep1Next} />
          </>
        )}
        {step === 1 && (
          <CreateOrderStep2
            products={products}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onBack={() => setStep(0)}
            onSubmit={handleSubmit}
          />
        )}
      </Card>
    </div>
  );
}
