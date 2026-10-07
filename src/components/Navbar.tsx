import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাংলার দর"
            width={42}
            height={42}
            className="rounded-xl"
          />

          <div className="leading-tight">
            <h1 className="text-[22px] font-bold text-gray-800">
              বাজার দর
            </h1>

            <p className="text-[12px] text-gray-400">
              বুধবার, ৭ অক্টোবর, ২০২৬
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button className="text-[16px] font-semibold text-gray-800 hover:text-green-700">
            সাইন ইন
          </button>

          <button className="rounded-lg bg-green-600 px-5 py-2.5 text-[16px] font-semibold text-white shadow-sm transition hover:bg-green-700">
            সাইন আপ
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;