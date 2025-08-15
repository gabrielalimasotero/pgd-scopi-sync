/**
 * Serviço de API PGD integrado com dados do IFPE
 * Simula integração real com sistema PGD e SCOPI
 * 
 * Projeto: Sistema de Integração PGD-SCOPI - IFPE
 * Equipe: Victoria Luquet, Victor Silva, Vituriano Xisto, Tiago Lima, Gabriela Lima
 */

import {
  APIPGDResponse,
  DashboardPGD,
  Participante,
  PlanoTrabalho,
  PlanoEntregas,
  SincronizacaoStatus,
  MapeamentoPGDSCOPI,
  RelatorioIFPE,
  PGDUtils
} from '../types/pgd-api';

import ifpeData from '../data/ifpe-mock-data';

export class PGDIFPEService {
  private baseURL = 'https://api.ifpe.edu.br/pgd'; // URL hipotética
  private scopiURL = 'https://scopi.ifpe.edu.br/api'; // URL hipotética
  
  // Simula latência de rede
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ===== ENDPOINTS PARTICIPANTES =====
  
  async getParticipantes(filtros?: {
    unidade?: number;
    modalidade?: number;
    status?: number;
  }): Promise<APIPGDResponse<Participante[]>> {
    await this.delay();
    
    let participantes = ifpeData.participantes;
    
    // Aplicar filtros
    if (filtros?.unidade) {
      participantes = participantes.filter(p => p.cod_unidade_lotacao === filtros.unidade);
    }
    if (filtros?.modalidade) {
      participantes = participantes.filter(p => p.modalidade_execucao === filtros.modalidade);
    }
    if (filtros?.status !== undefined) {
      participantes = participantes.filter(p => p.situacao === filtros.status);
    }

    return {
      success: true,
      data: participantes,
      metadata: {
        total_records: participantes.length,
        page: 1,
        per_page: 100,
        total_pages: 1
      }
    };
  }

  async getParticipantePorCPF(cpf: string): Promise<APIPGDResponse<Participante | null>> {
    await this.delay();
    
    const participante = ifpeData.participantes.find(p => p.cpf === cpf);
    
    return {
      success: true,
      data: participante || null
    };
  }

  // ===== ENDPOINTS PLANOS DE TRABALHO =====
  
  async getPlanosTrabalho(filtros?: {
    status?: number;
    unidade?: number;
    cpf?: string;
    periodo?: { inicio: string; fim: string };
  }): Promise<APIPGDResponse<PlanoTrabalho[]>> {
    await this.delay();
    
    let planos = ifpeData.planosTrabalho;
    
    if (filtros?.status) {
      planos = planos.filter(p => p.status === filtros.status);
    }
    if (filtros?.unidade) {
      planos = planos.filter(p => p.cod_unidade_executora === filtros.unidade);
    }
    if (filtros?.cpf) {
      planos = planos.filter(p => p.cpf_participante === filtros.cpf);
    }

    return {
      success: true,
      data: planos,
      metadata: {
        total_records: planos.length,
        page: 1,
        per_page: 100,
        total_pages: 1
      }
    };
  }

  // ===== ENDPOINTS PLANOS DE ENTREGAS =====
  
  async getPlanosEntregas(filtros?: {
    status?: number;
    unidade?: number;
  }): Promise<APIPGDResponse<PlanoEntregas[]>> {
    await this.delay();
    
    let planos = ifpeData.planosEntregas;
    
    if (filtros?.status) {
      planos = planos.filter(p => p.status === filtros.status);
    }
    if (filtros?.unidade) {
      planos = planos.filter(p => p.cod_unidade_executora === filtros.unidade);
    }

    return {
      success: true,
      data: planos,
      metadata: {
        total_records: planos.length,
        page: 1,
        per_page: 100,
        total_pages: 1
      }
    };
  }

  // ===== DASHBOARD CONSOLIDADO =====
  
  async getDashboardConsolidado(): Promise<APIPGDResponse<DashboardPGD>> {
    await this.delay();
    
    return {
      success: true,
      data: ifpeData.dashboard
    };
  }

