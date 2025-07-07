
import { Info, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProfilePictureCard from "@/components/profile/ProfilePictureCard";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import SecuritySettingsCard from "@/components/profile/SecuritySettingsCard";
import NotificationSettingsCard from "@/components/profile/NotificationSettingsCard";
import { Button } from "@/components/ui/button";

const ProfileSettings = () => {
  return (
    <div className="p-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Update your personal information and account settings</p>
        </div>
        {/* <div className="flex items-center space-x-3">
          <span className="text-muted-foreground">15 Jun, 2025</span>
        </div> */}
      </div>

      {/* <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-700 mb-6 [&>svg]:text-blue-500 relative">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-semibold text-blue-800">Demo Info</AlertTitle>
        <AlertDescription>
          This is a demo user, so some features are disabled.
        </AlertDescription>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 h-6 w-6">
            <X className="h-4 w-4" />
        </Button>
      </Alert> */}

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfilePictureCard />
          </div>
          <div className="lg:col-span-2">
            <PersonalInfoForm />
          </div>
        </div>

        <div className="mt-6">
          <SecuritySettingsCard />
        </div>
        
        <div className="mt-6">
          <NotificationSettingsCard />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
