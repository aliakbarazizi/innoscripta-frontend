import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";

import Button from "../../components/core/Button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: Props) {
  const [type, setType] = useState<"login" | "signup">("login");

  return (
    <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-auto max-w-lg space-y-4 rounded-xl bg-white px-12 py-8 shadow-lg md:w-md">
          {type === "login" ? (
            <LoginForm onSuccess={() => onClose()} />
          ) : (
            <SignupForm onSuccess={() => onClose()} />
          )}
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => setType(type === "login" ? "signup" : "login")}
            >
              {type === "login" ? "Create an account" : "Login to your account"}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
