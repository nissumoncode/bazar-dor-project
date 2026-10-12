import Link from "next/link";
import { requireAuth } from "@/lib/require-auth";
import UpdateProfileForm from "@/components/Profile/UpdateProfileForm";

const UpdateProfilePage = async () => {
  const session = await requireAuth("/profile/update");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        তথ্য আপডেট করুন
      </h1>

      <p className="mb-6 text-slate-500">
        আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <UpdateProfileForm name={session.user.name || ""} />
      </div>

      <Link
        href="/profile"
        className="btn btn-ghost mt-4 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </main>
  );
};

export default UpdateProfilePage;
