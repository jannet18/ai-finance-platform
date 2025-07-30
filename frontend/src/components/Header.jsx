import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png"; // Adjust the path as necessary
import { LayoutDashboard, PenBox, User } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <img
              src={logo2}
              alt="logo"
              height={60}
              width={200}
              className="h-12 w-auto object-contain "
            />
          </Link>
          <div className="flex items-center gap-0">
            <Link
              to="/dashboard"
              className="ml-4 text-gray-600 hover:text-blue-600"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link
              to="/transaction/create"
              className="ml-4 text-gray-600 hover:text-blue-600"
            >
              <Button>
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
            <Link
              to="/auth/login"
              className="ml-4 text-gray-600 hover:text-blue-600"
            >
              <Button variant="outline">Sign In</Button>
            </Link>

            <Link>
              <User size={36} className="border ml-4 rounded-full p-2" />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
