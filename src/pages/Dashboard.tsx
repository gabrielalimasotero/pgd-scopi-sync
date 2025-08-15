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

// Mock data - métricas conforme API PGD
const metricasGerais = {
  totalParticipantes: 247,
  planosAtivos: 156,
  planosConcluidos: 89,
  entregasRealizadas: 542,
  avaliacaoMediaEntregas: 8.4,
  avaliacaoMediaExecucao: 7.9,
  aderenciaEnvioAPI: 98.7,
  participantesAtivos: 198,
  tcrsAtivos: 67,
  modalidadePresencial: 89,
  modalidadeTeletrabalhoIntegral: 102,
  modalidadeTeletrabalhoParicial: 56
};

const alertasGerais = [
  {
    tipo: "critico",
    titulo: "Envio API PGD",
    descricao: "3 órgãos com envio atrasado há mais de 7 dias",
    quantidade: 3
  },
  {
    tipo: "atencao", 
    titulo: "Avaliações Pendentes",
    descricao: "45 avaliações de execução pendentes",
    quantidade: 45
  },
  {
    tipo: "sucesso",
    titulo: "Conformidade LGPD",
    descricao: "100% dos dados em conformidade",
    percentual: 100
  }
];

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

        {/* Métricas Principais API PGD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{metricasGerais.totalParticipantes}</p>
                <p className="text-sm text-muted-foreground">Total Participantes</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">{metricasGerais.planosAtivos}</p>
                <p className="text-sm text-muted-foreground">Planos Ativos</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">{metricasGerais.avaliacaoMediaEntregas}</p>
                <p className="text-sm text-muted-foreground">Nota Média Entregas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-info">{metricasGerais.aderenciaEnvioAPI}%</p>
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
                <p className="text-2xl font-bold text-secondary">{metricasGerais.modalidadePresencial}</p>
                <p className="text-sm text-muted-foreground">Presencial</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{metricasGerais.modalidadeTeletrabalhoIntegral}</p>
                <p className="text-sm text-muted-foreground">Teletrabalho Integral</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-info">{metricasGerais.modalidadeTeletrabalhoParicial}</p>
                <p className="text-sm text-muted-foreground">Teletrabalho Parcial</p>
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