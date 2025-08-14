import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  Download,
  Calendar,
  Zap,
  Award,
  Clock
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const performanceData = [
  { month: 'Jul', pgd: 82, scopi: 88, meta: 85 },
  { month: 'Ago', pgd: 85, scopi: 90, meta: 85 },
  { month: 'Set', pgd: 88, scopi: 92, meta: 85 },
  { month: 'Out', pgd: 87, scopi: 94, meta: 85 },
  { month: 'Nov', pgd: 90, scopi: 95, meta: 85 },
  { month: 'Dez', pgd: 93, scopi: 97, meta: 85 },
];

const departmentMetrics = [
  { name: 'TI', efficiency: 95, quality: 92, delivery: 94 },
  { name: 'RH', efficiency: 88, quality: 90, delivery: 87 },
  { name: 'Financeiro', efficiency: 91, quality: 89, delivery: 92 },
  { name: 'Acadêmico', efficiency: 87, quality: 94, delivery: 85 },
  { name: 'Pesquisa', efficiency: 92, quality: 96, delivery: 90 },
];

const productivityTrend = [
  { week: 'Sem 1', activities: 45, completed: 38, efficiency: 84 },
  { week: 'Sem 2', activities: 52, completed: 47, efficiency: 90 },
  { week: 'Sem 3', activities: 48, completed: 44, efficiency: 92 },
  { week: 'Sem 4', activities: 55, completed: 52, efficiency: 95 },
];

const timeDistribution = [
  { name: 'Planejamento', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Execução', value: 45, color: 'hsl(var(--info))' },
  { name: 'Revisão', value: 20, color: 'hsl(var(--success))' },
  { name: 'Documentação', value: 10, color: 'hsl(var(--warning))' },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Analytics SCOPI
            </h1>
            <p className="text-muted-foreground mt-2">
              Análise avançada de desempenho e métricas de produtividade
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="6months">
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Último mês</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary/10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eficiência Geral</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94.2%</div>
              <p className="text-xs text-success">
                +5.2% vs mês anterior
              </p>
              <Badge className="mt-2 bg-success/10 text-success border-success/20">
                Meta: 85%
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-secondary/20 rounded-full -mr-10 -mt-10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualidade Média</CardTitle>
              <Award className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">92.8%</div>
              <p className="text-xs text-success">
                +3.1% vs mês anterior
              </p>
              <Badge className="mt-2 bg-info/10 text-info border-info/20">
                Excelente
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-success/10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prazo de Entrega</CardTitle>
              <Clock className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">89.5%</div>
              <p className="text-xs text-success">
                +2.8% vs mês anterior
              </p>
              <Badge className="mt-2 bg-success/10 text-success border-success/20">
                No prazo
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-warning/10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtividade</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">127%</div>
              <p className="text-xs text-success">
                +15% vs mês anterior
              </p>
              <Badge className="mt-2 bg-warning/10 text-warning border-warning/20">
                Acima da meta
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Performance Comparison Chart */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Evolução de Performance - PGD vs SCOPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pgd" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="PGD"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="scopi" 
                  stroke="hsl(var(--info))" 
                  strokeWidth={3}
                  name="SCOPI"
                  dot={{ fill: 'hsl(var(--info))', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="meta" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Meta"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Radar Chart */}
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Performance por Departamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={departmentMetrics}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <PolarRadiusAxis 
                    angle={0} 
                    domain={[0, 100]}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar
                    name="Eficiência"
                    dataKey="efficiency"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Qualidade"
                    dataKey="quality"
                    stroke="hsl(var(--info))"
                    fill="hsl(var(--info))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Entrega"
                    dataKey="delivery"
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Time Distribution */}
          <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Distribuição de Tempo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={timeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {timeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {timeDistribution.map((item, index) => (
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

        {/* Productivity Trends */}
        <Card className="shadow-card border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tendência de Produtividade Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="activities" fill="hsl(var(--primary))" name="Atividades" radius={4} />
                <Bar dataKey="completed" fill="hsl(var(--success))" name="Concluídas" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}