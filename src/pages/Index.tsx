import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Program {
  id: string;
  title: string;
  description: string;
  time: string;
  duration: number;
  category: string;
  isLive?: boolean;
}

interface DaySchedule {
  date: string;
  dayName: string;
  programs: Program[];
}

const MOCK_SCHEDULE: DaySchedule[] = [
  {
    date: '2025-10-27',
    dayName: 'Сегодня',
    programs: [
      { id: '1', title: 'Утренний эфир', description: 'Новости, погода, события дня', time: '06:00', duration: 180, category: 'Новости', isLive: true },
      { id: '2', title: 'Мультфильмы', description: 'Любимые персонажи для детей', time: '09:00', duration: 60, category: 'Детское' },
      { id: '3', title: 'Документальный фильм', description: 'Дикая природа Африки', time: '10:00', duration: 90, category: 'Документальное' },
      { id: '4', title: 'Кулинарное шоу', description: 'Готовим вместе с шеф-поваром', time: '11:30', duration: 60, category: 'Развлечения' },
      { id: '5', title: 'Новости дня', description: 'Главные события', time: '12:30', duration: 30, category: 'Новости' },
      { id: '6', title: 'Сериал "Друзья"', description: 'Комедийный сериал, сезон 3', time: '13:00', duration: 120, category: 'Сериалы' },
      { id: '7', title: 'Спортивная передача', description: 'Обзор спортивных событий', time: '15:00', duration: 60, category: 'Спорт' },
      { id: '8', title: 'Вечерний эфир', description: 'Новости и ток-шоу', time: '18:00', duration: 120, category: 'Новости' },
      { id: '9', title: 'Кино', description: 'Художественный фильм "Побег"', time: '20:00', duration: 120, category: 'Фильмы' },
      { id: '10', title: 'Ночное кино', description: 'Триллер "Тайна"', time: '22:00', duration: 120, category: 'Фильмы' }
    ]
  },
  {
    date: '2025-10-28',
    dayName: 'Завтра',
    programs: [
      { id: '11', title: 'Утренний эфир', description: 'Новости, погода, события дня', time: '06:00', duration: 180, category: 'Новости' },
      { id: '12', title: 'Познавательная передача', description: 'Наука и технологии', time: '09:00', duration: 60, category: 'Образование' },
      { id: '13', title: 'Ток-шоу', description: 'Обсуждаем актуальные темы', time: '10:00', duration: 90, category: 'Развлечения' },
      { id: '14', title: 'Фитнес с тренером', description: 'Утренняя зарядка', time: '11:30', duration: 30, category: 'Здоровье' },
      { id: '15', title: 'Новости дня', description: 'Главные события', time: '12:00', duration: 30, category: 'Новости' },
      { id: '16', title: 'Сериал "Новые друзья"', description: 'Драматический сериал, эпизод 5', time: '12:30', duration: 120, category: 'Сериалы' },
      { id: '17', title: 'Музыкальное шоу', description: 'Концерт популярных исполнителей', time: '14:30', duration: 90, category: 'Музыка' },
      { id: '18', title: 'Вечерний эфир', description: 'Новости и аналитика', time: '18:00', duration: 120, category: 'Новости' },
      { id: '19', title: 'Комедия', description: 'Фильм "Смешная история"', time: '20:00', duration: 120, category: 'Фильмы' },
      { id: '20', title: 'Ночное шоу', description: 'Интервью с гостями', time: '22:00', duration: 90, category: 'Развлечения' }
    ]
  }
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Новости': 'bg-blue-500',
    'Детское': 'bg-pink-500',
    'Документальное': 'bg-green-500',
    'Развлечения': 'bg-purple-500',
    'Сериалы': 'bg-orange-500',
    'Спорт': 'bg-red-500',
    'Фильмы': 'bg-indigo-500',
    'Образование': 'bg-teal-500',
    'Здоровье': 'bg-emerald-500',
    'Музыка': 'bg-fuchsia-500'
  };
  return colors[category] || 'bg-gray-500';
};

