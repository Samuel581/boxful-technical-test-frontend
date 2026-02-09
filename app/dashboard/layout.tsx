import DashboardLayout from "@/app/components/layout/DashboardLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return( 
  <ProtectedRoute>
    <DashboardLayout>{children}</DashboardLayout>;
  </ProtectedRoute>
  )
}
