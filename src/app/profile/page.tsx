import { requireAuth } from "@/lib/require-auth";
import ProfileForm from "@/components/Profile/ProfileForm";

const ProfilePage = async () => {
  const session = await requireAuth("/profile");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">আমার প্রোফাইল</h1>

      <p className="mb-6 text-base-content/60">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mb-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <p className="text-lg font-semibold">
          {session.user.name || "নাম দেওয়া নেই"}
        </p>

        <p className="text-sm text-base-content/60">{session.user.email}</p>
      </div>

      <ProfileForm name={session.user.name || ""} />
    </main>
  );
};

export default ProfilePage;
