import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">লোড হচ্ছে...</div>}>
      <SignInForm />
    </Suspense>
  );
}
