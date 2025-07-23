import { Link } from "react-router-dom";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Building, ChartLine } from "lucide-react";
import CompanyStatsCard from "@/components/CompanyStatsCard";
import QuickActionCard from "@/components/QuickActionCard";
import CompaniesTable from "@/components/CompaniesTable";

const CompaniesPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const fetchCompanies = async () => {
    const res = await axiosInstance.get(`${apiURL}/companies`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
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
  return (
    <main className="p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Company Management
          </h1>
        </div>
        <Button asChild>
          <Link to="/companies/add">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Company</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CompanyStatsCard
          title="All Companies"
          value={`${companies.length}`}
          barText="Total Companies"
          barColor="bg-primary"
        />
        <CompanyStatsCard
          title="Currently"
          value="18"
          barText="75% Active"
          barColor="bg-success"
        />
        <CompanyStatsCard
          title="Currently"
          value="4"
          barText="17% Inactive"
          barColor="bg-warning"
        />
        <CompanyStatsCard
          title="Currently"
          value="2"
          barText="8% Suspended"
          barColor="bg-danger"
        />
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QuickActionCard
          title="Manage Companies"
          description="View, create, update, delete company profiles. Assign admins and manage permissions for each organization."
          buttonText="View All Companies"
          buttonIcon={ArrowRight}
          titleIcon={Building}
          imageUrl="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&q=80"
        />
        <QuickActionCard
          title="Company Reports"
          description="Generate detailed reports for each company including device usage, admin activities, and performance metrics."
          buttonText="Generate Reports"
          buttonIcon={ArrowRight}
          titleIcon={ChartLine}
          imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80"
        />
      </div> */}

      {/* Companies Table */}
      <CompaniesTable />
    </main>
  );
};

export default CompaniesPage;
