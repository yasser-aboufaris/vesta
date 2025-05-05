import {
    Home,
    Info,
    List,
    Phone,
    LogIn,
    UserPlus,
  } from "lucide-react";
  import { useState } from "react";
  
  const Sidebar = ({ navbarHeight = "64px" }) => {
    const [activeItem, setActiveItem] = useState("Home");
  
    // Add this style to your main content to offset it from the sidebar
    // Example: <div className="ml-64 mt-[navbar-height]"> {your main content} </div>
  
    return (
      <aside className="fixed left-0 h-[500px]  w-64 bg-gray-50 border-r border-gray-200 p-6 shadow-md overflow-y-auto" >
      <div className="text-2xl font-extrabold tracking-wider">
        <a href="#" className="flex items-center hover:text-green-600 transition duration-300">
          <span className="mr-1">Vesta</span>
          <span className="text-green-600">Fit</span>
        </a>
      </div>
  
        {/* Navigation */}
        <nav className="space-y-4 text-gray-700">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Home" 
            active={activeItem === "Home"}
            onClick={() => setActiveItem("Home")}
          />
          <SidebarItem 
            icon={<Info size={20} />} 
            label="About" 
            active={activeItem === "About"}
            onClick={() => setActiveItem("About")}
          />
          <SidebarItem 
            icon={<List size={20} />} 
            label="Services" 
            active={activeItem === "Services"}
            onClick={() => setActiveItem("Services")}
          />
          <SidebarItem 
            icon={<Phone size={20} />} 
            label="Contact" 
            active={activeItem === "Contact"}
            onClick={() => setActiveItem("Contact")}
          />
          
          <div className="border-t border-gray-200 pt-4 mt-6">
            <SidebarItem 
              icon={<LogIn size={20} />} 
              label="Login" 
              active={activeItem === "Login"}
              onClick={() => setActiveItem("Login")}
              special={true}
            />
            <SidebarItem 
              icon={<UserPlus size={20} />} 
              label="Sign Up" 
              active={activeItem === "Sign Up"}
              onClick={() => setActiveItem("Sign Up")}
              special={true}
            />
          </div>
        </nav>
        
        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="text-xs text-gray-500 text-center">
            © 2025 Company Name
          </div>
        </div>
      </aside>
    );
  };
  
  const SidebarItem = ({ icon, label, active, onClick, special }) => {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`flex items-center gap-3 text-base py-2 px-3 rounded-lg transition-all duration-200 ${
          active 
            ? "bg-green-50 text-green-600 font-medium" 
            : special
              ? "font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              : "hover:bg-gray-100 hover:text-green-600"
        }`}
      >
        <span className={active ? "text-green-600" : special ? "text-blue-600" : "text-gray-500"}>
          {icon}
        </span>
        <span>{label}</span>
        {active && <div className="ml-auto w-1 h-5 bg-green-500 rounded-full"></div>}
      </a>
    );
  };
  
  export default Sidebar;