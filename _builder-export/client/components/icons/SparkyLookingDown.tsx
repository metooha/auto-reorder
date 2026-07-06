import Lottie from "lottie-react";
import listeningAnimation from "./02 Chat_60px_Listening.json";

export function SparkyLookingDown({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={listeningAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
