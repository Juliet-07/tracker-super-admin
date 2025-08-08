import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/api/axios";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Building, Image, ArrowRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";

const AddCompanyPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValue = {
    logo: "",
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    registrationNumber: "",
    companySize: "",
    businessAddress: "",
    industryId: undefined,
    website: "",
    timeZone: "",
  };
  const [formData, setFormData] = useState(initialValue);

  const {
    logo,
    companyName,
    companyEmail,
    companySize,
    registrationNumber,
    phoneNumber,
    businessAddress,
    industryId,
    website,
    timeZone,
  } = formData;

  const fetchIndustires = async () => {
    const res = await axiosInstance.get(`${apiURL}/industries`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: industries = [],
    isLoading: industriesLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustires,
    staleTime: 5 * 60 * 1000,
  });

  // Handle basic input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo file input
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Max size is 2MB.");
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFormData((prev) => ({ ...prev, logo: file.name }));
  };

  const handleAddCompany = async () => {
    if (!industryId) {
      alert("Please select industry");
      return;
    }

    try {
      setLoading(true);
      const url = `${apiURL}/companies`;

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      console.log(response, "response from adding company");

      toast.success("Company Successfully Added");
      setFormData(initialValue);
      setLogoPreview(null);
      setLogoFile(null);
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
      <main className="p-4 md:p-6 bg-gray-50 min-h-full">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Onboard New Company
              </h1>
              <p className="text-gray-600">
                Add a new company to the eKaze GPS tracking platform
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/companies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Back to Companies</span>
              </Link>
            </Button>
          </div>

          {/* Form */}
          <Card className="p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Building className="text-primary mr-3 h-5 w-5" />
              Company Information
            </h2>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(handleAddCompany)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center space-x-4">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="text-gray-400 h-8 w-8" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="w-[100px] cursor-pointer"
                    />
                    <span className="text-gray-500 text-sm">
                      Optional - JPG/PNG up to 2MB
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input
                    id="company-name"
                    placeholder="Enter company name"
                    name="companyName"
                    value={companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-number">Registration Number</Label>
                  <Input
                    id="reg-number"
                    placeholder="Business registration number"
                    name="registrationNumber"
                    value={registrationNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industryId">Industry *</Label>
                  <Select
                    required
                    value={industryId ? String(industryId) : undefined}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        industryId: Number(value),
                      }))
                    }
                  >
                    <SelectTrigger id="industryId">
                      <SelectValue
                        // placeholder={
                        //   industriesLoading ? "Loading..." : "Select industry"
                        // }
                        placeholder="Select Industry"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry: any) => (
                        <SelectItem
                          key={industry.id}
                          value={String(industry.id)}
                        >
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select
                    value={companySize}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, companySize: value }))
                    }
                  >
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Business Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete business address"
                    rows={3}
                    name="businessAddress"
                    value={businessAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="company@example.com"
                    name="companyEmail"
                    value={companyEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://company.com"
                    name="website"
                    value={website}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone *</Label>
                  <Select
                    required
                    value={timeZone}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, timeZone: value }))
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">
                        UTC-8 (Pacific Time)
                      </SelectItem>
                      <SelectItem value="utc-7">
                        UTC-7 (Mountain Time)
                      </SelectItem>
                      <SelectItem value="utc-6">
                        UTC-6 (Central Time)
                      </SelectItem>
                      <SelectItem value="utc-5">
                        UTC-5 (Eastern Time)
                      </SelectItem>
                      <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-bold mb-4">Subscription Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subscriptionPlans.map((plan) => (
                  <SubscriptionPlanCard
                    key={plan.title}
                    {...plan}
                    selected={selectedPlan === plan.title}
                    onSelect={() => setSelectedPlan(plan.title)}
                  />
                ))}
              </div>
            </div> */}

              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="ghost"
                  asChild
                  type="button"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Link to="/companies">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cancel
                  </Link>
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Add Company"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
};

export default AddCompanyPage;
