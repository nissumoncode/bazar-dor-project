import AllProducts from "@/components/AllProducts/AllProducts";
import FallingProducts from "@/components/FallingProducts/FallingProducts";
import Hero from "@/components/Hero/Hero";
import RisingProducts from "@/components/RisingProducts/RisingProducts";

export default async function Home() {
  return (
    <main>
      <Hero />

      <RisingProducts />
      <FallingProducts />
      <AllProducts />
    </main>
  );
}
