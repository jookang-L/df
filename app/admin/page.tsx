import { getAdminStudents } from "@/app/actions/admin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const students = await getAdminStudents();

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboard initialStudents={students} />
    </div>
  );
}
