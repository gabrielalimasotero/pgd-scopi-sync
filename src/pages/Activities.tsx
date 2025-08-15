import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";

// Mock data - estrutura API PGD conforme Resolução CPGD/MGI nº 2/2024
const pgdActivities = [
  {
    // Bloco Participante
    participante: {
      cpf: "123.456.789-01",
      nomeCompleto: "João Silva Santos",
      vinculo: "EFETIVO",
      modalidadeExecucao: "TELETRABALHO_INTEGRAL",
      tcr: "TCR-2024-001"
    },
    // Bloco Plano de Trabalho  
    planoTrabalho: {
      id: "PT-2024-001",
      status: "ATIVO",
      cargaHoraria: 40,
      dataInicio: "15/01/2024",
      dataFim: "28/02/2024"
    },
    // Bloco Contribuições
    contribuicoes: [
      {
        tipo: "PRODUTO",
        percentual: 70,
        vinculoEntrega: "ENT-001"
      },
      {
        tipo: "PROCESSO",
        percentual: 30,
        vinculoEntrega: "ENT-002"
      }
    ],
    // Bloco Entregas
    entregas: [
      {
        id: "ENT-001",
        meta: "Implementar 5 módulos do sistema",
        dataEntrega: "28/02/2024",
        unidadeDemandante: "DTIC",
        unidadeDestinataria: "PROEN",
        status: "EM_ANDAMENTO",
        progresso: 75
      },
      {
        id: "ENT-002", 
        meta: "Documentar processos de desenvolvimento",
        dataEntrega: "25/02/2024",
        unidadeDemandante: "DTIC",
        unidadeDestinataria: "PROEN",
        status: "EM_ANDAMENTO",
        progresso: 45
      }
    ],
    // Bloco Plano de Entregas
    planoEntregas: {
      status: "APROVADO",
      dataAvaliacao: "10/01/2024",
      nota: 8.5
    },
    // Bloco Avaliação de Execução
    avaliacaoExecucao: {
      periodo: "JANEIRO_2024",
      nota: 8.2,
      dataAvaliacao: "01/02/2024",
      observacoes: "Desempenho acima da média"
    }
  },
  {
    participante: {
      cpf: "234.567.890-12",
      nomeCompleto: "Maria Oliveira Costa",
      vinculo: "EFETIVO", 
      modalidadeExecucao: "PRESENCIAL",
      tcr: null
    },
    planoTrabalho: {
      id: "PT-2024-002",
      status: "CONCLUIDO",
      cargaHoraria: 40,
      dataInicio: "08/01/2024",
      dataFim: "30/01/2024"
    },
    contribuicoes: [
      {
        tipo: "CAPACITACAO",
        percentual: 100,
        vinculoEntrega: "ENT-003"
      }
    ],
    entregas: [
      {
        id: "ENT-003",
        meta: "Capacitar 50 servidores em ferramentas digitais",
        dataEntrega: "30/01/2024", 
        unidadeDemandante: "PROEN",
        unidadeDestinataria: "TODOS_CAMPI",
        status: "CONCLUIDA",
        progresso: 100
      }
    ],
    planoEntregas: {
      status: "APROVADO",
      dataAvaliacao: "05/01/2024",
      nota: 9.0
    },
    avaliacaoExecucao: {
      periodo: "JANEIRO_2024",
      nota: 9.2,
      dataAvaliacao: "01/02/2024",
      observacoes: "Excelente execução"
    }
  },
  {
    participante: {
      cpf: "345.678.901-23",
      nomeCompleto: "Carlos Eduardo Lima",
      vinculo: "COMISSIONADO",
      modalidadeExecucao: "TELETRABALHO_PARCIAL", 
      tcr: "TCR-2024-003"
    },
    planoTrabalho: {
      id: "PT-2024-003",
      status: "ATIVO",
      cargaHoraria: 40,
      dataInicio: "01/02/2024",
      dataFim: "15/03/2024"
    },
    contribuicoes: [
      {
        tipo: "INFRAESTRUTURA",
        percentual: 80,
        vinculoEntrega: "ENT-004"
      },
      {
        tipo: "PROCESSO",
        percentual: 20,
        vinculoEntrega: "ENT-005"
      }
    ],
    entregas: [
      {
        id: "ENT-004",
        meta: "Modernizar 10 servidores de rede",
        dataEntrega: "15/03/2024",
        unidadeDemandante: "DTIC",
        unidadeDestinataria: "TODOS_CAMPI",
        status: "PENDENTE",
        progresso: 0
      },
      {
        id: "ENT-005",
        meta: "Padronizar processos de TI",
        dataEntrega: "10/03/2024",
        unidadeDemandante: "DTIC", 
        unidadeDestinataria: "DTIC",
        status: "PENDENTE",
        progresso: 0
      }
    ],
    planoEntregas: {
      status: "APROVADO",
      dataAvaliacao: "25/01/2024",
      nota: 8.0
    },
    avaliacaoExecucao: {
      periodo: "FEVEREIRO_2024",
      nota: null,
      dataAvaliacao: null,
      observacoes: "Pendente de avaliação"
    }
  },
  {
    participante: {
      cpf: "456.789.012-34",
      nomeCompleto: "Ana Paula Ferreira",
      vinculo: "EFETIVO",
      modalidadeExecucao: "PRESENCIAL",
      tcr: null
    },
    planoTrabalho: {
      id: "PT-2024-004", 
      status: "ATIVO",
      cargaHoraria: 40,
      dataInicio: "20/01/2024",
      dataFim: "15/02/2024"
    },
    contribuicoes: [
      {
        tipo: "SEGURANCA",
        percentual: 100,
        vinculoEntrega: "ENT-006"
      }
    ],
    entregas: [
      {
        id: "ENT-006",
        meta: "Atualizar 15 protocolos de segurança",
        dataEntrega: "15/02/2024",
        unidadeDemandante: "DTIC",
        unidadeDestinataria: "TODOS_CAMPI", 
        status: "EM_ANDAMENTO",
        progresso: 60
      }
    ],
    planoEntregas: {
      status: "APROVADO",
      dataAvaliacao: "15/01/2024",
      nota: 8.5
    },
    avaliacaoExecucao: {
      periodo: "JANEIRO_2024",
      nota: 8.0,
      dataAvaliacao: "01/02/2024",
      observacoes: "Bom progresso"
    }
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "CONCLUIDA":
    case "CONCLUIDO":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "EM_ANDAMENTO": 
    case "ATIVO":
      return <Clock className="h-4 w-4 text-warning" />;
    case "PENDENTE":
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONCLUIDA":
    case "CONCLUIDO":
      return "bg-success/10 text-success border-success/20";
    case "EM_ANDAMENTO":
    case "ATIVO": 
      return "bg-warning/10 text-warning border-warning/20";
    case "PENDENTE":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "CONCLUIDA": 
    case "CONCLUIDO": return "Concluído";
    case "EM_ANDAMENTO": return "Em Andamento";
    case "ATIVO": return "Ativo";
    case "PENDENTE": return "Pendente";
    default: return status;
  }
};

