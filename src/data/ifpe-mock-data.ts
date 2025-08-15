/**
 * Dados mock realistas do IFPE para demonstração
 * Baseado no projeto de integração PGD-SCOPI
 * 
 * Equipe: Victoria Luquet, Victor Silva, Vituriano Xisto, Tiago Lima, Gabriela Lima
 */

import {
  Participante,
  PlanoTrabalho,
  PlanoEntregas,
  StatusPlanoTrabalho,
  StatusPlanoEntregas,
  TipoContribuicao,
  TipoMeta,
  AvaliacaoRegistrosExecucao,
  DashboardPGD,
  UnidadeIFPE,
  SetorIFPE,
  RelatorioIFPE
} from '../types/pgd-api';

// ===== UNIDADES DO IFPE =====
export const unidadesIFPE: UnidadeIFPE[] = [
  {
    codigo: 1001,
    nome: 'Reitoria',
    tipo: 'reitoria',
    endereco: 'Av. Professor Luiz Freire, 500 - Cidade Universitária, Recife - PE',
    gestores: ['João Carlos Silva', 'Maria Santos Oliveira'],
    servidores_ativos: 156
  },
  {
    codigo: 1002,
    nome: 'Campus Recife',
    tipo: 'campus',
    endereco: 'Av. Professor Luiz Freire, 500 - Cidade Universitária, Recife - PE',
    gestores: ['Carlos Alberto Lima', 'Ana Paula Costa'],
    servidores_ativos: 243
  },
  {
    codigo: 1003,
    nome: 'Campus Olinda',
    tipo: 'campus',
    endereco: 'Rua do Amparo, 83 - Amparo, Olinda - PE',
    gestores: ['Roberto Silva Santos', 'Fernanda Alves'],
    servidores_ativos: 89
  },
  {
    codigo: 1004,
    nome: 'Campus Jaboatão dos Guararapes',
    tipo: 'campus',
    endereco: 'Vila dos Comerciários, s/n - Piedade, Jaboatão dos Guararapes - PE',
    gestores: ['Marcos Antonio Pereira'],
    servidores_ativos: 67
  }
];

// ===== SETORES DO IFPE =====
export const setoresIFPE: SetorIFPE[] = [
  {
    codigo: 'TI-001',
    nome: 'Diretoria de Tecnologia da Informação',
    unidade: 1001,
    coordenador: 'Eduardo Santos Lima',
    atividades_principais: [
      'Desenvolvimento de sistemas acadêmicos',
      'Manutenção da infraestrutura de TI',
      'Suporte técnico aos usuários',
      'Segurança da informação'
    ]
  },
  {
    codigo: 'RH-001',
    nome: 'Diretoria de Gestão de Pessoas',
    unidade: 1001,
    coordenador: 'Sandra Maria Costa',
    atividades_principais: [
      'Gestão de servidores',
      'Capacitação e desenvolvimento',
      'Folha de pagamento',
      'Concursos públicos'
    ]
  },
  {
    codigo: 'ENSINO-001',
    nome: 'Diretoria de Ensino',
    unidade: 1002,
    coordenador: 'Professor Dr. Antonio Silva',
    atividades_principais: [
      'Coordenação acadêmica',
      'Desenvolvimento curricular',
      'Avaliação institucional',
      'Projetos pedagógicos'
    ]
  },
  {
    codigo: 'PESQ-001',
    nome: 'Diretoria de Pesquisa e Inovação',
    unidade: 1002,
    coordenador: 'Dra. Carmen Lucia Santos',
    atividades_principais: [
      'Fomento à pesquisa',
      'Propriedade intelectual',
      'Parcerias com empresas',
      'Iniciação científica'
    ]
  },
  {
    codigo: 'EXT-001',
    nome: 'Diretoria de Extensão',
    unidade: 1003,
    coordenador: 'Prof. Ricardo Almeida',
    atividades_principais: [
      'Projetos de extensão',
      'Educação continuada',
      'Articulação com a comunidade',
      'Eventos acadêmicos'
    ]
  }
];

