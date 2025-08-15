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

// Importar dados reais do IFPE baseados na API PGD oficial
import { useQuery } from '@tanstack/react-query';
import { pgdIFPEService } from '../services/pgd-ifpe-service';
import ifpeData from '../data/ifpe-mock-data';



const planosRecentes = [
  {
    id: "PT-2024-089",
    participante: {
      cpf: "123.456.789-01",
      nome: "João Silva Santos"
    },
    status: "ATIVO",
    entregas: 3,
    avaliacaoMedia: 8.5,
    dataFim: "28/02/2024"
  },
  {
    id: "PT-2024-087", 
    participante: {
      cpf: "234.567.890-12",
      nome: "Maria Oliveira Costa"
    },
    status: "CONCLUIDO",
    entregas: 2,
    avaliacaoMedia: 9.2,
    dataFim: "30/01/2024"
  },
  {
    id: "PT-2024-091",
    participante: {
      cpf: "345.678.901-23",
      nome: "Carlos Eduardo Lima"
    },
    status: "PENDENTE",
    entregas: 5,
    avaliacaoMedia: null,
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
  // Carregar dados do dashboard usando React Query
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-ifpe'],
    queryFn: () => pgdIFPEService.getDashboardConsolidado(),
    refetchInterval: 5 * 60 * 1000, // Atualizar a cada 5 minutos
  });

  const { data: alertasData } = useQuery({
    queryKey: ['alertas-ifpe'],
    queryFn: () => pgdIFPEService.getAlertas(),
    refetchInterval: 2 * 60 * 1000, // Atualizar a cada 2 minutos
  });

  // Usar dados da API ou fallback para dados mock
  const metricas = dashboardData?.data || ifpeData.dashboard;
  const alertas = alertasData?.data || ifpeData.alertas;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados do PGD-SCOPI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Dashboard IFPE
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

        {/* Métricas Principais API PGD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{metricas.participantes.total}</p>
                <p className="text-sm text-muted-foreground">Total Participantes</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">{metricas.planos_trabalho.por_status.em_execucao}</p>
                <p className="text-sm text-muted-foreground">Planos Ativos</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">8.4</p>
                <p className="text-sm text-muted-foreground">Nota Média Entregas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-info">98.7%</p>
                <p className="text-sm text-muted-foreground">Aderência API</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas Modalidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{metricas.participantes.por_modalidade.presencial}</p>
                <p className="text-sm text-muted-foreground">Presencial</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{metricas.participantes.por_modalidade.teletrabalho_integral}</p>
                <p className="text-sm text-muted-foreground">Teletrabalho Integral</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-info">{metricas.participantes.por_modalidade.teletrabalho_parcial}</p>
                <p className="text-sm text-muted-foreground">Teletrabalho Parcial</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertas.map((alerta, index) => {
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
                        {alerta.tipo === 'critico' && (
                          <Badge variant="destructive" className="text-xs">
                            Crítico
                          </Badge>
                        )}
                        {alerta.tipo === 'sucesso' && (
                          <Badge variant="default" className="text-xs bg-success">
                            OK
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

        {/* Planos Recentes */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Últimos Planos de Trabalho
              </CardTitle>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planosRecentes.map((plano) => (
                <div key={plano.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono text-xs">
                      {plano.id}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{plano.participante.nome}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        CPF: {plano.participante.cpf}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {plano.entregas} entregas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {plano.avaliacaoMedia ? `Nota: ${plano.avaliacaoMedia}` : 'Sem avaliação'}
                      </p>
                      <p className="text-xs text-muted-foreground">{plano.dataFim}</p>
                    </div>
                    <Badge className={
                      plano.status === 'CONCLUIDO' ? 'bg-success/10 text-success' :
                      plano.status === 'ATIVO' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }>
                      {plano.status === 'CONCLUIDO' ? 'Concluído' :
                       plano.status === 'ATIVO' ? 'Ativo' : 'Pendente'}
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