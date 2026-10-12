"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRound, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface ProfileDropdownProps {
  name: string;
  email: string;
  image?: string | null;
}

const ProfileDropdown = ({ name, email, image }: ProfileDropdownProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সাইন আউট সফল হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost flex items-center gap-2 text-slate-800 hover:bg-blue-50 hover:text-blue-700"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-contain"
            unoptimized
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
            {initials || "U"}
          </span>
        )}

        <span className="max-w-32 truncate">{name}</span>
        <span aria-hidden="true">▾</span>
      </button>

      <ul
        tabIndex={-1}
        className="menu dropdown-content z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-lg"
      >
        <li className="pointer-events-none">
          <div className="flex flex-col items-start gap-1">
            <span className="font-semibold text-slate-900">{name}</span>
            <span className="text-sm text-slate-500">{email}</span>
          </div>
        </li>

        <li>
          <Link
            href="/profile"
            className="transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <UserRound size={18} />
            আমার প্রোফাইল
          </Link>
        </li>

        <li>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="text-error"
          >
            <LogOut size={18} />
            {loading ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
