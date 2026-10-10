import Link from "next/link";
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons";
const SignInPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center bg-base-200/50 px-4 py-14 sm:py-20">
      {/* Card-এর বাইরে: শিরোনাম ও বিবরণ */}
      <div className="mb-10 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          সাইন ইন
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-base-content/65 sm:text-lg">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Card-এর ভেতরে: ফর্ম ও অন্যান্য অপশন */}
      <div className="card w-full max-w-2xl rounded-3xl border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-7 p-6 sm:gap-8 sm:p-10 lg:p-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="label mb-2 font-semibold">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered h-14 w-full rounded-xl text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label mb-2 font-semibold">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input input-bordered h-14 w-full rounded-xl text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary h-14 w-full rounded-xl text-base font-bold"
            >
              সাইন ইন
            </button>
          </form>

          <div className="divider my-0 text-sm text-base-content/50">অথবা</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="btn btn-outline min-h-14 w-full gap-3 rounded-xl border-base-300 px-4 py-3 text-sm normal-case sm:text-base"
            >
              <SiGoogle size={20} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              className="btn btn-outline min-h-14 w-full gap-3 rounded-xl border-base-300 px-4 py-3 text-sm normal-case sm:text-base"
            >
              <SiGithub size={20} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="pt-2 text-center text-sm text-base-content/70 sm:text-base">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="link link-primary font-bold underline-offset-4"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      {/* Card-এর বাইরে: হোম পেজ লিংক */}
      <Link
        href="/"
        className="link link-hover mt-8 text-sm font-medium text-base-content/70 transition-colors hover:text-primary"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </section>
  );
};

export default SignInPage;
