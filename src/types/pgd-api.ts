/**
 * Tipos TypeScript baseados na API oficial do PGD
 * Baseado no Decreto nº 11.072/2022 e Instrução Normativa SEGES-SGPRT/MGI nº 24/2023
 * 
 * Projeto: Sistema de Integração PGD-SCOPI - IFPE
 * Equipe: Victoria Luquet, Victor Silva, Vituriano Xisto, Tiago Lima, Gabriela Lima
 */

// ===== PARTICIPANTE =====
export interface Participante {
  origem_unidade: string; // "SIAPE" ou "SIORG"
  cod_unidade_autorizadora: number;
  cod_unidade_lotacao: number;
  matricula_Siape: string; // 7 dígitos
  cod_unidade_instituidora: number;
  cpf: string; // 11 dígitos sem máscaras
  situacao: 0 | 1; // 0: Inativo; 1: Ativo
  modalidade_execucao: 1 | 2 | 3 | 4 | 5; // 1-Presencial, 2-Teletrabalho parcial, 3-Teletrabalho integral, 4-Exterior art.12-VIII, 5-Exterior art.12-§7°
  data_assinatura_tcr?: string; // Data ISO, não pode ser futura
}

// ===== CONTRIBUIÇÃO =====
export enum TipoContribuicao {
  ENTREGA_PROPRIA_UNIDADE = 1, // Contribuição para entrega da própria unidade
  NAO_VINCULADA_DIRETAMENTE = 2, // Atividades de apoio, assessoramento, gestão
  ENTREGA_OUTRA_UNIDADE = 3 // Contribuição para entrega de outra unidade
}

export interface ContribuicaoSchema {
  id?: number;
  id_contribuicao: string;
  tipo_contribuicao: TipoContribuicao;
  percentual_contribuicao: number; // 0-100%
  id_plano_entregas?: string; // Obrigatório se tipo_contribuicao = 1
  id_entrega?: string; // Obrigatório se tipo_contribuicao = 1
}

// ===== AVALIAÇÃO DE REGISTROS DE EXECUÇÃO =====
export enum AvaliacaoRegistrosExecucao {
  EXCEPCIONAL = 1, // Muito acima do esperado
  ALTO_DESEMPENHO = 2, // Acima do esperado
  ADEQUADO = 3, // Dentro do esperado
  INADEQUADO = 4, // Abaixo do esperado ou parcialmente executado
  NAO_EXECUTADO = 5 // Integralmente não executado
}

export interface AvaliacaoRegistrosExecucaoSchema {
  id_periodo_avaliativo: string;
  data_inicio_periodo_avaliativo: string; // Data ISO
  data_fim_periodo_avaliativo: string; // Data ISO
  avaliacao_registros_execucao: AvaliacaoRegistrosExecucao;
  data_avaliacao_registros_execucao: string; // Data ISO
}

// ===== PLANO DE TRABALHO =====
export enum StatusPlanoTrabalho {
  CANCELADO = 1,
  APROVADO = 2,
  EM_EXECUCAO = 3,
  CONCLUIDO = 4
}

export interface PlanoTrabalho {
  origem_unidade: string; // "SIAPE" ou "SIORG"
  cod_unidade_autorizadora: number;
  id_plano_trabalho: string;
  status: StatusPlanoTrabalho;
  cod_unidade_executora: number;
  cpf_participante: string; // CPF válido
  matricula_Siape: string; // 7 dígitos
  data_inicio: string; // Data ISO
  data_termino: string; // Data ISO, >= data_inicio
  carga_horaria_disponivel: number; // >= 0
  contribuicoes: ContribuicaoSchema[];
  avaliacoes_registros_execucao: AvaliacaoRegistrosExecucaoSchema[];
  cod_unidade_lotacao_participante: number;
}

// ===== ENTREGA =====
export enum TipoMeta {
  UNIDADE = 'unidade',
  PERCENTUAL = 'percentual'
}

export interface EntregaSchema {
  id_entrega: string; // Único dentro do mesmo Plano de Entregas
  entrega_cancelada: boolean; // Default: false
  nome_entrega: string; // Máximo 300 caracteres
  meta_entrega: number; // > 0, se percentual: 0-100
  tipo_meta: TipoMeta;
  data_entrega: string; // Data ISO
  nome_unidade_demandante: string; // Máximo 300 caracteres
  nome_unidade_destinataria: string; // Máximo 300 caracteres
}

// ===== PLANO DE ENTREGAS =====
export enum StatusPlanoEntregas {
  CANCELADO = 1,
  APROVADO = 2,
  EM_EXECUCAO = 3,
  CONCLUIDO = 4,
  AVALIADO = 5
}

export enum AvaliacaoPlanoEntregas {
  EXCEPCIONAL = 1, // Muito acima do esperado
  ALTO_DESEMPENHO = 2, // Acima do esperado
  ADEQUADO = 3, // Dentro do esperado
  INADEQUADO = 4, // Abaixo do esperado
  NAO_EXECUTADO = 5 // Não executado
}

export interface PlanoEntregas {
  origem_unidade: string; // "SIAPE" ou "SIORG"
  cod_unidade_autorizadora: number;
  cod_unidade_instituidora: number;
  cod_unidade_executora: number;
  id_plano_entregas: string;
  status: StatusPlanoEntregas;
  data_inicio: string; // Data ISO
  data_termino: string; // Data ISO, > data_inicio
  avaliacao?: AvaliacaoPlanoEntregas; // 1-5, obrigatório se status = 5
  data_avaliacao?: string; // Data ISO, obrigatório se status = 5
  entregas: EntregaSchema[]; // IDs únicos
}

