"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

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
        toast.error(result.error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
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
        callbackURL: "/",
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
    <section className="flex min-h-screen flex-col items-center bg-base-200/50 px-4 py-14 sm:py-20">
      <div className="mb-10 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          সাইন ইন
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-base-content/65 sm:text-lg">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="card w-full max-w-2xl rounded-3xl border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-7 p-6 sm:gap-8 sm:p-10 lg:p-12">
          <form className="space-y-6" onSubmit={handleSignIn}>
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
                autoComplete="email"
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
                placeholder="পাসওয়ার্ড লিখুন"
                className="input input-bordered h-14 w-full rounded-xl text-base"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary h-14 w-full rounded-xl text-base font-bold"
            >
              {isPending ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="divider my-0 text-sm text-base-content/50">অথবা</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleSocialSignIn("google")}
              className="btn btn-outline min-h-14 w-full gap-3 rounded-xl border-base-300 px-4 py-3 text-sm normal-case sm:text-base"
            >
              <SiGoogle size={20} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => handleSocialSignIn("github")}
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
