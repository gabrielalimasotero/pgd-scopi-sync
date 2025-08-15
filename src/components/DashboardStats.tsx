import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Target,
  Users,
  Calendar
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const productivityData = [
  { month: 'Jan', desempenho: 92, qualidade: 85 },
  { month: 'Fev', desempenho: 94, qualidade: 88 },
  { month: 'Mar', desempenho: 90, qualidade: 82 },
  { month: 'Abr', desempenho: 96, qualidade: 91 },
  { month: 'Mai', desempenho: 93, qualidade: 89 },
  { month: 'Jun', desempenho: 97, qualidade: 93 },
];

const activityStatusData = [
  { name: 'Concluídas', value: 45, color: 'hsl(var(--success))' },
  { name: 'Em Andamento', value: 32, color: 'hsl(var(--info))' },
  { name: 'Pendentes', value: 18, color: 'hsl(var(--warning))' },
  { name: 'Canceladas', value: 5, color: 'hsl(var(--destructive))' },
];

const teamEfficiencyData = [
  { team: 'TI', efficiency: 94 },
  { team: 'RH', efficiency: 88 },
  { team: 'Financeiro', efficiency: 91 },
  { team: 'Acadêmico', efficiency: 87 },
  { team: 'Pesquisa', efficiency: 92 },
];

export const DashboardStats = () => {
  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Painel</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-8%</span> tempo reduzido
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análise Estatísticas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+5%</span> melhoria contínua
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparação de Produtividade */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Análise de Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="desempenho" fill="hsl(var(--primary))" name="Desempenho" radius={4} />
                <Bar dataKey="qualidade" fill="hsl(var(--info))" name="Qualidade" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição de Status das Atividades */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Status do Painel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {activityStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {activityStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eficiência por Equipe */}
      <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Eficiência por Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamEfficiencyData.map((team, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">
                      {team.team.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{team.team}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={team.efficiency} className="w-24 h-2" />
                  <span className="font-medium text-primary w-12 text-right">
                    {team.efficiency}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};