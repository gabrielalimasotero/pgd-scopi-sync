import { Navbar } from "@/components/Navbar";
import Dashboard from "./Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Index;
