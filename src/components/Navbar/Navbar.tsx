import Image from "next/image";
import Link from "next/link";

const today = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { next: { revalidate: 60 } },
  );

  const data = await response.json();
  const categories: Category[] = data;

  return (
    <header className="bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo-icon.png" alt="বাজার দর" width={50} height={50} />

            <div>
              <h1 className="text-2xl font-bold">বাজার দর</h1>

              <p className="text-sm text-base-content/60">{today}</p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost">সাইন ইন</button>
            <button className="btn btn-primary">সাইন আপ</button>
          </div>
        </div>
      </div>

      <div className="border border-gray-300"></div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="rounded-lg px-3 py-2 hover:bg-base-200">
            🏠 হোম
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="px-3 py-2 rounded-lg hover:bg-base-200"
            >
              {category.icon}
              {category.nameBn}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
