import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-14 w-14",
};

export function Logo({ className, size = "md" }: LogoProps) {
  const navigate = useNavigate();

  return (
    <img
      src="/images/leadwalnut-logo.svg"
      alt="Lead Walnut Logo"
      className={cn(size ? sizeClasses[size] : "", className)}
      onClick={() => navigate("/")}
    />
  );
}
