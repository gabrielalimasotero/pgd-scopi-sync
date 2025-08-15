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

// Mock data - métricas gerais
const metricasGerais = {
  totalServidores: 247,
  atividadesAtivas: 156,
  atividadesConcluidas: 89,
  horasTrabalhadas: 12450,
  eficienciaMedia: 87.3,
  tempoMedioEntrega: 15.2,
  aderenciaPrograma: 94.1,
  servidoresAtivos: 198
};

const alertasGerais = [
  {
    tipo: "critico",
    titulo: "Meta de Aderência",
    descricao: "13 servidores sem atividades há mais de 15 dias",
    quantidade: 13
  },
  {
    tipo: "atencao", 
    titulo: "Atividades Atrasadas",
    descricao: "23 atividades com prazo vencido",
    quantidade: 23
  },
  {
    tipo: "sucesso",
    titulo: "Meta Mensal",
    descricao: "Meta de conclusão atingida em 104%",
    percentual: 104
  }
];

const atividadesRecentes = [
  {
    codigo: "PGD-2024-089",
    cpfResponsavel: "123.456.789-01",
    descricao: "Implementação Sistema Avaliação",
    status: "em_andamento",
    progresso: 75,
    dataFim: "28/02/2024"
  },
  {
    codigo: "PGD-2024-087", 
    cpfResponsavel: "234.567.890-12",
    descricao: "Capacitação Ferramentas Digitais",
    status: "concluida",
    progresso: 100,
    dataFim: "30/01/2024"
  },
  {
    codigo: "PGD-2024-091",
    cpfResponsavel: "345.678.901-23", 
    descricao: "Modernização Infraestrutura TI",
    status: "pendente",
    progresso: 0,
    dataFim: "15/03/2024"
  }
];

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case "critico":
      return AlertTriangle;
    case "atencao": 
      return Clock;
    case "sucesso":
      return CheckCircle2;
    default:
      return TrendingUp;
  }
};

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "critico":
      return "bg-destructive/10 text-destructive";
    case "atencao":
      return "bg-warning/10 text-warning"; 
    case "sucesso":
      return "bg-success/10 text-success";
    default:
      return "bg-info/10 text-info";
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Dashboard PGD-SCOPI
            </h1>
            <p className="text-muted-foreground mt-2">
              Métricas gerais de produtividade e acompanhamento do Programa de Gestão
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarDays size={16} />
              {new Date().toLocaleDateString('pt-BR')}
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <TrendingUp size={16} className="mr-2" />
              Relatório Completo
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{metricasGerais.totalServidores}</p>
                <p className="text-sm text-muted-foreground">Total Servidores</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">{metricasGerais.atividadesAtivas}</p>
                <p className="text-sm text-muted-foreground">Atividades Ativas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">{metricasGerais.eficienciaMedia}%</p>
                <p className="text-sm text-muted-foreground">Eficiência Média</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-info">{metricasGerais.aderenciaPrograma}%</p>
                <p className="text-sm text-muted-foreground">Aderência PGD</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertasGerais.map((alerta, index) => {
            const Icon = getTipoIcon(alerta.tipo);
            return (
              <Card key={index} className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getTipoColor(alerta.tipo)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{alerta.titulo}</h3>
                        {alerta.quantidade && (
                          <Badge variant="destructive" className="text-xs">
                            {alerta.quantidade}
                          </Badge>
                        )}
                        {alerta.percentual && (
                          <Badge variant="default" className="text-xs bg-success">
                            {alerta.percentual}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alerta.descricao}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Dashboard Stats */}
        <DashboardStats />

        {/* Atividades Recentes */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Últimas Atividades
              </CardTitle>
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atividadesRecentes.map((atividade) => (
                <div key={atividade.codigo} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono text-xs">
                      {atividade.codigo}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{atividade.descricao}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        CPF: {atividade.cpfResponsavel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{atividade.progresso}%</p>
                      <p className="text-xs text-muted-foreground">{atividade.dataFim}</p>
                    </div>
                    <Badge className={
                      atividade.status === 'concluida' ? 'bg-success/10 text-success' :
                      atividade.status === 'em_andamento' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }>
                      {atividade.status === 'concluida' ? 'Concluída' :
                       atividade.status === 'em_andamento' ? 'Em Andamento' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}