// ===== PARTICIPANTES PGD DO IFPE =====
export const participantesIFPE: Participante[] = [
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_lotacao: 1001,
    matricula_Siape: "2345678",
    cod_unidade_instituidora: 1001,
    cpf: "12345678901",
    situacao: 1,
    modalidade_execucao: 3, // Teletrabalho integral
    data_assinatura_tcr: "2024-01-15"
  },
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_lotacao: 1002,
    matricula_Siape: "3456789",
    cod_unidade_instituidora: 1001,
    cpf: "23456789012",
    situacao: 1,
    modalidade_execucao: 2, // Teletrabalho parcial
    data_assinatura_tcr: "2024-01-20"
  },
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_lotacao: 1003,
    matricula_Siape: "4567890",
    cod_unidade_instituidora: 1001,
    cpf: "34567890123",
    situacao: 1,
    modalidade_execucao: 1, // Presencial
    data_assinatura_tcr: "2024-02-01"
  },
  // Mais participantes específicos do IFPE
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_lotacao: 1002,
    matricula_Siape: "5678901",
    cod_unidade_instituidora: 1001,
    cpf: "45678901234",
    situacao: 1,
    modalidade_execucao: 3,
    data_assinatura_tcr: "2024-01-25"
  },
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_lotacao: 1004,
    matricula_Siape: "6789012",
    cod_unidade_instituidora: 1001,
    cpf: "56789012345",
    situacao: 1,
    modalidade_execucao: 2,
    data_assinatura_tcr: "2024-02-10"
  }
];

// ===== PLANOS DE ENTREGAS IFPE =====
export const planosEntregasIFPE: PlanoEntregas[] = [
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_instituidora: 1001,
    cod_unidade_executora: 1001,
    id_plano_entregas: "PE-IFPE-2024-001",
    status: StatusPlanoEntregas.EM_EXECUCAO,
    data_inicio: "2024-01-01",
    data_termino: "2024-12-31",
    entregas: [
      {
        id_entrega: "ENT-IFPE-001",
        entrega_cancelada: false,
        nome_entrega: "Sistema Integrado de Gestão Acadêmica",
        meta_entrega: 1,
        tipo_meta: TipoMeta.UNIDADE,
        data_entrega: "2024-06-30",
        nome_unidade_demandante: "Diretoria de Ensino",
        nome_unidade_destinataria: "Todos os Campi IFPE"
      },
      {
        id_entrega: "ENT-IFPE-002",
        entrega_cancelada: false,
        nome_entrega: "Portal de Transparência Institucional",
        meta_entrega: 100,
        tipo_meta: TipoMeta.PERCENTUAL,
        data_entrega: "2024-04-30",
        nome_unidade_demandante: "Reitoria",
        nome_unidade_destinataria: "Sociedade"
      },
      {
        id_entrega: "ENT-IFPE-003",
        entrega_cancelada: false,
        nome_entrega: "Plataforma de Educação a Distância",
        meta_entrega: 1,
        tipo_meta: TipoMeta.UNIDADE,
        data_entrega: "2024-08-31",
        nome_unidade_demandante: "Diretoria de EaD",
        nome_unidade_destinataria: "Estudantes e Docentes"
      }
    ]
  },
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    cod_unidade_instituidora: 1001,
    cod_unidade_executora: 1002,
    id_plano_entregas: "PE-IFPE-2024-002",
    status: StatusPlanoEntregas.EM_EXECUCAO,
    data_inicio: "2024-02-01",
    data_termino: "2024-11-30",
    entregas: [
      {
        id_entrega: "ENT-IFPE-004",
        entrega_cancelada: false,
        nome_entrega: "Programa de Capacitação Docente",
        meta_entrega: 200,
        tipo_meta: TipoMeta.UNIDADE,
        data_entrega: "2024-10-31",
        nome_unidade_demandante: "Campus Recife",
        nome_unidade_destinataria: "Docentes IFPE"
      }
    ]
  }
];

