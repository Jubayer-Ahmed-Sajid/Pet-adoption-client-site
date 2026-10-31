import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import DropDownMenu from "../Components/DropDownMenu";

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Top Bar */}
      <div className="lg:hidden p-4 bg-card border-b border-rule">
        <DropDownMenu />
      </div>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