  async getDashboardPorUnidade(codigoUnidade: number): Promise<APIPGDResponse<any>> {
    await this.delay();
    
    const unidade = ifpeData.unidades.find(u => u.codigo === codigoUnidade);
    if (!unidade) {
      return {
        success: false,
        errors: [{ field: 'codigo_unidade', message: 'Unidade não encontrada', code: 'NOT_FOUND' }]
      };
    }

    // Calcular métricas específicas da unidade
    const participantesUnidade = ifpeData.participantes.filter(p => p.cod_unidade_lotacao === codigoUnidade);
    const planosUnidade = ifpeData.planosTrabalho.filter(p => p.cod_unidade_executora === codigoUnidade);
    
    const dashboard = {
      unidade,
      participantes: {
        total: participantesUnidade.length,
        ativos: participantesUnidade.filter(p => p.situacao === 1).length,
        por_modalidade: {
          presencial: participantesUnidade.filter(p => p.modalidade_execucao === 1).length,
          teletrabalho_parcial: participantesUnidade.filter(p => p.modalidade_execucao === 2).length,
          teletrabalho_integral: participantesUnidade.filter(p => p.modalidade_execucao === 3).length,
        }
      },
      planos_trabalho: {
        total: planosUnidade.length,
        ativos: planosUnidade.filter(p => p.status === 3).length,
        concluidos: planosUnidade.filter(p => p.status === 4).length,
      },
      metricas_especificas: ifpeData.graficos.eficienciaPorCampus.find(c => 
        c.campus.toLowerCase().includes(unidade.nome.toLowerCase())
      )
    };

    return {
      success: true,
      data: dashboard
    };
  }

  // ===== SINCRONIZAÇÃO PGD-SCOPI =====
  
  async sincronizarComSCOPI(unidades?: number[]): Promise<APIPGDResponse<SincronizacaoStatus>> {
    await this.delay(2000); // Simula processo mais demorado
    
    const unidadesSincronizadas = unidades || ifpeData.unidades.map(u => u.codigo);
    const totalRegistros = ifpeData.planosTrabalho.length + ifpeData.planosEntregas.length;
    
    // Sistema totalmente sincronizado
    const errosSimulados = 0; // 0% de erro
    
    const status: SincronizacaoStatus = {
      timestamp: new Date().toISOString(),
      registros_processados: totalRegistros,
      registros_com_erro: errosSimulados,
      registros_sincronizados: totalRegistros - errosSimulados,
      tempo_processamento_ms: 1850,
      proxima_sincronizacao: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // +4h
      unidades_sincronizadas: unidadesSincronizadas.length,
      setores_com_pendencias: errosSimulados > 0 ? ['TI-001', 'RH-001'] : []
    };

    return {
      success: true,
      data: status
    };
  }

  async getMapeamentoPGDSCOPI(): Promise<APIPGDResponse<MapeamentoPGDSCOPI[]>> {
    await this.delay();
    
    // Simula mapeamento entre atividades PGD e projetos SCOPI
    const mapeamentos: MapeamentoPGDSCOPI[] = ifpeData.planosTrabalho.map((plano, index) => ({
      id_plano_trabalho: plano.id_plano_trabalho,
      id_contribuicao: plano.contribuicoes[0]?.id_contribuicao || 'N/A',
      scopi_projeto_id: `SCOPI-PROJ-${String(index + 1).padStart(3, '0')}`,
      scopi_atividade_id: `SCOPI-ATV-${String(index + 1).padStart(3, '0')}`,
      peso_contribuicao: Math.random() * 0.3 + 0.7, // 0.7 a 1.0
      status_sincronizacao: 'sincronizado',
      data_ultima_sincronizacao: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      observacoes: Math.random() > 0.8 ? 'Requer validação manual' : undefined
    }));

    return {
      success: true,
      data: mapeamentos
    };
  }

  // ===== RELATÓRIOS ESPECÍFICOS IFPE =====
  
