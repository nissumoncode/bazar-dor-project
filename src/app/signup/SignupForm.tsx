"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons";
import { useRouter, useSearchParams } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCallbackURL = searchParams.get("callbackURL") || "/";

  const callbackURL =
    requestedCallbackURL.startsWith("/") &&
    !requestedCallbackURL.startsWith("//")
      ? requestedCallbackURL
      : "/";

  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push(callbackURL);
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "block h-14 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <section className="flex min-h-screen flex-col items-center bg-[#F5F8FC] px-4 py-14 sm:py-20">
      <div className="mb-10 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="card w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="card-body gap-7 p-6 sm:gap-8 sm:p-10 lg:p-12">
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-semibold text-slate-700"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="তোমার পুরো নাম"
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-slate-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-semibold text-slate-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-semibold text-slate-700"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                minLength={8}
                className={inputClassName}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn h-14 w-full rounded-xl border-blue-700 bg-blue-700 text-base font-bold text-white hover:border-blue-800 hover:bg-blue-800"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="divider my-0 text-sm text-slate-400">অথবা</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  const { error } = await authClient.signIn.social({
                    provider: "google",
                    callbackURL,
                  });

                  if (error) {
                    toast.error(
                      error.message || "Google দিয়ে চালিয়ে যাওয়া যায়নি",
                    );
                  }
                } catch {
                  toast.error("Google দিয়ে সাইন ইন করা যায়নি");
                }
              }}
              className="btn min-h-14 w-full gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 normal-case hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
            >
              <SiGoogle size={20} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                try {
                  const { error } = await authClient.signIn.social({
                    provider: "github",
                    callbackURL,
                  });

                  if (error) {
                    toast.error(
                      error.message || "GitHub দিয়ে চালিয়ে যাওয়া যায়নি",
                    );
                  }
                } catch {
                  toast.error("GitHub দিয়ে সাইন ইন করা যায়নি");
                }
              }}
              className="btn min-h-14 w-full gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 normal-case hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
            >
              <SiGithub size={20} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="pt-2 text-center text-sm text-slate-500 sm:text-base">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href={`/signin?callbackURL=${encodeURIComponent(callbackURL)}`}
              className="font-bold text-blue-700 underline-offset-4 hover:text-blue-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 text-sm font-medium text-slate-500 transition-colors hover:text-blue-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </section>
  );
};

export default SignupPage;
