import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  UserCheck,
  PlusCircle,
  BarChart3,
} from 'lucide-react';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

const roleNavigation: Record<UserRole, SidebarItem[]> = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Manage Users', url: '/users', icon: Users },
    { title: 'Manage Courses', url: '/courses', icon: BookOpen },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    { title: 'Settings', url: '/settings', icon: Settings },
  ],
  instructor: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Courses', url: '/my-courses', icon: BookOpen },
    { title: 'Create Course', url: '/create-course', icon: PlusCircle },
    { title: 'Students', url: '/students', icon: UserCheck },
    { title: 'Settings', url: '/settings', icon: Settings },
  ],
  student: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Courses', url: '/my-courses', icon: BookOpen },
    { title: 'Browse Courses', url: '/browse', icon: GraduationCap },
    { title: 'Progress', url: '/progress', icon: BarChart3 },
    { title: 'Settings', url: '/settings', icon: Settings },
  ],
};

export const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  if (!user) return null;

  const navigation = roleNavigation[user.role];
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard' || currentPath === '/';
    }
    return currentPath === path;
  };

  const getNavClassName = (isActive: boolean) =>
    isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
      : 'hover:bg-sidebar-accent/50 text-sidebar-foreground';

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">LearnHub</h2>
              <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role} Portal</p>
            </div>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SidebarMenuButton asChild className={getNavClassName(active)}>
                        <NavLink to={item.url} end>
                          <Icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-primary text-white text-xs">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="w-full justify-start border-sidebar-border hover:bg-sidebar-accent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;