import Navbar from "@/core/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="px-4 md:px-6 lg:px-10 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;