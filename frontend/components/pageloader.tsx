import react from "react";

export default function LogoAnimation() {
  return (
    <div className="w-16 h-16 object-contain bg-black">
      <video
        src="/download.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
      />
    </div>
  );
}