'use client'
import Spline from "@splinetool/react-spline";

type SplineChartProps = {
  scene: string;
  width?: string;   // Tailwind width e.g. "w-full" or "w-[600px]"
  height?: string;  // Tailwind height e.g. "h-[400px]"
};

export default function SplineChart({
  scene,
  width = "w-full",
  height = "h-[500px]",
}: SplineChartProps) {
  return (
    <main className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className={`${width} ${height}`}>
        <Spline
          scene={scene}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      </div>
    </main>
  );
}
