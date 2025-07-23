import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Download,
  Building,
  Users,
  CheckCircle,
  SatelliteDish,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnalyticsKpiCard from "@/components/analytics/AnalyticsKpiCard";
import DeviceActivityChart from "@/components/analytics/DeviceActivityChart";
import CompanyGrowthChart from "@/components/analytics/CompanyGrowthChart";
import TopCompaniesCard from "@/components/analytics/TopCompaniesCard";
import SystemHealthCard from "@/components/analytics/SystemHealthCard";
import RecentAlertsCard from "@/components/analytics/RecentAlertsCard";
import PerformanceTable from "@/components/analytics/PerformanceTable";

const AnalyticsPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const fetchCompanies = async () => {
    const res = await axiosInstance.get(`${apiURL}/companies`, {
      withCredentials: true,
    });
    // console.log(res.data, "response");
    return res.data;
  };

  const fetchAdmins = async () => {
    const res = await axiosInstance.get(`${apiURL}/users`, {
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

  const {
    data: admins = [],
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdmins,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            System-wide analytics and performance insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select> */}
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalyticsKpiCard
          title="Total Companies"
          value={`${companies.length}`}
          icon={Building}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          change=""
          changeText=""
        />
        {/* <AnalyticsKpiCard
          title="Active Devices"
          value="1,847"
          icon={SatelliteDish}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          statusText="94.2% Online"
          statusColor="text-green-600"
        /> */}
        <AnalyticsKpiCard
          title="Total Users"
          value={`${admins.length}`}
          icon={Users}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          change=""
          changeText=""
        />
        <AnalyticsKpiCard
          title="System Uptime"
          value="99.8%"
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          statusText="Excellent"
          statusColor="text-green-600"
        />
      </div>
      {/* CHARTS */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DeviceActivityChart />
        <CompanyGrowthChart />
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <TopCompaniesCard />
        <SystemHealthCard />
        <RecentAlertsCard />
      </div>

      <PerformanceTable />
    </div>
  );
};

export default AnalyticsPage;
