import { GoHome } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";

export default function BlogHeadline() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <GoHome size={20} />
        <PiGreaterThanBold color="grey" size={15} className="mt-1" />
        <h1 className="text-gray-600 font-semibold">Blogs</h1>
      </div>

      <p className="font-bold text-3xl space-x-1 whitespace-nowrap">
        <span className="text-[var(--color-primary)]">Popular Feeds.</span>
        <span className="text-gray-600">Click On The Post And Enjoy.</span>
      </p>
    </div>
  );
}
