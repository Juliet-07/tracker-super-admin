import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, UserPlus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const AddAdminPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const initialValue = {
    name: "",
    email: "",
    phone: "",
    password: "",
    readonly: true,
    administrator: true,
    map: null,
    latitude: 0.0,
    longitude: 0.0,
    zoom: 0,
    coordinateFormat: null,
    disabled: false,
    expirationTime: null,
    deviceLimit: 0,
    userLimit: 0,
    deviceReadonly: false,
    limitCommands: false,
    disableReports: false,
    fixedEmail: false,
    poiLayer: null,
    role: "ADMIN",
    companyId: 7,
    totpKey: null,
    temporary: false,
  };
  const [formData, setFormData] = useState(initialValue);

  const {
    name,
    email,
    phone,
    readonly,
    administrator,
    map,
    latitude,
    longitude,
    zoom,
    coordinateFormat,
    disabled,
    expirationTime,
    deviceLimit,
    userLimit,
    deviceReadonly,
    limitCommands,
    disableReports,
    fixedEmail,
    poiLayer,
    role,
    companyId,
    totpKey,
    temporary,
    password,
  } = formData;

  const fetchCompanies = async () => {
    const res = await axiosInstance.get(`${apiURL}/companies`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: companies = [],
    isLoading: industriesLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["company"],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000,
  });

  // Handle basic input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = async () => {
    if (!companyId) {
      alert("Please select Company");
      return;
    }

    try {
      setLoading(true);
      const url = `${apiURL}/users`;

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      console.log(response, "response from adding admin");

      toast.success("Admin Successfully Added");
      setFormData(initialValue);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="p-6 bg-gray-50/50 min-h-screen">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/admins">Admins</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Onboard Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Onboarding
          </h1>
          <p className="text-gray-600">
            Complete the form below to onboard a new admin to the eKaze
            platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-8 py-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Admin Details
              </h2>
            </div>
            <form onSubmit={handleSubmit(handleAddCompany)}>
              <div className="px-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="firstName" className="mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="admin@company.com"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="mb-2 block">
                      Select Company <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      required
                      value={String(companyId)}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyId: Number(value),
                        }))
                      }
                    >
                      <SelectTrigger id="company">
                        <SelectValue placeholder="Choose a company to assign admin" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company: any) => (
                          <SelectItem
                            key={company.id}
                            value={String(company.id)}
                          >
                            {company.companyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="password" className="mb-2 block">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="password"
                      placeholder="*********"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-end space-x-3">
                <Button
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={loading}
                >
                  <UserPlus className="mr-2" />
                  {loading ? "Submitting..." : "Onboard Admin"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddAdminPage;
