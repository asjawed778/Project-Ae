import girl1 from "../../public/imgs/girl1.png";

export default function Membership() {
  return (
    <div className="relative text-white bg-red-600 flex items-center gap-5 h-[200px] w-[650px] my-5 p-5 rounded-lg">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-xl">
          Why You should buy Abilita Membership
        </h1>

        <p className="text-xs flex flex-col gap-1">
          <span>
            Teachers don't get lost in the grid view and have a dedicated Podium
            space.
          </span>
          <span>
            Teachers don't get lost in the grid view and have a dedicated Podium
            space.
          </span>
        </p>

        <button className="text-xs text-green-800 bg-white w-fit px-6 py-2 rounded-lg">
          BUY NOW
        </button>
      </div>

      <img
        src={girl1}
        alt="girl"
        className="absolute -right-28 bottom-0 w-96 h-fit"
      />
    </div>
  );
}
