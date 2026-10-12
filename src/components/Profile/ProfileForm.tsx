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
    <div className="card rounded-2xl border border-base-300 bg-base-100 shadow-lg">
      <div className="card-body">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signOutLoading}
          className="btn btn-outline btn-error"
        >
          {signOutLoading ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
