
import { useState } from "react";
import AccountForm from "./AccountForm";

export default function AccountModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Login
      </button>

      
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-start pt-24 z-50">

          <div className="rounded-xl shadow-lg relative w-full max-w-4xl overflow-hidden">
            
           
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>

           
            <AccountForm />
          </div>
        </div>
      )}
    </>
  );
}
