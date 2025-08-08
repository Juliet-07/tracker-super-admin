import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axios";
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
import { Search, Eye, Edit, Trash, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { toast, ToastContainer } from "react-toastify";

const iconColorMap = [
  { iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { iconBg: "bg-green-100", iconColor: "text-green-600" },
  { iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  { iconBg: "bg-red-100", iconColor: "text-red-600" },
  { iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  { iconBg: "bg-pink-100", iconColor: "text-pink-600" },
];

type Company = {
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  registrationNumber: string;
  companySize: string;
  businessAddress: string;
  website: string;
  industry: string;
};

const CompaniesTable = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [industryName, setIndustryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();

  const [editFormData, setEditFormData] = useState<Company>({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    registrationNumber: "",
    companySize: "",
    businessAddress: "",
    website: "",
    industry: "",
  });

  const getColorPair = (index: number) => {
    return iconColorMap[index % iconColorMap.length];
  };

  const fetchCompanies = async () => {
    const res = await axiosInstance.get(`${apiURL}/companies`, {
      withCredentials: true,
    });
    // console.log(res.data, "response for companies");
    return res.data;
  };

  const {
    data: companies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies", "company-table"],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000,
  });

  const paginatedCompanies = companies
    .filter((company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchCompanyDetails = async (id: string) => {
    try {
      const res = await axiosInstance.get(`${apiURL}/companies/${id}`, {
        withCredentials: true,
      });
      const company = res.data;
      setCompanyDetails(company);

      // Fetch industry name using the industry ID
      if (company.industryId) {
        const industryRes = await axiosInstance.get(
          `${apiURL}/industries/${company.industryId}`,
          {
            withCredentials: true,
          }
        );
        setIndustryName(industryRes.data.name);
      } else {
        setIndustryName("N/A");
      }
    } catch (err) {
      console.error("Failed to fetch company or industry:", err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axiosInstance.put(
        `${apiURL}/companies/${editingCompanyId}`,
        editFormData,
        { withCredentials: true }
      );
      setIsEditModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["companies", "company-table"],
      });
      toast.success("Company successfully updated");
    } catch (error) {
      console.error("Failed to update company:", error);
      toast.error("Update Failed");
    }
  };

  const handleEditCompany = (company: any) => {
    setEditingCompanyId(company.id);
    setEditFormData(company);
    setIsEditModalOpen(true);
  };

  const handleDeleteCompany = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`${apiURL}/companies/${id}`, {
        withCredentials: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["companies", "company-table"],
      });
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* MODALS */}
      {/* VIEW MODAL */}
      {isModalOpen && companyDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl space-y-4">
            <h3 className="text-lg font-bold mb-2 text-center">
              Company Details
            </h3>
            <p>
              <strong>Name:</strong> {companyDetails.companyName}
            </p>
            <p>
              <strong>Email:</strong> {companyDetails.companyEmail}
            </p>
            <p>
              <strong>Phone:</strong> {companyDetails.phoneNumber}
            </p>
            <p>
              <strong>Industry:</strong> {industryName}
            </p>
            <p>
              <strong>Reg No:</strong> {companyDetails.registrationNumber}
            </p>
            <p>
              <strong>Size:</strong> {companyDetails.companySize}
            </p>
            <p>
              <strong>Address:</strong> {companyDetails.businessAddress}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={
                  companyDetails.website.startsWith("http")
                    ? companyDetails.website
                    : `https://${companyDetails.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {companyDetails.website}
              </a>
            </p>

            {/* Add more fields as needed */}
            <div className="mt-4 text-right">
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-center">
              Edit Company Data
            </h3>
            <form
              onSubmit={handleSubmit(handleEditSubmit)}
              className="space-y-4"
            >
              <Input
                placeholder="Company Name"
                value={editFormData.companyName}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    companyName: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Email"
                value={editFormData.companyEmail}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    companyEmail: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Phone Number"
                value={editFormData.phoneNumber}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Registration Number"
                value={editFormData.registrationNumber}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    registrationNumber: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Company Size"
                value={editFormData.companySize}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    companySize: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Business Address"
                value={editFormData.businessAddress}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    businessAddress: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Website"
                value={editFormData.website}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, website: e.target.value })
                }
              />
              {/* <Input
                placeholder="Industry ID"
                value={editFormData.industry}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, industry: e.target.value })
                }
              /> */}
              <div className="mt-4 text-right">
                <Button type="submit" className="mr-2">
                  Save
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-900 h-8 w-8"
                          onClick={() => {
                            setSelectedCompanyId(company.id);
                            fetchCompanyDetails(company.id);
                            setIsModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-yellow-600 hover:text-yellow-900 h-8 w-8"
                          onClick={() => handleEditCompany(company)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-900 h-8 w-8"
                          onClick={() =>
                            handleDeleteCompany(company.id, company.companyName)
                          }
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
    </>
  );
};

export default CompaniesTable;
