import Image from "next/image";

const Hero = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-10 md:py-12">
      <div className="relative overflow-hidden rounded-3xl border border-blue-200/70 bg-gradient-to-br from-white via-blue-50 to-sky-100 p-5 shadow-lg shadow-blue-900/5 sm:p-8 md:rounded-[2rem] md:p-10 lg:p-12">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl sm:h-64 sm:w-64" />

        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl sm:h-64 sm:w-64" />

        <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {/* Left Content */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-blue-800 shadow-sm sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              আজকের বাজারের <span className="text-blue-700">দাম এক নজরে</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-700/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-7 sm:px-6 sm:text-base"
            >
              সব পণ্য দেখুন
              <span aria-hidden="true">→</span>
            </a>

            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-700 to-sky-300 sm:mt-8" />
          </div>

          {/* Right Image Frame */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            {/* Soft background glow */}
            <div className="pointer-events-none absolute inset-6 rounded-[2rem] bg-blue-400/20 blur-2xl" />

            {/* Outer frame */}
            <div className="relative rounded-[2rem] border border-white/90 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-2 shadow-2xl shadow-blue-900/15 sm:rounded-[2.5rem] sm:p-3">
              {/* Inner frame */}
              <div className="overflow-hidden rounded-[1.6rem] border border-blue-100/80 bg-white p-1.5 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[1.3rem] sm:rounded-[1.6rem]">
                  <Image
                    src="/bazar-hero.png"
                    alt="বাজারের পণ্য"
                    width={500}
                    height={350}
                    priority
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 45vw, 500px"
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>

            {/* Top-right corner accent */}
            <div className="pointer-events-none absolute -right-2 -top-2 h-12 w-12 rounded-tr-3xl border-r-2 border-t-2 border-blue-400/70 sm:-right-3 sm:-top-3 sm:h-16 sm:w-16" />

            {/* Bottom-left corner accent */}
            <div className="pointer-events-none absolute -bottom-2 -left-2 h-12 w-12 rounded-bl-3xl border-b-2 border-l-2 border-sky-300/80 sm:-bottom-3 sm:-left-3 sm:h-16 sm:w-16" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
