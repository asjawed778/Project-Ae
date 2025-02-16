import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Sidebar from "../pages/Admin/Sidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <ErrorBoundary>
        <main className="flex-grow flex">
          {/* Left Component Admin Sidebar */}
          <div className={`h-auto ${!isOpen ? "items-start" : ""}`}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Right Component Admin Panel */}
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
