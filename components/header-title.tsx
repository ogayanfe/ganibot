import Link from "next/link";
import { MdOutlinePanoramaPhotosphereSelect } from "react-icons/md";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // pick weights you need
});

export default function HeaderTitle() {
  return (
    <Link href={"/"}>
      <h1
        className={`text-slate-700 dark:text-slate-300 font-bold uppercase text-2xl sm:text-4xl flex items-center justify-center gap-3 ${pixelify.className}`}
      >
        {<MdOutlinePanoramaPhotosphereSelect />}
        Gani
      </h1>
    </Link>
  );
}
