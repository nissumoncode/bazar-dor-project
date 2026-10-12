import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-3 text-7xl font-extrabold text-primary">404</p>

      <h1 className="mb-3 text-2xl font-bold">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mb-6 max-w-md text-base-content/70">
        আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা ঠিকানাটি ভুল হয়েছে।
      </p>

      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
