import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import qs from "qs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Wind, Mail, Eye, EyeOff, Shield } from "lucide-react";
import Logo from "../assets/logo_black.jpg";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { handleSubmit } = useForm();

  const initialValues: LoginFormData = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] =
    useState<LoginFormData>(initialValues);

  const { email, password } = loginDetails;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const onSubmit = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);

    const url = `${apiURL}/session`;

    try {
      const response = await axios.post(url, qs.stringify(loginDetails), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 font-sans relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#e0e7ff_1px,_transparent_1px)] [background-size:20px_20px] opacity-40"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={Logo} className="w-[150px]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Super Admin Login
          </h2>
          <p className="text-gray-600">Access the management portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your email"
                className="w-full px-4 py-3 h-12"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 h-12"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <label className="flex items-center">
              <Checkbox id="remember-me" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <span className="text-sm text-primary hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div> */}

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700 font-medium">
                Secure Admin Access
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Your session will be monitored for security purposes.
              </p>
            </div>
          </div>
        </div> */}

        {/* <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-500">
            Having trouble accessing your account?
          </p>
          <span className="text-sm text-primary hover:underline cursor-pointer">
            Contact System Administrator
          </span>
        </div> */}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
