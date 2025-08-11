import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

<<<<<<< HEAD
const Toaster = (props) => {
  const { theme = "system" } = useTheme()
=======
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
>>>>>>> da398745a77ff8ce04bb6c0f6a5317e97244df88

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
