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
          <h1 className="text-2xl font-bold text-foreground">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Update your personal information and account settings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-muted-foreground">
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default ProfileSettings;
