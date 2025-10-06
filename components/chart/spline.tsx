"use client";
import Spline from "@splinetool/react-spline";

type SplineChartProps = {
  scene: string;
  className?: string;
};

export default function SplineChart({ scene, className }: SplineChartProps) {
  return (
    <main className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className={`w-full h-[500px] ${className}`}>
        <Spline scene={scene} style={{ width: "100%", height: "100%" }} />
      </div>
    </main>
  );
}
