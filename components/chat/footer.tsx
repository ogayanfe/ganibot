import { CiVideoOn } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { TiMicrophone } from "react-icons/ti";
import IconButton from "../button/icon-button";

export default function ChatFooter() {
  return (
    <footer className="flex justify-center items-center gap-10 py-6 border-gray-800 h-[200px] fixed bottom-0 w-screen">
      <IconButton label="video">
        <CiVideoOn size={30} />
      </IconButton>

      <div className="relative flex items-center justify-center">
        <IconButton
          type="button"
          label="Enable Caption"
          className="relative p-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg hover:scale-105 transition transform"
        >
          <TiMicrophone size={32} />
        </IconButton>
      </div>

      <IconButton label="close">
        <ImCancelCircle size={30} />
      </IconButton>
    </footer>
  );
}
