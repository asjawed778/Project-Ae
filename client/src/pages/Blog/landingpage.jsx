import img1 from "../../../public/imgs/blogs/img1.svg";
import img2 from "../../../public/imgs/blogs/img2.svg";
import img3 from "../../../public/imgs/blogs/img3.svg";
import BlogHeadline from "./BlogHeadline";
import MorePosts from "./MorePosts";

export default function blogpage() {
  const blogs = [
    {
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      img: img2,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      img: img2,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      img: img2,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
    {
      img: img1,
      techs: ["Technology", "Technology"],
      title:
        "How Jennifer Aniston Struggles With Depression Inspired New Album",
      content:
        "Music expresses feeling and thought, without language. It was below and before speech,…",
    },
  ];

  const shortNews = [
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
    {
      img: img3,
      title: "Self Driving car: Everything you n...",
      techs: "Technology",
    },
  ];

  return (
    <div className="flex flex-col gap-5 px-[250px] py-10">
      <BlogHeadline />

      <div className="grid grid-cols-3 gap-6">
        {/* First Row: Two Blogs + Info Section */}
        {blogs.slice(0, 2).map((blog, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
            <img
              src={blog.img}
              alt="blog img"
              className="/h-[280px] w-[400px]"
            />
            <h2 className="font-semibold">{blog.title}</h2>
            <p className="text-sm text-gray-600">{blog.content}</p>
          </div>
        ))}

        <div className="flex flex-col gap-3 p-6 shadow-lg rounded-lg">
          {shortNews.map((news, index) => (
            <div key={index} className="flex gap-3">
              <img src={img3} alt="img 3" className="h-[52px]" />

              <section className="flex flex-col">
                <p className=" tracking-tight font-bold text-[13px]">
                  Self Driving car: Everything you n...
                </p>
                <p className="text-[10px] bg-[var(--color-primary)] text-white w-fit px-1 rounded-full">
                  Technology
                </p>
              </section>
            </div>
          ))}

          <button className="font-semibold text-xs text-[var(--color-primary)] ml-auto">
            View More
          </button>
        </div>

        {/* Remaining Rows: 3 Blogs Each */}
        {blogs.slice(2).map((blog, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
            <img
              src={blog.img}
              alt="blog img"
              className="/h-[280px] w-[400px]"
            />
            <h2 className="font-semibold">{blog.title}</h2>
            <p className="text-sm text-gray-600">{blog.content}</p>
          </div>
        ))}
      </div>

      <MorePosts />
    </div>
  );
}
