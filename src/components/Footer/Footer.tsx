import React from "react";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-base-content/70 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-medium hover:text-primary">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </Link>

        <p className="max-w-xl sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
