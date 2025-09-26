import { Home } from "~/home/home";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GaniBot" }, // page title
    { name: "description", content: "This " },
  ];
}

export default function Page() {
  return <Home />;
}
