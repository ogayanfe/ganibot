import SplineChart from "@/components/chart/spline";
// import AuthRequiredComponents from "@/components/utils/auth-required-component";

export default function Chart() {
  return (
    // <AuthRequiredComponents>
      <div className="">
        <SplineChart scene="/scene.splinecode"/>
      </div>
    // </AuthRequiredComponents>
  );
}
