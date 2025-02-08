export default function BookDemoClass() {
  return (
    <div className="bg-white flex flex-col gap-5 p-5 h-[460px] w-[451px] shadow-xl shadow-gray-300 rounded-xl">
      <h1 className="font-bold text-lg text-[var(--color-primary)]">
        Book Your Free Demo Class
      </h1>

      {/* Name */}
      <section className="flex items-center gap-2">
        <input
          type="text"
          placeholder="First Name"
          className="px-3 py-1 border border-gray-400 rounded-md"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="px-3 py-1 border border-gray-400 rounded-md"
        />
      </section>

      {/* Phone Number */}
      <input
        type="text"
        placeholder="Phone No"
        className="px-3 py-1 border border-gray-400 rounded-md"
      />

      {/* Email Id */}
      <input
        type="email"
        placeholder="Email Id"
        className="px-3 py-1 border border-gray-400 rounded-md"
      />

      {/* Education */}
      <input
        type="text"
        placeholder="Education"
        className="px-3 py-1 border border-gray-400 rounded-md"
      />

      {/* Interested Course */}
      <input
        type="text"
        placeholder="Interested Course"
        className="px-3 py-1 border border-gray-400 rounded-md"
      />

      <section className="flex items-center">
        <input type="radio" name="Whatsapp" id="Whatsapp" />
        <span className="pl-2">Send me an update on Whatsapp</span>
      </section>

      <button className="text-white bg-[var(--color-primary)] py-2 px-5 rounded-md">
        Submit
      </button>
    </div>
  );
}
