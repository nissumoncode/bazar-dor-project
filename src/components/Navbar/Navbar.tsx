import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProfileDropdown from "./ProfileDropdown";

const today = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { next: { revalidate: 60 } },
  );

  const data = await response.json();
  const categories: Category[] = data;

  return (
    <header className="w-full border-b border-slate-200 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={50}
              height={50}
              priority
              className="h-10 w-10 shrink-0 object-contain sm:h-[50px] sm:w-[50px]"
            />

            <div className="min-w-0">
              <Link
                href="/"
                className="text-lg font-bold leading-tight text-slate-900 sm:text-2xl"
              >
                বাজার দর
              </Link>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{today}</p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {session?.user ? (
              <ProfileDropdown
                name={session.user.name || "ব্যবহারকারী"}
                email={session.user.email}
                image={session.user.image}
              />
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="btn btn-primary btn-sm sm:btn-md"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200" />

      <nav
        aria-label="প্রধান ক্যাটাগরি"
        className="mx-auto max-w-7xl px-2 sm:px-4"
      >
        <div className="flex items-center justify-start gap-1 overflow-x-auto overscroll-x-contain py-2 sm:justify-center sm:gap-2">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
          >
            🏠 হোম
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
