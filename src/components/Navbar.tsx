import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Settings, 
  Plus,
  Bell,
  User,
  Search
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-hero shadow-elevated border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PGD + SCOPI</h1>
                <p className="text-xs text-white/80">Sistema Integrado de Gestão</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              v2.0 Beta
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "secondary" : "ghost"} 
                className={`flex items-center space-x-2 ${
                  isActive("/") 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link to="/activities">
              <Button 
                variant={isActive("/activities") ? "secondary" : "ghost"} 
                className={`flex items-center space-x-2 ${
                  isActive("/activities") 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Calendar size={16} />
                <span>Atividades</span>
              </Button>
            </Link>
            <Link to="/analytics">
              <Button 
                variant={isActive("/analytics") ? "secondary" : "ghost"} 
                className={`flex items-center space-x-2 ${
                  isActive("/analytics") 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                <BarChart3 size={16} />
                <span>Analytics</span>
              </Button>
            </Link>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                <Input 
                  placeholder="Buscar atividades..." 
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                />
              </div>
            </div>

            <Button 
              size="sm" 
              className="bg-white text-primary hover:bg-white/90 shadow-card"
            >
              <Plus size={16} className="mr-2" />
              Nova Atividade
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 relative"
            >
              <Bell size={16} />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-warning text-warning-foreground text-xs">
                3
              </Badge>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
            >
              <User size={16} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};