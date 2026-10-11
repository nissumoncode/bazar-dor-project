"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
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
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex min-h-screen flex-col items-center bg-base-200/50 px-4 py-14 sm:py-20">
      {" "}
      {/* Card-এর বাইরে: শিরোনাম ও বিবরণ */}{" "}
      <div className="mb-10 w-full max-w-2xl text-center">
        {" "}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {" "}
          অ্যাকাউন্ট তৈরি করুন{" "}
        </h1>{" "}
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-base-content/65 sm:text-lg">
          {" "}
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।{" "}
        </p>{" "}
      </div>{" "}
      {/* Card-এর ভেতরে: ফর্ম ও অন্যান্য অপশন */}{" "}
      <div className="card w-full max-w-2xl rounded-3xl border border-base-300 bg-base-100 shadow-xl">
        {" "}
        <div className="card-body gap-7 p-6 sm:gap-8 sm:p-10 lg:p-12">
          {" "}
          <form onSubmit={handleSignup} className="space-y-6">
            {" "}
            <div>
              {" "}
              <label htmlFor="name" className="label mb-2 font-semibold">
                {" "}
                নাম{" "}
              </label>{" "}
              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                className="input input-bordered h-14 w-full rounded-xl text-base"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label htmlFor="email" className="label mb-2 font-semibold">
                {" "}
                ইমেইল{" "}
              </label>{" "}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered h-14 w-full rounded-xl text-base"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label htmlFor="password" className="label mb-2 font-semibold">
                {" "}
                পাসওয়ার্ড{" "}
              </label>{" "}
              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                className="input input-bordered h-14 w-full rounded-xl text-base"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label
                htmlFor="confirmPassword"
                className="label mb-2 font-semibold"
              >
                {" "}
                পাসওয়ার্ড নিশ্চিত করুন{" "}
              </label>{" "}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                minLength={8}
                className="input input-bordered h-14 w-full rounded-xl text-base"
                required
              />{" "}
            </div>{" "}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary h-14 w-full rounded-xl text-base font-bold"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>{" "}
          <div className="divider my-0 text-sm text-base-content/50">
            {" "}
            অথবা{" "}
          </div>{" "}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {" "}
            <button
              type="button"
              onClick={async () => {
                try {
                  const { error } = await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
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
              className="btn btn-outline min-h-14 w-full gap-3 rounded-xl border-base-300 px-4 py-3 text-sm normal-case sm:text-base"
            >
              {" "}
              <SiGoogle size={20} /> <span>Google দিয়ে চালিয়ে যান</span>{" "}
            </button>{" "}
            <button
              type="button"
              onClick={async () => {
                try {
                  const { error } = await authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/",
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
              className="btn btn-outline min-h-14 w-full gap-3 rounded-xl border-base-300 px-4 py-3 text-sm normal-case sm:text-base"
            >
              {" "}
              <SiGithub size={20} /> <span>GitHub দিয়ে চালিয়ে যান</span>{" "}
            </button>{" "}
          </div>{" "}
          <p className="pt-2 text-center text-sm text-base-content/70 sm:text-base">
            {" "}
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="link link-primary font-bold underline-offset-4"
            >
              {" "}
              সাইন ইন করুন{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* Card-এর বাইরে: হোম পেজ লিংক */}{" "}
      <Link
        href="/"
        className="link link-hover mt-8 text-sm font-medium text-base-content/70 transition-colors hover:text-primary"
      >
        {" "}
        ← হোম পেজে ফিরে যান{" "}
      </Link>{" "}
    </section>
  );
};

export default SignupPage;
