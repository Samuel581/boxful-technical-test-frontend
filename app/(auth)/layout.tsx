import AuthPanelLayout from "@/app/components/layout/AuthPanelLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthPanelLayout>{children}</AuthPanelLayout>;
}