const getModalidadeColor = (modalidade: string) => {
  switch (modalidade) {
    case "TELETRABALHO_INTEGRAL": return "bg-primary/10 text-primary border-primary/20";
    case "TELETRABALHO_PARCIAL": return "bg-info/10 text-info border-info/20";
    case "PRESENCIAL": return "bg-secondary/10 text-secondary border-secondary/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function Activities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tipoFilter, setTipoFilter] = useState("all");

  const filteredActivities = pgdActivities.filter(atividade => {
    const matchesSearch = atividade.planoTrabalho.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atividade.participante.cpf.includes(searchTerm) ||
                         atividade.participante.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || atividade.planoTrabalho.status === statusFilter;
    const matchesTipo = tipoFilter === "all" || atividade.participante.modalidadeExecucao === tipoFilter;
    
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const getStatusCount = (status: string) => {
    if (status === "all") return pgdActivities.length;
    return pgdActivities.filter(a => a.planoTrabalho.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Planos de Trabalho PGD
            </h1>
            <p className="text-muted-foreground mt-2">
              Listagem dos planos de trabalho cadastrados no Programa de Gestão
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus size={16} className="mr-2" />
            Novo Plano de Trabalho
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{getStatusCount("all")}</div>
              <div className="text-sm text-muted-foreground">Total Planos</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{getStatusCount("ATIVO")}</div>
              <div className="text-sm text-muted-foreground">Ativos</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{getStatusCount("CONCLUIDO")}</div>
              <div className="text-sm text-muted-foreground">Concluídos</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">{getStatusCount("PENDENTE")}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
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
                  placeholder="Buscar por código, CPF ou nome..." 
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
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                  <SelectItem value="TELETRABALHO_INTEGRAL">Teletrabalho Integral</SelectItem>
                  <SelectItem value="TELETRABALHO_PARCIAL">Teletrabalho Parcial</SelectItem>
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
                Lista de Planos de Trabalho PGD
              </CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {filteredActivities.length} planos de trabalho
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((item, index) => (
                <Card key={item.planoTrabalho.id} className="border border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Bloco Participante */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.planoTrabalho.id}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.planoTrabalho.status)}
                            <Badge className={getStatusColor(item.planoTrabalho.status)}>
                              {getStatusText(item.planoTrabalho.status)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-sm">
                            {item.participante.nomeCompleto}
                          </h3>
                          <p className="font-mono text-xs text-muted-foreground">
                            CPF: {item.participante.cpf}
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Badge className={getModalidadeColor(item.participante.modalidadeExecucao)} >
                            {item.participante.modalidadeExecucao.replace(/_/g, ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.participante.vinculo}
                          </Badge>
                          {item.participante.tcr && (
                            <Badge variant="outline" className="text-xs font-mono">
                              {item.participante.tcr}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Bloco Entregas */}
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Período</p>
                          <p className="text-xs">{item.planoTrabalho.dataInicio} - {item.planoTrabalho.dataFim}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Carga Horária</p>
                          <p className="font-medium">{item.planoTrabalho.cargaHoraria}h semanais</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Entregas</p>
                          <div className="space-y-1">
                            {item.entregas.slice(0, 2).map((entrega) => (
                              <div key={entrega.id} className="flex items-center justify-between">
                                <p className="text-xs truncate flex-1">{entrega.meta}</p>
                                <Badge className={getStatusColor(entrega.status)} >
                                  {entrega.progresso}%
                                </Badge>
                              </div>
                            ))}
                            {item.entregas.length > 2 && (
                              <p className="text-xs text-muted-foreground">
                                +{item.entregas.length - 2} entregas
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bloco Avaliações */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Plano de Entregas</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(item.planoEntregas.status)}>
                              {item.planoEntregas.status}
                            </Badge>
                            <span className="text-sm font-medium">Nota: {item.planoEntregas.nota}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">Última Avaliação</p>
                          {item.avaliacaoExecucao.nota ? (
                            <div>
                              <p className="font-medium">Nota: {item.avaliacaoExecucao.nota}</p>
                              <p className="text-xs text-muted-foreground">{item.avaliacaoExecucao.periodo.replace(/_/g, ' ')}</p>
                              <p className="text-xs text-muted-foreground">{item.avaliacaoExecucao.observacoes}</p>
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">Pendente de avaliação</p>
                          )}
                        </div>
                        
                        <div className="pt-2 space-y-2">
                          <Button variant="outline" size="sm" className="w-full">
                            Ver Detalhes
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            Avaliar Execução
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
                  <h3 className="text-lg font-medium mb-2">Nenhum plano de trabalho encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Tente ajustar os filtros ou criar um novo plano de trabalho.
                  </p>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus size={16} className="mr-2" />
                    Novo Plano de Trabalho
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