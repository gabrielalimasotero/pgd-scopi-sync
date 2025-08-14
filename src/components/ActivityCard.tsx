import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, TrendingUp, User, Edit3, MessageSquare, BarChart3 } from "lucide-react";

interface ActivityCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed" | "cancelled";
    priority: "low" | "medium" | "high";
    progress: number;
    startDate: string;
    endDate: string;
    responsible: {
      name: string;
      avatar?: string;
    };
    reporter: {
      name: string;
      avatar?: string;
    };
    estimatedHours: number;
    actualHours: number;
    scopiMetrics: {
      efficiency: number;
      quality: number;
      deliveryTime: number;
    };
    comments: number;
  };
  onEdit?: () => void;
  onViewDetails?: () => void;
}

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  in_progress: "bg-info text-info-foreground",
  completed: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export const ActivityCard = ({ activity, onEdit, onViewDetails }: ActivityCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-lg leading-none text-card-foreground line-clamp-2">
              {activity.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {activity.description}
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Badge className={statusColors[activity.status]} variant="secondary">
              {activity.status.replace('_', ' ')}
            </Badge>
            <Badge className={priorityColors[activity.priority]} variant="outline">
              {activity.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{activity.progress}%</span>
          </div>
          <Progress value={activity.progress} className="h-2" />
        </div>

        {/* SCOPI Metrics */}
        <div className="bg-gradient-primary/5 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <BarChart3 size={16} />
            Métricas SCOPI
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="font-semibold text-primary">{activity.scopiMetrics.efficiency}%</div>
              <div className="text-muted-foreground">Eficiência</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-primary">{activity.scopiMetrics.quality}%</div>
              <div className="text-muted-foreground">Qualidade</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-primary">{activity.scopiMetrics.deliveryTime}%</div>
              <div className="text-muted-foreground">Prazo</div>
            </div>
          </div>
        </div>

        {/* Time and dates */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays size={16} />
            <span>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span>{activity.actualHours}h / {activity.estimatedHours}h</span>
          </div>
        </div>

        {/* People */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={activity.responsible.avatar} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {getInitials(activity.responsible.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="text-muted-foreground text-xs">Responsável</div>
              <div className="font-medium">{activity.responsible.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={activity.reporter.avatar} />
              <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                {getInitials(activity.reporter.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="text-muted-foreground text-xs">Relator</div>
              <div className="font-medium">{activity.reporter.name}</div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
          <Edit3 size={16} className="mr-2" />
          Editar
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          <MessageSquare size={16} />
          {activity.comments > 0 && <span className="ml-1">{activity.comments}</span>}
        </Button>
        <Button variant="default" size="sm" onClick={onViewDetails} className="flex-1">
          <TrendingUp size={16} className="mr-2" />
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};