// ===== PLANOS DE TRABALHO IFPE =====
export const planosTrabalhoIFPE: PlanoTrabalho[] = [
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    id_plano_trabalho: "PT-IFPE-2024-001",
    status: StatusPlanoTrabalho.EM_EXECUCAO,
    cod_unidade_executora: 1001,
    cpf_participante: "12345678901",
    matricula_Siape: "2345678",
    data_inicio: "2024-01-15",
    data_termino: "2024-03-15",
    carga_horaria_disponivel: 320,
    cod_unidade_lotacao_participante: 1001,
    contribuicoes: [
      {
        id_contribuicao: "CONTRIB-IFPE-001",
        tipo_contribuicao: TipoContribuicao.ENTREGA_PROPRIA_UNIDADE,
        percentual_contribuicao: 60,
        id_plano_entregas: "PE-IFPE-2024-001",
        id_entrega: "ENT-IFPE-001"
      },
      {
        id_contribuicao: "CONTRIB-IFPE-002",
        tipo_contribuicao: TipoContribuicao.NAO_VINCULADA_DIRETAMENTE,
        percentual_contribuicao: 25
      },
      {
        id_contribuicao: "CONTRIB-IFPE-003",
        tipo_contribuicao: TipoContribuicao.ENTREGA_OUTRA_UNIDADE,
        percentual_contribuicao: 15
      }
    ],
    avaliacoes_registros_execucao: [
      {
        id_periodo_avaliativo: "AVAL-IFPE-001",
        data_inicio_periodo_avaliativo: "2024-01-15",
        data_fim_periodo_avaliativo: "2024-02-15",
        avaliacao_registros_execucao: AvaliacaoRegistrosExecucao.ALTO_DESEMPENHO,
        data_avaliacao_registros_execucao: "2024-02-20"
      }
    ]
  },
  {
    origem_unidade: "SIAPE",
    cod_unidade_autorizadora: 1001,
    id_plano_trabalho: "PT-IFPE-2024-002",
    status: StatusPlanoTrabalho.CONCLUIDO,
    cod_unidade_executora: 1002,
    cpf_participante: "23456789012",
    matricula_Siape: "3456789",
    data_inicio: "2024-02-01",
    data_termino: "2024-02-29",
    carga_horaria_disponivel: 160,
    cod_unidade_lotacao_participante: 1002,
    contribuicoes: [
      {
        id_contribuicao: "CONTRIB-IFPE-004",
        tipo_contribuicao: TipoContribuicao.ENTREGA_PROPRIA_UNIDADE,
        percentual_contribuicao: 70,
        id_plano_entregas: "PE-IFPE-2024-002",
        id_entrega: "ENT-IFPE-004"
      },
      {
        id_contribuicao: "CONTRIB-IFPE-005",
        tipo_contribuicao: TipoContribuicao.NAO_VINCULADA_DIRETAMENTE,
        percentual_contribuicao: 30
      }
    ],
    avaliacoes_registros_execucao: [
      {
        id_periodo_avaliativo: "AVAL-IFPE-002",
        data_inicio_periodo_avaliativo: "2024-02-01",
        data_fim_periodo_avaliativo: "2024-02-29",
        avaliacao_registros_execucao: AvaliacaoRegistrosExecucao.EXCEPCIONAL,
        data_avaliacao_registros_execucao: "2024-03-05"
      }
    ]
  }
];

// ===== DASHBOARD CONSOLIDADO IFPE =====
export const dashboardIFPE: DashboardPGD = {
  participantes: {
    total: 555,
    ativos: 498,
    inativos: 57,
    por_modalidade: {
      presencial: 187,
      teletrabalho_parcial: 156,
      teletrabalho_integral: 155,
      exterior_art12_viii: 0,
      exterior_art12_p7: 0,
    }
  },
  planos_trabalho: {
    total: 347,
    por_status: {
      cancelados: 12,
      aprovados: 89,
      em_execucao: 156,
      concluidos: 90,
    },
    carga_horaria_total: 27840
  },
  planos_entregas: {
    total: 45,
    por_status: {
      cancelados: 2,
      aprovados: 12,
      em_execucao: 25,
      concluidos: 6,
      avaliados: 4,
    },
    entregas_total: 234,
    entregas_canceladas: 8
  },
  avaliacoes: {
    registros_execucao: {
      excepcional: 45,
      alto_desempenho: 123,
      adequado: 145,
      inadequado: 28,
      nao_executado: 6
    },
    planos_entregas: {
      excepcional: 4,
      alto_desempenho: 18,
      adequado: 20,
      inadequado: 3,
      nao_executado: 0
    }
  }
};

