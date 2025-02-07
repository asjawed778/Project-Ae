import { GoHome } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";
import { RiArrowRightWideLine } from "react-icons/ri";

export default function Headline({title}) {
  return (
      <div className="flex gap-2 items-center">
        <GoHome size={20} />
        <RiArrowRightWideLine size={20} className="text-neutral-400"  />
        <h1 className="text-neutral-400 font-semibold text-xs">{title}</h1>
      </div>
  );
}