export default function Index() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (programId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(programId)) {
        newFavorites.delete(programId);
      } else {
        newFavorites.add(programId);
      }
      return newFavorites;
    });
  };

  const getCurrentLiveProgram = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return MOCK_SCHEDULE[0].programs.find(program => {
      const [hours, minutes] = program.time.split(':').map(Number);
      const programStart = hours * 60 + minutes;
      const programEnd = programStart + program.duration;
      return now >= programStart && now < programEnd;
    });
  };

  const liveProgram = getCurrentLiveProgram();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Tv" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Новые друзья ТВ</h1>
                <p className="text-xs text-white/80">{currentTime.toLocaleTimeString('ru-RU')}</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                <Icon name="Calendar" size={18} className="mr-2" />
                Программа
              </Button>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
              </Button>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                <Icon name="Info" size={18} className="mr-2" />
                О канале
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {liveProgram && (
          <Card className="mb-8 overflow-hidden animate-fade-in bg-gradient-to-r from-primary to-primary/80 text-white border-none">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500 text-white animate-pulse">
                    <Icon name="Radio" size={14} className="mr-1" />
                    В ЭФИРЕ
                  </Badge>
                  <Badge className={`${getCategoryColor(liveProgram.category)} text-white`}>
                    {liveProgram.category}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(liveProgram.id)}
                  className="text-white hover:bg-white/20"
                >
                  <Icon
                    name={favorites.has(liveProgram.id) ? "Heart" : "Heart"}
                    size={20}
                    className={favorites.has(liveProgram.id) ? "fill-current" : ""}
                  />
                </Button>
              </div>
              <h2 className="text-3xl font-bold mb-2">{liveProgram.title}</h2>
              <p className="text-white/90 mb-4">{liveProgram.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  {liveProgram.time}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Timer" size={16} />
                  {liveProgram.duration} мин
                </span>
              </div>
            </div>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            {MOCK_SCHEDULE.map((day, index) => (
              <TabsTrigger key={day.date} value={index === 0 ? 'today' : `day-${index}`}>
                {day.dayName}
              </TabsTrigger>
            ))}
          </TabsList>

          {MOCK_SCHEDULE.map((day, dayIndex) => (
            <TabsContent
              key={day.date}
              value={dayIndex === 0 ? 'today' : `day-${dayIndex}`}
              className="mt-6"
            >
              <div className="grid gap-4">
                {day.programs.map((program, index) => (
                  <Card
                    key={program.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="text-right min-w-[60px]">
                            <div className="text-xl font-bold text-primary">{program.time}</div>
                            <div className="text-xs text-muted-foreground">{program.duration} мин</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{program.title}</h3>
                              {program.isLive && (
                                <Badge className="bg-red-500 text-white text-xs">LIVE</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                            <Badge className={`${getCategoryColor(program.category)} text-white text-xs`}>
                              {program.category}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(program.id)}
                          className="flex-shrink-0"
                        >
                          <Icon
                            name="Heart"
                            size={20}
                            className={favorites.has(program.id) ? "fill-current text-red-500" : "text-muted-foreground"}
                          />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="p-8 bg-secondary/30">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">О телеканале</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              "Новые друзья ТВ" — это современный телеканал, который объединяет людей через качественный контент. 
              Мы показываем лучшие фильмы, сериалы, документальные программы и развлекательные шоу.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold mb-1">Для всей семьи</h3>
              <p className="text-sm text-muted-foreground">Контент для всех возрастов</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold mb-1">24/7 эфир</h3>
              <p className="text-sm text-muted-foreground">Круглосуточное вещание</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Star" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold mb-1">Качество</h3>
              <p className="text-sm text-muted-foreground">HD качество изображения</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h3 className="font-semibold mb-3">Контакты</h3>
            <div className="flex flex-col gap-2 items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <span>info@noviedruzya.tv</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                <span>+7 (495) 123-45-67</span>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <footer className="bg-secondary/50 mt-16 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Новые друзья ТВ. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
