import Lottie from "lottie-react";
import chatListeningAnimation from "@/components/icons/chat_60px_listening.json";

export function SparkyLookingDown({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={chatListeningAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
