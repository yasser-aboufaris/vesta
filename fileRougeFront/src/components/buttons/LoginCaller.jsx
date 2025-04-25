import React from "react";
import LoginForm from "./LoginForm";
import SignUpClient from "./SignUpClient";
import SignUpTrainer from "./SignUpTrainer";

function FormController({ state, setState }) {
if (state === 0) return null;

const close = () => setState(0);

return (
    <div className="fixed top-20 right-5 bg-white text-black p-6 rounded-lg shadow-lg z-50 w-80">
    {state === 1 && <LoginForm onClose={close} />}
    {state === 2 && <SignUpClient onClose={close} />}
    {state === 3 && <SignUpTrainer onClose={close} />}
    </div>
  );
}

export default FormController;
