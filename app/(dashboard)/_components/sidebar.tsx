import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
     return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="h-[80px] p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />  
            </div>
        </div>
     )
}