  async getRelatorioIFPE(opcoes: {
    periodo: { inicio: string; fim: string };
    unidade?: number;
    formato?: 'json' | 'pdf' | 'excel';
  }): Promise<APIPGDResponse<RelatorioIFPE>> {
    await this.delay(1500);
    
    const unidade = opcoes.unidade 
      ? ifpeData.unidades.find(u => u.codigo === opcoes.unidade)
      : ifpeData.unidades[0]; // Reitoria como padrão
    
    if (!unidade) {
      return {
        success: false,
        errors: [{ field: 'unidade', message: 'Unidade não encontrada', code: 'NOT_FOUND' }]
      };
    }

    const relatorio: RelatorioIFPE = {
      periodo: opcoes.periodo,
      unidade,
      metricas: {
        participantes_ativos: Math.floor(unidade.servidores_ativos * 0.8),
        carga_horaria_planejada: unidade.servidores_ativos * 160,
        carga_horaria_realizada: Math.floor(unidade.servidores_ativos * 160 * 0.92),
        eficiencia_percentual: 92,
        planos_concluidos: Math.floor(unidade.servidores_ativos * 0.6),
        entregas_realizadas: Math.floor(unidade.servidores_ativos * 1.8),
        avaliacao_media: 8.3,
        projetos_pesquisa_contribuicoes: Math.floor(unidade.servidores_ativos * 0.3),
        atividades_ensino_contribuicoes: Math.floor(unidade.servidores_ativos * 0.7),
        atividades_extensao_contribuicoes: Math.floor(unidade.servidores_ativos * 0.4),
        processos_administrativos_contribuicoes: Math.floor(unidade.servidores_ativos * 0.9),
      },
      detalhamento_por_setor: ifpeData.setores
        .filter(s => s.unidade === unidade.codigo)
        .map(setor => ({
          setor,
          participantes: Math.floor(Math.random() * 20 + 10),
          eficiencia_media: Math.floor(Math.random() * 20 + 80),
          contribuicoes_principais: setor.atividades_principais.slice(0, 2)
        }))
    };

    return {
      success: true,
      data: relatorio
    };
  }

  // ===== ALERTAS E NOTIFICAÇÕES =====
  
  async getAlertas(nivel?: 'info' | 'atencao' | 'critico'): Promise<APIPGDResponse<typeof ifpeData.alertas>> {
    await this.delay(200);
    
    let alertas = ifpeData.alertas;
    
    if (nivel) {
      alertas = alertas.filter(a => a.tipo === nivel);
    }

    return {
      success: true,
      data: alertas
    };
  }

  // ===== DADOS PARA GRÁFICOS =====
  
  async getDadosGraficos(tipo: 'evolucao' | 'eficiencia' | 'modalidades' | 'contribuicoes'): Promise<APIPGDResponse<any>> {
    await this.delay(300);
    
    const dadosMap = {
      evolucao: ifpeData.graficos.evolucaoMensal,
      eficiencia: ifpeData.graficos.eficienciaPorCampus,
      modalidades: ifpeData.graficos.distribuicaoModalidades,
      contribuicoes: ifpeData.graficos.contribuicoesPorArea
    };

    return {
      success: true,
      data: dadosMap[tipo]
    };
  }

  // ===== UTILITÁRIOS =====
  
  async validarCPF(cpf: string): Promise<{ valido: boolean; formatado: string }> {
    await this.delay(100);
    
    return {
      valido: PGDUtils.validarCPF(cpf),
      formatado: PGDUtils.formatarCPF(cpf)
    };
  }

  async buscarServidorSIAPE(matricula: string): Promise<APIPGDResponse<any>> {
    await this.delay(800); // Simula consulta externa ao SIAPE
    
    // Simula dados do SIAPE
    const servidor = {
      matricula,
      nome: `Servidor ${matricula}`,
      cargo: 'Técnico Administrativo em Educação',
      unidade_lotacao: 'IFPE - Campus Recife',
      situacao: 'Ativo',
      regime_juridico: 'RJU'
    };

    return {
      success: true,
      data: servidor
    };
  }

  // ===== INFORMAÇÕES DO PROJETO =====
  
  async getInformacoesProjeto(): Promise<APIPGDResponse<typeof ifpeData.projeto>> {
    await this.delay(100);
    
    return {
      success: true,
      data: ifpeData.projeto
    };
  }
}

// Instância singleton do serviço
export const pgdIFPEService = new PGDIFPEService();

// Hook personalizado para React Query
export const usePGDQueries = () => {
  return {
    participantes: (filtros?: Parameters<PGDIFPEService['getParticipantes']>[0]) => 
      pgdIFPEService.getParticipantes(filtros),
    
    planosTrabalho: (filtros?: Parameters<PGDIFPEService['getPlanosTrabalho']>[0]) => 
      pgdIFPEService.getPlanosTrabalho(filtros),
    
    dashboard: () => 
      pgdIFPEService.getDashboardConsolidado(),
    
    sincronizacao: (unidades?: number[]) => 
      pgdIFPEService.sincronizarComSCOPI(unidades),
    
    alertas: (nivel?: Parameters<PGDIFPEService['getAlertas']>[0]) => 
      pgdIFPEService.getAlertas(nivel),
      
    graficos: (tipo: Parameters<PGDIFPEService['getDadosGraficos']>[0]) => 
      pgdIFPEService.getDadosGraficos(tipo)
  };
};

export default pgdIFPEService;
