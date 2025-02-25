import Button from "../../components/Button/Button";

export default function BookDemoClass() {
  return (
    <div className="bg-white flex flex-col gap-5 p-5 h-[460px] w-[70vw] lg:w-[351.15px] drop-shadow-2xl shadow-xl rounded-xl mx-auto">
      <h1 className="font-bold text-lg text-[var(--color-primary)]">
        Book Your Free Demo Class
      </h1>

      {/* Name */}
      <section className="flex gap-2">
        <input
          type="text"
          placeholder="First Name"
          className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
        />
      </section>

      {/* Phone Number */}
      <input
        type="number"
        placeholder="Phone No"
        className="px-3 py-1 border border-gray-400 rounded-md outline-none"
      />

      {/* Email Id */}
      <input
        type="email"
        placeholder="Email Id"
        className="px-3 py-1 border border-gray-400 rounded-md outline-none"
      />

      {/* Education */}
      <input
        type="text"
        placeholder="Education"
        className="px-3 py-1 border border-gray-400 rounded-md outline-none"
      />

      {/* Interested Course */}
      <input
        type="text"
        placeholder="Interested Course"
        className="px-3 py-1 border border-gray-400 rounded-md outline-none"
      />

      <section className="flex items-center">
        <input type="radio" name="Whatsapp" id="Whatsapp" />
        <span className="pl-2">Send me an update on Whatsapp</span>
      </section>

      <Button>Submit</Button>
    </div>
  );
}
