import { GoHome } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function BlogHeadline() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <Link to="/">
          <GoHome size={20} />
        </Link>
        <PiGreaterThanBold color="grey" size={15} className="mt-1" />
        <Link to="/blog" className="text-gray-600 font-semibold">
          Blogs
        </Link>
      </div>

      <p className="font-bold text-[15px] md:text-2xl lg:text-3xl space-x-1 whitespace-nowrap">
        <span className="text-[var(--color-primary)]">Popular Feeds.</span>
        <span className="text-gray-600">Click On The Post And Enjoy.</span>
      </p>
    </div>
  );
}
