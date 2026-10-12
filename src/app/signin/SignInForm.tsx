"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedCallbackURL = searchParams.get("callbackURL") || "/";

  const callbackURL =
    requestedCallbackURL.startsWith("/") &&
    !requestedCallbackURL.startsWith("//")
      ? requestedCallbackURL
      : "/";

  const [isPending, setIsPending] = useState(false);

  const inputClassName =
    "block h-14 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsPending(true);

      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(
          "ইমেইল বা পাসওয়ার্ড সঠিক নয়। অ্যাকাউন্ট না থাকলে সাইন আপ করুন।",
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push(callbackURL);
      router.refresh();
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setIsPending(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      setIsPending(true);

      const result = await authClient.signIn.social({
        provider,
        callbackURL,
      });

      if (result.error) {
        toast.error(result.error.message || "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে");
        setIsPending(false);
      }
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
      setIsPending(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center bg-[#F5F8FC] px-4 py-14 sm:py-20">
      <div className="mb-10 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          সাইন ইন
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="card w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="card-body gap-7 p-6 sm:gap-8 sm:p-10 lg:p-12">
          <form className="space-y-6" onSubmit={handleSignIn}>
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
                autoComplete="email"
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
                placeholder="পাসওয়ার্ড লিখুন"
                className={inputClassName}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn h-14 w-full rounded-xl border-blue-700 bg-blue-700 text-base font-bold text-white hover:border-blue-800 hover:bg-blue-800"
            >
              {isPending ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="divider my-0 text-sm text-slate-400">অথবা</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleSocialSignIn("google")}
              className="btn min-h-14 w-full gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 normal-case hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
            >
              <SiGoogle size={20} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => handleSocialSignIn("github")}
              className="btn min-h-14 w-full gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 normal-case hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
            >
              <SiGithub size={20} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="pt-2 text-center text-sm text-slate-500 sm:text-base">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href={`/signup?callbackURL=${encodeURIComponent(callbackURL)}`}
              className="font-bold text-blue-700 underline-offset-4 hover:text-blue-800 hover:underline"
            >
              সাইন আপ করুন
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

export default SignInPage;
