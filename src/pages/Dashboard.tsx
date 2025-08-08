import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Info, X } from "lucide-react";
import KPICard from "@/components/KPICard";
import StatusCard from "@/components/StatusCard";
import ActionCard from "@/components/ActionCard";
import RegistrationChart from "@/components/RegistrationChart";
import ActivityChart from "@/components/ActivityChart";
import { format } from "date-fns";

const Dashboard = () => {
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
    const admins = res.data.filter((user) => user.role === "ADMIN");
    return admins;
  };

  const fetchUsers = async () => {
    const res = await axiosInstance.get(`${apiURL}/users`, {
      withCredentials: true,
    });
    const users = res.data.filter((user) => user.role === "COMPANY_USER");
    return users;
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
  const {
    data: users = [],
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of all registered companies and system activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 hidden sm:block">
            {format(new Date(), "dd MMM, yyyy")}
          </span>
          {/* <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Total Companies"
          value={`${companies.length}`}
          percentage=""
          timeframe=""
          icon="Building2"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPICard
          title="Total Admins"
          value={`${admins.length}`}
          percentage=""
          timeframe=""
          icon="Users"
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <KPICard
          title="Total Users"
          value={`${users.length}`}
          percentage=""
          timeframe=""
          icon="Car"
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        {/* <KPICard
          title="Active Now"
          value="892"
          percentage="+5%"
          timeframe="from yesterday"
          icon="Signal"
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 hidden">
        <StatusCard
          title="All Companies"
          value="24"
          barText="Total Companies"
          barColor="bg-primary"
        />
        <StatusCard
          title="Currently"
          value="18"
          barText="75% Active"
          barColor="bg-success"
        />
        <StatusCard
          title="Currently"
          value="4"
          barText="17% Inactive"
          barColor="bg-warning"
        />
        <StatusCard
          title="Currently"
          value="2"
          barText="8% Suspended"
          barColor="bg-danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActionCard
          title="Manage Companies"
          description="View, create, update company profiles. Assign admins and manage permissions."
          buttonText="Go to Companies"
          buttonIcon="Building2"
          imageUrl="https://storage.googleapis.com/uxpilot-auth.appspot.com/060207ae5d-8e25af9fa64123b9545d.png"
          path="/companies"
        />
        <ActionCard
          title="Admin Management"
          description="Create and manage admin accounts. Monitor admin activities and permissions."
          buttonText="Go to Admins"
          buttonIcon="Users"
          imageUrl="https://storage.googleapis.com/uxpilot-auth.appspot.com/4b4b76af60-3d2fde1ac574d7ecc4eb.png"
          path="/admins"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Company Registration Trend</h3>
          <div className="h-80">
            <RegistrationChart />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Activity Overview</h3>
          <div className="h-80">
            <ActivityChart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
