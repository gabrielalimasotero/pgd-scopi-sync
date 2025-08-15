import { useState } from "react";
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
  Download,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle
} from "lucide-react";

// Mock data - estrutura PGD real
const pgdActivities = [
  {
    id: "PGD-001",
    codigo: "DEV-2024-001",
    descricao: "Implementação do Sistema de Avaliação Digital",
    cpfResponsavel: "123.456.789-01",
    cpfRelator: "987.654.321-02", 
    dataInicio: "15/01/2024",
    dataFim: "28/02/2024",
    status: "em_andamento",
    horasEstimadas: 120,
    horasRealizadas: 90,
    progresso: 75,
    tipo: "Desenvolvimento",
    prioridade: "Alta"
  },
  {
    id: "PGD-002",
    codigo: "CAP-2024-002", 
    descricao: "Capacitação em Ferramentas Digitais",
    cpfResponsavel: "234.567.890-12",
    cpfRelator: "876.543.210-93",
    dataInicio: "08/01/2024", 
    dataFim: "30/01/2024",
    status: "concluida",
    horasEstimadas: 80,
    horasRealizadas: 85,
    progresso: 100,
    tipo: "Capacitação",
    prioridade: "Média"
  },
  {
    id: "PGD-003",
    codigo: "INF-2024-003",
    descricao: "Modernização da Infraestrutura de TI", 
    cpfResponsavel: "345.678.901-23",
    cpfRelator: "765.432.109-84",
    dataInicio: "01/02/2024",
    dataFim: "15/03/2024",
    status: "pendente",
    horasEstimadas: 200,
    horasRealizadas: 0,
    progresso: 0,
    tipo: "Infraestrutura",
    prioridade: "Alta"
  },
  {
    id: "PGD-004",
    codigo: "SEG-2024-004",
    descricao: "Atualização dos Protocolos de Segurança",
    cpfResponsavel: "456.789.012-34", 
    cpfRelator: "654.321.098-75",
    dataInicio: "20/01/2024",
    dataFim: "15/02/2024", 
    status: "em_andamento",
    horasEstimadas: 60,
    horasRealizadas: 30,
    progresso: 45,
    tipo: "Segurança", 
    prioridade: "Média"
  },
  {
    id: "PGD-005",
    codigo: "DOC-2024-005",
    descricao: "Documentação de Processos Internos",
    cpfResponsavel: "567.890.123-45",
    cpfRelator: "543.210.987-66", 
    dataInicio: "10/01/2024",
    dataFim: "25/01/2024",
    status: "atrasada", 
    horasEstimadas: 40,
    horasRealizadas: 20,
    progresso: 35,
    tipo: "Documentação",
    prioridade: "Baixa"
  },
  {
    id: "PGD-006", 
    codigo: "TRE-2024-006",
    descricao: "Treinamento em Gestão de Projetos",
    cpfResponsavel: "678.901.234-56",
    cpfRelator: "432.109.876-57",
    dataInicio: "05/01/2024",
    dataFim: "20/01/2024",
    status: "concluida",
    horasEstimadas: 30,
    horasRealizadas: 32,
    progresso: 100, 
    tipo: "Treinamento",
    prioridade: "Média"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "concluida":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "em_andamento": 
      return <Clock className="h-4 w-4 text-warning" />;
    case "atrasada":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "pendente":
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "concluida":
      return "bg-success/10 text-success border-success/20";
    case "em_andamento":
      return "bg-warning/10 text-warning border-warning/20"; 
    case "atrasada":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "pendente":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "concluida": return "Concluída";
    case "em_andamento": return "Em Andamento";
    case "atrasada": return "Atrasada"; 
    case "pendente": return "Pendente";
    default: return status;
  }
};

const getPriorityColor = (prioridade: string) => {
  switch (prioridade) {
    case "Alta": return "bg-destructive/10 text-destructive border-destructive/20";
    case "Média": return "bg-warning/10 text-warning border-warning/20";
    case "Baixa": return "bg-success/10 text-success border-success/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function Activities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tipoFilter, setTipoFilter] = useState("all");

  const filteredActivities = pgdActivities.filter(atividade => {
    const matchesSearch = atividade.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atividade.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atividade.cpfResponsavel.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || atividade.status === statusFilter;
    const matchesTipo = tipoFilter === "all" || atividade.tipo === tipoFilter;
    
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const getStatusCount = (status: string) => {
    if (status === "all") return pgdActivities.length;
    return pgdActivities.filter(a => a.status === status).length;
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
              Listagem das atividades cadastradas no Programa de Gestão
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus size={16} className="mr-2" />
            Nova Atividade
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{getStatusCount("all")}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{getStatusCount("em_andamento")}</div>
              <div className="text-sm text-muted-foreground">Em Andamento</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">{getStatusCount("pendente")}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{getStatusCount("concluida")}</div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{getStatusCount("atrasada")}</div>
              <div className="text-sm text-muted-foreground">Atrasadas</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar por código, CPF ou descrição..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="atrasada">Atrasada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                  <SelectItem value="Capacitação">Capacitação</SelectItem>
                  <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                  <SelectItem value="Segurança">Segurança</SelectItem>
                  <SelectItem value="Documentação">Documentação</SelectItem>
                  <SelectItem value="Treinamento">Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Lista de Atividades PGD
              </CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {filteredActivities.length} atividades
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((atividade) => (
                <Card key={atividade.id} className="border border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Informações Principais */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="font-mono text-xs">
                            {atividade.codigo}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(atividade.status)}
                            <Badge className={getStatusColor(atividade.status)}>
                              {getStatusText(atividade.status)}
                            </Badge>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-sm leading-tight">
                          {atividade.descricao}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(atividade.prioridade)}>
                            {atividade.prioridade}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {atividade.tipo}
                          </Badge>
                        </div>
                      </div>

                      {/* CPFs e Datas */}
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Responsável</p>
                          <p className="font-mono">{atividade.cpfResponsavel}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Relator</p>
                          <p className="font-mono">{atividade.cpfRelator}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Período</p>
                          <p className="text-xs">{atividade.dataInicio} - {atividade.dataFim}</p>
                        </div>
                      </div>

                      {/* Métricas */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progresso</span>
                          <span className="text-sm font-medium">{atividade.progresso}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all"
                            style={{ width: `${atividade.progresso}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">Estimado</p>
                            <p className="font-medium">{atividade.horasEstimadas}h</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Realizado</p>
                            <p className="font-medium">{atividade.horasRealizadas}h</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma atividade encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Tente ajustar os filtros ou criar uma nova atividade.
                  </p>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus size={16} className="mr-2" />
                    Nova Atividade
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}