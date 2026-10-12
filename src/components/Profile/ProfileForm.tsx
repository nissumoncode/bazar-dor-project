"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const ProfileForm = () => {
  const [signOutLoading, setSignOutLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setSignOutLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সাইন আউট হয়েছে");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    } finally {
      setSignOutLoading(false);
    }
  };

  return (
    <div className="card rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="card-body">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signOutLoading}
          className="btn border border-blue-700 bg-white text-blue-700 transition-colors duration-200 hover:border-blue-800 hover:bg-blue-50"
        >
          {signOutLoading ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
