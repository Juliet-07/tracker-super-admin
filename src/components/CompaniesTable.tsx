import { useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Search, Eye, Edit, Trash, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const iconColorMap = [
  { iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { iconBg: "bg-green-100", iconColor: "text-green-600" },
  { iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  { iconBg: "bg-red-100", iconColor: "text-red-600" },
  { iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  { iconBg: "bg-pink-100", iconColor: "text-pink-600" },
];

const CompaniesTable = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const getColorPair = (index: number) => {
    return iconColorMap[index % iconColorMap.length];
  };

  const fetchCompanies = async () => {
    const res = await axiosInstance.get(`${apiURL}/companies`, {
      withCredentials: true,
    });
    // console.log(res.data, "response");
    return res.data;
  };

  const {
    data: companies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000,
  });

  const paginatedCompanies = companies
    .filter((company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Card className="shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">
            All Companies ({companies.length})
          </h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search companies..."
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
              <TableHead>Company</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Reg. No</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.map((company, index) => {
              const { iconBg, iconColor } = getColorPair(index);
              return (
                <TableRow key={company.companyName}>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          iconBg
                        )}
                      >
                        <Building className={cn("h-5 w-5", iconColor)} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {company.companyName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.companyEmail}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {company.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {company.registrationNumber}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {company.companySize}
                  </TableCell>
                  {/* <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-transparent",
                      statusVariantMap[company.status]
                    )}
                  >
                    {company.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {company.created}
                </TableCell> */}
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {/* <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-900 h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-yellow-600 hover:text-yellow-900 h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-900 h-8 w-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
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
            Page {currentPage} of {Math.ceil(companies.length / itemsPerPage)}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(companies.length / itemsPerPage)
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              currentPage === Math.ceil(companies.length / itemsPerPage)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CompaniesTable;
