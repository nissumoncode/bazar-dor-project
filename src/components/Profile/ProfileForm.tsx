"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface ProfileFormProps {
  name: string;
}

const ProfileForm = ({ name }: ProfileFormProps) => {
  const [newName, setNewName] = useState(name);
  const [loading, setLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async () => {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("নাম আপডেট হয়েছে");
      window.location.reload();
    } catch {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="card-body gap-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">তথ্য আপডেট</h2>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading || signOutLoading}
            className="btn btn-outline btn-error btn-sm"
          >
            {signOutLoading ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
          </button>
        </div>

        <div className="form-control gap-2">
          <label htmlFor="name" className="label font-medium">
            নাম
          </label>

          <input
            id="name"
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="input input-bordered w-full"
            required
            disabled={loading || signOutLoading}
          />
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading || signOutLoading}
          className="btn btn-primary w-full"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
