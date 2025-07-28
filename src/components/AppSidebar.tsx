import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Users, LineChart, Settings, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo_White from "../assets/logo.svg";

const navItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/home",
  },
  {
    icon: Building2,
    label: "Companies",
    href: "/companies",
  },
  {
    icon: Users,
    label: "Admins",
    href: "/admins",
  },
  {
    icon: LineChart,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const AppSidebar = () => {
  const { state, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" && !isMobile;

  const handleMobileNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      className="bg-primary text-white border-r-0 [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:text-gray-800"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col p-0 bg-primary [&[data-mobile=true]]:bg-white">
        <SidebarHeader className="p-4 border-b border-white/20 bg-primary [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              to="/home"
              className="flex items-center space-x-2"
              onClick={handleMobileNavClick}
            >
              {(!isCollapsed || isMobile) && (
                <img src={Logo_White} className="w-[100px]" />
              )}
            </Link>
            {isMobile && (
              <button
                onClick={handleMobileNavClick}
                className="p-2 rounded-md hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </SidebarHeader>
        <nav className="flex-grow mt-4 px-2 bg-primary [&[data-mobile=true]]:bg-white">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="justify-start text-base hover:bg-white/20 data-[active=true]:bg-white/20 data-[active=true]:hover:bg-white/30 text-white [&[data-mobile=true]]:text-gray-800 [&[data-mobile=true]]:hover:bg-gray-100 [&[data-mobile=true]]:data-[active=true]:bg-gray-100 py-3 px-4"
                    tooltip={
                      isCollapsed && !isMobile
                        ? {
                            children: item.label,
                            side: "right",
                            align: "center",
                          }
                        : undefined
                    }
                  >
                    <Link
                      to={item.href}
                      className="flex items-center space-x-3 py-[22px]"
                      onClick={handleMobileNavClick}
                    >
                      <item.icon className="h-5 w-5" />
                      {(!isCollapsed || isMobile) && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
