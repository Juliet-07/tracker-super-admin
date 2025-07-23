import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Monitor, Smartphone } from "lucide-react";

const SecuritySettingsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Change Password */}
        <div>
          <h4 className="text-md font-semibold mb-4">Change Password</h4>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="mt-4">
              <Button>Update Password</Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettingsCard;
