import Image from "next/image";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 items-center gap-10 md:gap-14">
        {/* Left Content */}
        <div>
          <p className="text-sm md:text-base font-medium text-base-content/60">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a href="#সব-পণ্য" className="btn btn-primary mt-7 rounded-xl px-6">
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={500}
            height={350}
            priority
            className="w-[78%] md:w-[82%] rounded-3xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
