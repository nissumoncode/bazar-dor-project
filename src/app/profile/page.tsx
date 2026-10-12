import Link from "next/link";
import { requireAuth } from "@/lib/require-auth";
import ProfileForm from "@/components/Profile/ProfileForm";

const ProfilePage = async () => {
  const session = await requireAuth("/profile");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">আমার প্রোফাইল</h1>

      <p className="mb-6 text-slate-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-lg font-semibold text-slate-900">
          {session.user.name || "নাম দেওয়া নেই"}
        </p>

        <p className="text-sm text-slate-500">{session.user.email}</p>

        <Link
          href="/profile/update"
          className="btn mt-5 border-blue-700 bg-blue-700 text-white hover:border-blue-800 hover:bg-blue-800"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>

      <ProfileForm />
    </main>
  );
};

export default ProfilePage;
