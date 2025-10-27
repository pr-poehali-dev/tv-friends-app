import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const LiveStream = () => {
  const currentProgram = {
    title: 'Утренний эфир',
    description: 'Новости и актуальные темы дня',
    startTime: '06:00',
    endTime: '09:00'
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full bg-black/90">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                <Icon name="Radio" size={40} className="text-red-500" />
              </div>
              <div className="text-center space-y-2">
                <Badge className="bg-red-500 text-white">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  ПРЯМОЙ ЭФИР
                </Badge>
                <p className="text-white/60 text-sm">Видеоплеер загружается...</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-red-500 text-white shadow-lg">
            <Icon name="Radio" size={14} className="mr-1" />
            В ЭФИРЕ
          </Badge>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{currentProgram.title}</h3>
          <p className="text-muted-foreground">{currentProgram.description}</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={16} />
            <span>{currentProgram.startTime} - {currentProgram.endTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Users" size={16} />
            <span>1,234 зрителя</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveStream;
