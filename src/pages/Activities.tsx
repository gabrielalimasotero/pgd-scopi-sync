import { useState } from "react";
import { ActivityCard } from "@/components/ActivityCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar,
  Plus,
  Grid3X3,
  List,
  SortAsc,
  Download
} from "lucide-react";

// Mock expanded data
const allActivities = [
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
    scopiMetrics: { efficiency: 88, quality: 92, deliveryTime: 85 },
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
    scopiMetrics: { efficiency: 95, quality: 98, deliveryTime: 92 },
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
    scopiMetrics: { efficiency: 0, quality: 0, deliveryTime: 0 },
    comments: 1
  },
  {
    id: "4",
    title: "Revisão de Processos Administrativos",
    description: "Análise e otimização dos processos administrativos para maior eficiência e conformidade.",
    status: "in_progress" as const,
    priority: "medium" as const,
    progress: 45,
    startDate: "2024-01-20",
    endDate: "2024-03-01",
    responsible: { name: "Roberto Dias" },
    reporter: { name: "Carla Mendes" },
    estimatedHours: 150,
    actualHours: 65,
    scopiMetrics: { efficiency: 78, quality: 85, deliveryTime: 72 },
    comments: 8
  },
  {
    id: "5",
    title: "Desenvolvimento de Portal do Estudante",
    description: "Criação de portal web para acesso dos estudantes a serviços e informações acadêmicas.",
    status: "completed" as const,
    priority: "high" as const,
    progress: 100,
    startDate: "2023-11-15",
    endDate: "2024-01-10",
    responsible: { name: "Fernanda Rocha" },
    reporter: { name: "Marcos Alves" },
    estimatedHours: 300,
    actualHours: 285,
    scopiMetrics: { efficiency: 96, quality: 94, deliveryTime: 98 },
    comments: 12
  },
  {
    id: "6",
    title: "Implementação de Sistema de Protocolo Digital",
    description: "Digitalização completa do sistema de protocolo para tramitação eletrônica de documentos.",
    status: "cancelled" as const,
    priority: "low" as const,
    progress: 25,
    startDate: "2024-01-05",
    endDate: "2024-02-15",
    responsible: { name: "Sandra Lima" },
    reporter: { name: "Paulo Castro" },
    estimatedHours: 180,
    actualHours: 45,
    scopiMetrics: { efficiency: 65, quality: 70, deliveryTime: 60 },
    comments: 3
  }
];

export default function Activities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || activity.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusCount = (status: string) => {
    if (status === "all") return allActivities.length;
    return allActivities.filter(a => a.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Atividades PGD
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie e acompanhe todas as atividades com métricas integradas do SCOPI
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus size={16} className="mr-2" />
            Nova Atividade
          </Button>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{getStatusCount("all")}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-info">{getStatusCount("in_progress")}</div>
              <div className="text-sm text-muted-foreground">Em Andamento</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{getStatusCount("pending")}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{getStatusCount("completed")}</div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{getStatusCount("cancelled")}</div>
              <div className="text-sm text-muted-foreground">Canceladas</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar atividades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="in_progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Prioridades</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <SortAsc size={16} className="mr-2" />
                  Ordenar
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Exportar
                </Button>
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3X3 size={16} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Grid/List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {filteredActivities.length} {filteredActivities.length === 1 ? 'atividade' : 'atividades'}
              </Badge>
              {(searchTerm || statusFilter !== "all" || priorityFilter !== "all") && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setPriorityFilter("all");
                  }}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={() => console.log("Edit", activity.id)}
                  onViewDetails={() => console.log("View details", activity.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{activity.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <Badge className={`${
                            activity.status === 'completed' ? 'bg-success text-success-foreground' :
                            activity.status === 'in_progress' ? 'bg-info text-info-foreground' :
                            activity.status === 'pending' ? 'bg-warning text-warning-foreground' :
                            'bg-destructive text-destructive-foreground'
                          }`}>
                            {activity.status.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {activity.responsible.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {activity.progress}% completo
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="default" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredActivities.length === 0 && (
            <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma atividade encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros ou criar uma nova atividade.
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus size={16} className="mr-2" />
                  Criar Nova Atividade
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}