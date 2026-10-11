import { Suspense } from "react";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">লোড হচ্ছে...</div>}>
      <SignupForm />
    </Suspense>
  );
}
