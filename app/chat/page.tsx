import SplineChart from "@/components/chart/spline";
import AuthRequiredComponents from "@/components/utils/auth-required-component";

export default function Chart() {
  return (
    <AuthRequiredComponents>
      <div>
        <SplineChart />
      </div>
    </AuthRequiredComponents>
  );
}
