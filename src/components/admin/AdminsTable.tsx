import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const admins1 = [
  {
    name: "John Smith",
    email: "john.smith@techcorp.com",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    company: "Tech Corp",
    companyType: "Technology",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@globallogistics.com",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    company: "Global Logistics",
    companyType: "Logistics",
    role: "Admin",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    name: "Mike Davis",
    email: "m.davis@metrotransport.com",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    company: "Metro Transport",
    companyType: "Transportation",
    role: "Admin",
    status: "Pending",
    lastLogin: "Never",
  },
];

export const AdminsTable = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAdmins = async () => {
    const res = await axiosInstance.get(`${apiURL}/users`, {
      withCredentials: true,
    });
    const admins = res.data.filter((user) => user.role === "ADMIN");
    console.log(admins, "Admins only");
    return admins;
  };

  const {
    data: admins = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
    staleTime: 5 * 60 * 1000,
  });

  const paginatedAdminTable = admins
    .filter((admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Admins Available on Platform
        </h3>
        <div className="flex items-end space-x-6">
          {/* Search Input */}
          <div className="relative flex flex-col">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Admins..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAdminTable.map((admin) => (
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
                  <div className="text-sm text-gray-900">{admin.company}</div>
                  <div className="text-sm text-gray-500">
                    {admin.companyType}
                  </div>
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
                      <button className="text-primary hover:text-blue-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Deactivate
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end items-center gap-4 m-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {Math.ceil(admins.length / itemsPerPage)}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(admins.length / itemsPerPage) ? prev + 1 : prev
              )
            }
            disabled={currentPage === Math.ceil(admins.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
