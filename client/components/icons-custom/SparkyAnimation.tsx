import Lottie from "lottie-react";
import searchReadyAnimation from "@/components/icons/search_28px_ready.json";

export function SparkyAnimation() {
  return (
    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
      <Lottie
        animationData={searchReadyAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
