import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Sidebar from "../pages/Admin/Sidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full custom-scrollbar">
      <Header />
      <ErrorBoundary>
        <main className="flex-grow flex">
          {/* Left Component Admin Sidebar */}
          <div
            className={`h-[calc(100vh-5rem)] ${!isOpen ? "items-start" : ""}`}
          >
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Right Component Admin Panel */}
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
