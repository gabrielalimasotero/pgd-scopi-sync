import { DashboardStats } from "@/components/DashboardStats";
import { ActivityCard } from "@/components/ActivityCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react";

// Mock data
const recentActivities = [
  {
    id: "1",
    title: "Implementação do Sistema de Avaliação Digital",
    description: "Desenvolvimento e implantação de sistema digital para avaliações acadêmicas online com integração ao sistema atual.",
    status: "in_progress" as const,
    priority: "high" as const,
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    responsible: { name: "Maria Silva" },
    reporter: { name: "João Santos" },
    estimatedHours: 120,
    actualHours: 90,
    scopiMetrics: {
      efficiency: 88,
      quality: 92,
      deliveryTime: 85
    },
    comments: 5
  },
  {
    id: "2",
    title: "Capacitação em Ferramentas Digitais",
    description: "Programa de capacitação dos servidores em ferramentas digitais para trabalho remoto e gestão de atividades.",
    status: "completed" as const,
    priority: "medium" as const,
    progress: 100,
    startDate: "2024-01-08",
    endDate: "2024-01-30",
    responsible: { name: "Ana Costa" },
    reporter: { name: "Pedro Lima" },
    estimatedHours: 80,
    actualHours: 85,
    scopiMetrics: {
      efficiency: 95,
      quality: 98,
      deliveryTime: 92
    },
    comments: 2
  },
  {
    id: "3",
    title: "Modernização da Infraestrutura de TI",
    description: "Atualização dos equipamentos e infraestrutura de rede para suporte às atividades remotas.",
    status: "pending" as const,
    priority: "high" as const,
    progress: 0,
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    responsible: { name: "Carlos Oliveira" },
    reporter: { name: "Lucia Fernandes" },
    estimatedHours: 200,
    actualHours: 0,
    scopiMetrics: {
      efficiency: 0,
      quality: 0,
      deliveryTime: 0
    },
    comments: 1
  }
];

const alerts = [
  {
    type: "warning",
    title: "Atividades próximas do prazo",
    description: "5 atividades vencem nos próximos 3 dias",
    icon: AlertTriangle
  },
  {
    type: "success", 
    title: "Meta mensal atingida",
    description: "87% das atividades foram concluídas no prazo",
    icon: CheckCircle2
  },
  {
    type: "info",
    title: "Atualização SCOPI",
    description: "Novas métricas de produtividade disponíveis",
    icon: TrendingUp
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Dashboard Integrado
            </h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe o desempenho das atividades PGD com métricas SCOPI em tempo real
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarDays size={16} />
              Hoje: {new Date().toLocaleDateString('pt-BR')}
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus size={16} className="mr-2" />
              Nova Atividade
            </Button>
          </div>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, index) => (
            <Card key={index} className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'warning' ? 'bg-warning/10' :
                    alert.type === 'success' ? 'bg-success/10' : 'bg-info/10'
                  }`}>
                    <alert.icon className={`h-5 w-5 ${
                      alert.type === 'warning' ? 'text-warning' :
                      alert.type === 'success' ? 'text-success' : 'text-info'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{alert.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Stats */}
        <DashboardStats />

        {/* Recent Activities */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Atividades Recentes
              </CardTitle>
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={() => console.log("Edit", activity.id)}
                  onViewDetails={() => console.log("View details", activity.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}