// ===== DADOS CONSOLIDADOS PARA O DASHBOARD =====
export interface DashboardPGD {
  participantes: {
    total: number;
    ativos: number;
    inativos: number;
    por_modalidade: {
      presencial: number;
      teletrabalho_parcial: number;
      teletrabalho_integral: number;
      exterior_art12_viii: number;
      exterior_art12_p7: number;
    };
  };
  planos_trabalho: {
    total: number;
    por_status: {
      cancelados: number;
      aprovados: number;
      em_execucao: number;
      concluidos: number;
    };
    carga_horaria_total: number;
  };
  planos_entregas: {
    total: number;
    por_status: {
      cancelados: number;
      aprovados: number;
      em_execucao: number;
      concluidos: number;
      avaliados: number;
    };
    entregas_total: number;
    entregas_canceladas: number;
  };
  avaliacoes: {
    registros_execucao: {
      excepcional: number;
      alto_desempenho: number;
      adequado: number;
      inadequado: number;
      nao_executado: number;
    };
    planos_entregas: {
      excepcional: number;
      alto_desempenho: number;
      adequado: number;
      inadequado: number;
      nao_executado: number;
    };
  };
}

// ===== TIPOS PARA INTEGRAÇÃO COM SCOPI =====
export interface MapeamentoPGDSCOPI {
  id_plano_trabalho: string;
  id_contribuicao: string;
  scopi_projeto_id?: string;
  scopi_atividade_id?: string;
  peso_contribuicao: number; // 0-1
  status_sincronizacao: 'pendente' | 'sincronizado' | 'erro';
  data_ultima_sincronizacao?: string;
  observacoes?: string;
}

// ===== DADOS ESPECÍFICOS DO IFPE =====
export interface UnidadeIFPE {
  codigo: number;
  nome: string;
  tipo: 'campus' | 'reitoria' | 'diretoria';
  endereco: string;
  gestores: string[];
  servidores_ativos: number;
}

export interface SetorIFPE {
  codigo: string;
  nome: string;
  unidade: number; // código da unidade
  coordenador: string;
  atividades_principais: string[];
}

// ===== RELATÓRIOS IFPE =====
export interface RelatorioIFPE {
  periodo: {
    data_inicio: string;
    data_termino: string;
  };
  unidade: UnidadeIFPE;
  metricas: {
    participantes_ativos: number;
    carga_horaria_planejada: number;
    carga_horaria_realizada: number;
    eficiencia_percentual: number;
    planos_concluidos: number;
    entregas_realizadas: number;
    avaliacao_media: number;
    // Métricas específicas IFPE
    projetos_pesquisa_contribuicoes: number;
    atividades_ensino_contribuicoes: number;
    atividades_extensao_contribuicoes: number;
    processos_administrativos_contribuicoes: number;
  };
  detalhamento_por_setor: Array<{
    setor: SetorIFPE;
    participantes: number;
    eficiencia_media: number;
    contribuicoes_principais: string[];
  }>;
}

// ===== RESPONSES DA API =====
export interface APIPGDResponse<T> {
  success: boolean;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  metadata?: {
    total_records: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface SincronizacaoStatus {
  timestamp: string;
  registros_processados: number;
  registros_com_erro: number;
  registros_sincronizados: number;
  tempo_processamento_ms: number;
  proxima_sincronizacao?: string;
  // Status específico IFPE
  unidades_sincronizadas: number;
  setores_com_pendencias: string[];
}

// ===== UTILITÁRIOS E VALIDAÇÕES =====
export class PGDUtils {
  static validarCPF(cpf: string): boolean {
    return cpf.length === 11 && /^\d+$/.test(cpf);
  }

  static validarMatricula(matricula: string): boolean {
    return matricula.length === 7 && /^\d+$/.test(matricula);
  }

  static getStatusPlanoTrabalhoTexto(status: StatusPlanoTrabalho): string {
    switch (status) {
      case StatusPlanoTrabalho.CANCELADO: return 'Cancelado';
      case StatusPlanoTrabalho.APROVADO: return 'Aprovado';
      case StatusPlanoTrabalho.EM_EXECUCAO: return 'Em Execução';
      case StatusPlanoTrabalho.CONCLUIDO: return 'Concluído';
      default: return 'Desconhecido';
    }
  }

  static getModalidadeTexto(modalidade: number): string {
    switch (modalidade) {
      case 1: return 'Presencial';
      case 2: return 'Teletrabalho Parcial';
      case 3: return 'Teletrabalho Integral';
      case 4: return 'Teletrabalho no Exterior (Art. 12, VIII)';
      case 5: return 'Teletrabalho no Exterior (Art. 12, §7°)';
      default: return 'Não Definido';
    }
  }

  static getAvaliacaoTexto(avaliacao: AvaliacaoRegistrosExecucao): string {
    switch (avaliacao) {
      case AvaliacaoRegistrosExecucao.EXCEPCIONAL: return 'Excepcional';
      case AvaliacaoRegistrosExecucao.ALTO_DESEMPENHO: return 'Alto Desempenho';
      case AvaliacaoRegistrosExecucao.ADEQUADO: return 'Adequado';
      case AvaliacaoRegistrosExecucao.INADEQUADO: return 'Inadequado';
      case AvaliacaoRegistrosExecucao.NAO_EXECUTADO: return 'Não Executado';
      default: return 'Não Avaliado';
    }
  }

  static formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
