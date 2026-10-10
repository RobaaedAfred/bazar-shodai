"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="top-center" autoClose={3500} newestOnTop closeOnClick pauseOnHover theme="light" />
    </>
  );
}
