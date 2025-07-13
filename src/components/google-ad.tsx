import { useEffect } from "react";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAd({ slot, format = "auto", style, className }: GoogleAdProps) {
  useEffect(() => {
    try {
      // In production, this would load actual Google AdSense ads
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("AdSense not loaded");
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: "100px",
          backgroundColor: "#f8f9fa",
          border: "1px dashed #e0e0e0",
          textAlign: "center",
          padding: "20px",
          color: "#666",
          fontSize: "14px",
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with actual AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      >
        {/* Placeholder content for development */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          height: "100%",
          minHeight: "90px"
        }}>
          <div style={{ fontWeight: "500", marginBottom: "8px" }}>
            Google Ads Space
          </div>
          <div style={{ fontSize: "12px", color: "#999" }}>
            Slot: {slot}
          </div>
        </div>
      </ins>
    </div>
  );
}

// Component for different ad sizes following Google AdSense guidelines
export function LeaderboardAd({ className }: { className?: string }) {
  return (
    <GoogleAd
      slot="1234567890"
      format="horizontal"
      style={{ width: "728px", height: "90px", maxWidth: "100%" }}
      className={className}
    />
  );
}

export function RectangleAd({ className }: { className?: string }) {
  return (
    <GoogleAd
      slot="1234567891"
      format="rectangle"
      style={{ width: "336px", height: "280px" }}
      className={className}
    />
  );
}

export function SquareAd({ className }: { className?: string }) {
  return (
    <GoogleAd
      slot="1234567892"
      format="rectangle"
      style={{ width: "300px", height: "250px" }}
      className={className}
    />
  );
}

export function BannerAd({ className }: { className?: string }) {
  return (
    <GoogleAd
      slot="1234567893"
      format="horizontal"
      style={{ width: "468px", height: "60px", maxWidth: "100%" }}
      className={className}
    />
  );
}