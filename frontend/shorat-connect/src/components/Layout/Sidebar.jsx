import { 
  Building2, 
  Users, 
  GraduationCap, 
  CreditCard, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  TrendingUp, 
  FileText, 
  Bell,
  Award,
  Target,
  IdCard,
  Upload,
  MessageSquare,
  Star,
  Gift,
  Briefcase,
  ChevronRight,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
  submenu?: MenuItem[];
  active?: boolean;
}

interface SidebarProps {
  userRole: string;
  activeItem: string;
  onItemClick: (item: string) => void;
  collapsed?: boolean;
}

export const Sidebar = ({ userRole, activeItem, onItemClick, collapsed = false }: SidebarProps) => {
  const getMenuItems = (): MenuItem[] => {
    const commonItems: MenuItem[] = [
      { icon: Home, label: "Dashboard" },
      { icon: Bell, label: "Notifications", badge: "3" },
    ];

    const adminItems: MenuItem[] = [
      { icon: Building2, label: "Franchise Management" },
      { icon: Users, label: "Staff Management" },
      { icon: GraduationCap, label: "Student Management" },
      { icon: CreditCard, label: "Payments & Billing" },
      { icon: BookOpen, label: "Course Management" },
      { icon: Calendar, label: "Batch Management" },
      { icon: ClipboardCheck, label: "Attendance System" },
      { icon: TrendingUp, label: "Progress & Grades" },
      { icon: FileText, label: "Reports & Analytics" },
      { icon: Award, label: "Certificates" },
      { icon: Target, label: "Lead Management" },
      { icon: IdCard, label: "ID Card Generator" },
      { icon: Upload, label: "File Management" },
      { icon: Calendar, label: "Events & Workshops" },
      { icon: MessageSquare, label: "Chat System" },
      { icon: Star, label: "Feedback System" },
      { icon: Gift, label: "Scholarships" },
      { icon: Briefcase, label: "Placement Tracker" },
    ];

    const franchiseItems: MenuItem[] = [
      { icon: Users, label: "Staff Management" },
      { icon: GraduationCap, label: "Student Management" },
      { icon: BookOpen, label: "Course Management" },
      { icon: Calendar, label: "Batch Management" },
      { icon: ClipboardCheck, label: "Attendance System" },
      { icon: TrendingUp, label: "Progress & Grades" },
      { icon: FileText, label: "Reports" },
      { icon: Target, label: "Lead Management" },
      { icon: Calendar, label: "Events & Workshops" },
      { icon: MessageSquare, label: "Chat System" },
    ];

    const staffItems: MenuItem[] = [
      { icon: GraduationCap, label: "My Students" },
      { icon: Calendar, label: "My Batches" },
      { icon: ClipboardCheck, label: "Attendance" },
      { icon: TrendingUp, label: "Student Progress" },
      { icon: MessageSquare, label: "Chat" },
    ];

    switch (userRole) {
      case "admin":
        return [...commonItems, ...adminItems];
      case "franchise_head":
        return [...commonItems, ...franchiseItems];
      case "staff":
        return [...commonItems, ...staffItems];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const MenuItem = ({ item }: { item: MenuItem }) => (
    <Button
      variant={activeItem === item.label ? "default" : "ghost"}
      className={cn(
        "w-full justify-start mb-1 relative group",
        collapsed ? "px-2" : "px-3",
        activeItem === item.label && "bg-primary text-primary-foreground shadow-medium"
      )}
      onClick={() => onItemClick(item.label)}
    >
      <item.icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {item.badge}
            </Badge>
          )}
        </>
      )}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
          {item.label}
        </div>
      )}
    </Button>
  );

  return (
    <aside className={cn(
      "bg-card border-r border-border h-full transition-all duration-300 shadow-soft",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};