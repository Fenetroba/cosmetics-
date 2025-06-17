import { Calendar,ListOrdered , Home, Inbox, Search, Settings, TowerControl, User, MartiniIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Link } from "react-router-dom"

// Menu items.
const items = [

  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: Inbox,
  },

  {
    title: "Order",
    url: "/admin/order ",
    icon: ListOrdered,
  },
  {
    title: "Users/custemer",
    url: "/admin/user ",
    icon: User,
  },
  {
    title: "Products",
    url: "/admin/products ",
    icon: MartiniIcon,
  },
]

export function LeftSider() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-10 font-bold text-3xl mt-3.5"><span>ADMIN</span><span className="text-red-600"><TowerControl/></span></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default LeftSider