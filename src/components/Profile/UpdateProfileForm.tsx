"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface UpdateProfileFormProps {
  name: string;
}

const UpdateProfileForm = ({ name }: UpdateProfileFormProps) => {
  const [newName, setNewName] = useState(name);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      toast.error("নাম লিখুন");
      return;
    }

    if (trimmedName === name.trim()) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
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
          autoComplete="name"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading}
          className="btn btn-primary flex-1"
        >
          {loading ? "আপডেট হচ্ছে..." : "Update Information"}
        </button>

        <Link
          href="/profile"
          className={`btn btn-outline ${loading ? "pointer-events-none opacity-50" : ""}`}
          aria-disabled={loading}
        >
          বাতিল
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
