import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { AdminsTable } from "@/components/admin/AdminsTable";
import { Plus, Users, UserCheck, Search, Filter, Download } from "lucide-react";

const AdminsPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const fetchCompanyAdmins = async () => {
    const res = await axiosInstance.get(`${apiURL}/users`, {
      withCredentials: true,
    });
    const admins = res.data.filter((user) => user.role === "ADMIN");
    console.log(res.data, "response");
    return admins;
  };

  const {
    data: admins = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", "company-admins"],
    queryFn: fetchCompanyAdmins,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <main className="p-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
          <p className="text-gray-600">
            Create and manage admin accounts for companies
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button asChild>
            <Link to="/admins/add">
              <Plus />
              <span>Create Admin</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-8">
        <AdminStatsCard
          title="Total Admins"
          value={`${admins.length}`}
          Icon={Users}
          iconWrapperClassName="bg-blue-100 text-blue-600"
          description={<div className="flex items-center "></div>}
        />
        <AdminStatsCard
          title="Active Admins"
          value={`${admins.length}`}
          Icon={UserCheck}
          iconWrapperClassName="bg-green-100 text-green-600"
          description={<span className="text-green-600 hidden"></span>}
        />
      </div>

      {/* Admins Table */}
      <AdminsTable />
    </main>
  );
};

export default AdminsPage;
