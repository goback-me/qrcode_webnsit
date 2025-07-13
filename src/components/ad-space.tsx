import { Card } from "@/components/ui/card";

interface AdSpaceProps {
  size: "banner" | "square" | "rectangle" | "leaderboard";
  className?: string;
  label?: string;
}

export default function AdSpace({ size, className = "", label }: AdSpaceProps) {
  const sizeClasses = {
    banner: "h-24 w-full", // 728x90 or mobile banner
    square: "h-64 w-64", // 300x250 medium rectangle
    rectangle: "h-48 w-80", // 336x280 large rectangle
    leaderboard: "h-24 w-full max-w-3xl" // 728x90 leaderboard
  };

  return (
    <Card className={`${sizeClasses[size]} ${className} bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center`}>
      <div className="text-center text-neutral-500 dark:text-neutral-400">
        <div className="text-sm font-medium mb-1">
          {label || "Advertisement Space"}
        </div>
        <div className="text-xs text-neutral-400 dark:text-neutral-500">
          Google Ads will appear here
        </div>
      </div>
    </Card>
  );
}