import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CompaniesTable from "@/components/CompaniesTable";

const CompaniesPage = () => {
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

      {/* Companies Table */}
      <CompaniesTable />
    </main>
  );
};

export default CompaniesPage;
