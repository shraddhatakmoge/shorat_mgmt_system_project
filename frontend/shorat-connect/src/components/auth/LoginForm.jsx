import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = ({ onLogin }) => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [branchID, setBranchID] = useState("");
  const { toast } = useToast();

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setRole("");
    setName("");
    setBranch("");
    setBranchID("");
    setStatus("idle");
    setIsLoading(false);
    setView("login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    onLogin({ email, password, role });
    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !role || !branch) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setStatus("verifying");

    await new Promise((r) => setTimeout(r, 1500));
    const generatedPassword = Math.random().toString(36).slice(-8);

    console.log(`Sending password "${generatedPassword}" to ${email}`);

    toast({
      title: "Account Created",
      description: "Check your email for your password.",
    });

    setStatus("pendingApproval");
  };

  const onBranchChange = (val) => {
    setBranch(val);
    setBranchID(val === "wagholi" ? "SI01" : val === "ahilya" ? "SI02" : "");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      <Card className="w-full max-w-md shadow-strong">
        <CardHeader className="text-center">
          <div>Logo…</div>
          <CardTitle className="text-2xl font-bold">Shorat Innovations</CardTitle>
          <CardDescription>
            {view === "login"
              ? "Franchise Management System"
              : "Register New Account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="franchise_head">Franchise Head</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full bg-red-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-center text-sm">
                New here?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setView("register")}
                >
                  Register now
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="franchise_head">Franchise Head</SelectItem>
                </SelectContent>
              </Select>

              <Label>Full Name</Label>
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label>Branch</Label>
              <Select value={branch} onValueChange={onBranchChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wagholi">Wagholi Pune</SelectItem>
                  <SelectItem value="ahilya">Ahilya Nagar</SelectItem>
                </SelectContent>
              </Select>

              {branchID && (
                <Input placeholder="Branch ID" value={branchID} readOnly />
              )}

              <Button
                type="submit"
                className={`w-full ${
                  status !== "idle" ? "bg-red-700" : "bg-blue-600"
                }`}
                disabled={status !== "idle"}
              >
                {status === "verifying"
                  ? "Verifying..."
                  : status === "pendingApproval"
                  ? "Pending Approval"
                  : "Create Account"}
              </Button>

              {status === "pendingApproval" && (
                <div className="text-center">
                  <Button variant="link" onClick={resetFields}>
                    Back to Login
                  </Button>
                </div>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
