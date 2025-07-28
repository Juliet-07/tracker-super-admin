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
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchCompanyAdmins,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
          value={`${users.length}`}
          Icon={Users}
          iconWrapperClassName="bg-blue-100 text-blue-600"
          description={<div className="flex items-center "></div>}
        />
        <AdminStatsCard
          title="Active Admins"
          value={`${users.length}`}
          Icon={UserCheck}
          iconWrapperClassName="bg-green-100 text-green-600"
          description={<span className="text-green-600 hidden"></span>}
        />
        {/* <AdminStatsCard
          title="Pending Invites"
          value="6"
          Icon={Clock}
          iconWrapperClassName="bg-orange-100 text-orange-600"
          description={<span className="text-orange-600">12.5% Pending</span>}
        />
        <AdminStatsCard
          title="Companies Covered"
          value="24"
          Icon={Building}
          iconWrapperClassName="bg-purple-100 text-purple-600"
          description={<span className="text-green-600">100% Coverage</span>}
        /> */}
      </div>

      {/* Admins Table */}
      <AdminsTable />
    </main>
  );
};

export default AdminsPage;
