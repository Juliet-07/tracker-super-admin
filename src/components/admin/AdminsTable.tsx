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
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const admins = [
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
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Select Filter */}
          <div className="flex flex-col">
            <label className="text-xs mb-1 ml-1">Filter Admin By Company</label>
            <Select>
              <SelectTrigger className="w-64 sm:w-auto">
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company1">Tech Corp</SelectItem>
                <SelectItem value="company2">Global Logistics</SelectItem>
                <SelectItem value="company3">Metro Transport</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
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
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </div>
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
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {admin.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {admin.lastLogin}
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
      </div>
    </div>
  );
};