// ===== DADOS PARA GRÁFICOS E RELATÓRIOS =====
export const dadosGraficosIFPE = {
  evolucaoMensal: [
    { mes: 'Jan', pgd: 87, scopi: 92, meta: 85 },
    { mes: 'Fev', pgd: 91, scopi: 94, meta: 85 },
    { mes: 'Mar', pgd: 89, scopi: 91, meta: 88 },
    { mes: 'Abr', pgd: 94, scopi: 96, meta: 90 },
    { mes: 'Mai', pgd: 92, scopi: 95, meta: 90 },
    { mes: 'Jun', pgd: 96, scopi: 98, meta: 92 },
  ],
  
  eficienciaPorCampus: [
    { campus: 'Reitoria', eficiencia: 96, servidores: 156 },
    { campus: 'Recife', eficiencia: 94, servidores: 243 },
    { campus: 'Olinda', eficiencia: 89, servidores: 89 },
    { campus: 'Jaboatão', eficiencia: 91, servidores: 67 },
  ],
  
  distribuicaoModalidades: [
    { modalidade: 'Presencial', quantidade: 187, percentual: 33.7 },
    { modalidade: 'Teletrabalho Parcial', quantidade: 156, percentual: 28.1 },
    { modalidade: 'Teletrabalho Integral', quantidade: 155, percentual: 27.9 },
    { modalidade: 'Híbrido', quantidade: 57, percentual: 10.3 },
  ],
  
  contribuicoesPorArea: [
    { area: 'Ensino', contribuicoes: 89, peso: 35 },
    { area: 'Pesquisa', contribuicoes: 67, peso: 25 },
    { area: 'Extensão', contribuicoes: 45, peso: 20 },
    { area: 'Gestão/Admin', contribuicoes: 134, peso: 20 },
  ]
};

// ===== INFORMAÇÕES DO PROJETO DE INTEGRAÇÃO =====
export const informacoesProjeto = {
  titulo: "Sistema de Integração de Plataformas de Gestão - IFPE",
  equipe: [
    "Victoria Luquet",
    "Victor Silva", 
    "Vituriano Xisto",
    "Tiago Lima",
    "Gabriela Lima"
  ],
  objetivos: [
    "Eliminar retrabalho entre PGD e SCOPI",
    "Melhorar rastreabilidade dos dados",
    "Facilitar tomada de decisão baseada em dados",
    "Aumentar transparência da gestão pública",
    "Garantir conformidade com Decreto nº 11.072/2022"
  ],
  beneficios: [
    "Base única de dados",
    "Sincronização automatizada",
    "Dashboards integrados",
    "Relatórios consolidados",
    "Redução de erros manuais"
  ],
  cronograma: {
    kickoff: "Concluído",
    primeiro_status: "Concluído", 
    segundo_status: "Concluído",
    entrega_final: "Concluído",
    implementacao: "Em desenvolvimento"
  }
};

// ===== SIMULAÇÃO DE ALERTAS E NOTIFICAÇÕES =====
export const alertasIFPE = [
  {
    id: 'alert-001',
    tipo: 'sucesso',
    titulo: 'Sincronização PGD-SCOPI',
    descricao: 'Todas as unidades estão sincronizadas e atualizadas',
    unidades_afetadas: ['Campus Olinda', 'Campus Jaboatão', 'Campus Recife'],
    timestamp: '2024-01-20T10:30:00Z'
  },
  {
    id: 'alert-002',
    tipo: 'atencao',
    titulo: 'Avaliações Pendentes',
    descricao: '23 avaliações de planos de trabalho pendentes',
    prazo_limite: '2024-01-25',
    timestamp: '2024-01-20T14:15:00Z'
  },
  {
    id: 'alert-003',
    tipo: 'sucesso',
    titulo: 'Meta de Transparência',
    descricao: 'Portal de transparência atualizado com 100% dos dados',
    timestamp: '2024-01-20T16:45:00Z'
  },

];

export default {
  unidades: unidadesIFPE,
  setores: setoresIFPE,
  participantes: participantesIFPE,
  planosEntregas: planosEntregasIFPE,
  planosTrabalho: planosTrabalhoIFPE,
  dashboard: dashboardIFPE,
  graficos: dadosGraficosIFPE,
  projeto: informacoesProjeto,
  alertas: alertasIFPE
};
