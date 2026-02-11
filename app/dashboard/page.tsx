import { redirect } from "next/navigation";
import { DASHBOARD_CREATE_ORDER } from "@/app/constants/frontendRoute";

export default function DashboardPage() {
  redirect(DASHBOARD_CREATE_ORDER);
}
