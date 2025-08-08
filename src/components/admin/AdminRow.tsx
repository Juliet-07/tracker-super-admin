import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditAdminModal from "./EditAdminModal";

type Admin = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  companyId: string;
  companyType?: string;
  role: string;
  status: string;
};

const useCompany = (companyId: string) => {
  return useQuery({
    queryKey: ["company", companyId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/companies/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });
};

const AdminRow = ({ admin }: { admin: Admin }) => {
  const { data: company, isLoading: companyLoading } = useCompany(
    admin.companyId
  );
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteAdmin = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/users/${id}`, {
        withCredentials: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <TableRow key={admin.email}>
        <TableCell>
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={admin.avatar} alt={admin.name} />
              <AvatarFallback>
                {admin.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {admin.name}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="text-sm text-gray-900">{admin.email}</div>
        </TableCell>
        <TableCell>
          <div className="text-sm text-gray-900">{admin.phone}</div>
        </TableCell>
        <TableCell>
          <div className="text-sm text-gray-900">
            {companyLoading
              ? "Loading..."
              : company?.companyName || "No company"}
          </div>
          <div className="text-sm text-gray-500">{admin.companyType}</div>
        </TableCell>
        <TableCell>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {admin.role}
          </span>
        </TableCell>
        <TableCell>
          {admin.status === "Pending" ? (
            <div className="flex items-center space-x-3 text-sm font-medium">
              <button className="text-primary hover:text-blue-900">
                Resend
              </button>
              <button className="text-red-600 hover:text-red-900">
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-sm font-medium">
              <button
                className="text-primary hover:text-blue-900"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-900"
                onClick={() => handleDeleteAdmin(admin.id, admin.name)}
              >
                Delete
              </button>
            </div>
          )}
        </TableCell>
      </TableRow>

      <EditAdminModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        admin={admin}
      />
    </>
  );
};
export default AdminRow;
