import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Program {
  time: string;
  title: string;
  description: string;
  category: string;
}

interface Day {
  date: string;
  programs: Program[];
}

const scheduleData: Day[] = [
  {
    date: '27 октября',
    programs: [
      { time: '06:00', title: 'Утренний эфир', description: 'Новости и актуальные темы дня', category: 'Новости' },
      { time: '09:00', title: 'Вкусняшная гонка', description: 'Кулинарное шоу, сезон 31', category: 'Развлечения' },
      { time: '10:30', title: 'Travel Show: Поехали в город', description: 'Путешествие по городам России', category: 'Путешествия' },
      { time: '12:00', title: 'Большой футбол', description: 'Финал реалити-шоу', category: 'Спорт' },
      { time: '14:00', title: 'Дневные новости', description: 'Главные события', category: 'Новости' },
      { time: '15:00', title: 'Вкусняшная гонка', description: 'Кулинарное шоу, повтор', category: 'Развлечения' },
      { time: '18:00', title: 'Вечерний эфир', description: 'Итоги дня', category: 'Новости' },
      { time: '20:00', title: 'Большой футбол', description: 'Повтор финала', category: 'Спорт' },
      { time: '22:00', title: 'Travel Show: Поехали в город', description: 'Международный тур', category: 'Путешествия' }
    ]
  },
  {
    date: '28 октября',
    programs: [
      { time: '06:00', title: 'Утренний эфир', description: 'Новости и актуальные темы дня', category: 'Новости' },
      { time: '09:00', title: 'Вкусняшная гонка', description: 'Кулинарное шоу, новый эпизод', category: 'Развлечения' },
      { time: '10:30', title: 'Travel Show: Поехали в город', description: 'Путешествие по Европе', category: 'Путешествия' },
      { time: '12:00', title: 'Большой футбол', description: 'Полуфинал, 1 выпуск', category: 'Спорт' },
      { time: '14:00', title: 'Дневные новости', description: 'Главные события', category: 'Новости' },
      { time: '15:00', title: 'Вкусняшная гонка', description: 'Кулинарное шоу, повтор', category: 'Развлечения' },
      { time: '18:00', title: 'Вечерний эфир', description: 'Итоги дня', category: 'Новости' },
      { time: '20:00', title: 'Большой футбол', description: 'Полуфинал, 2 выпуск', category: 'Спорт' },
      { time: '22:00', title: 'Travel Show: Поехали в город', description: 'Россия, города Сибири', category: 'Путешествия' }
    ]
  },
  {
    date: '29 октября',
    programs: [
      { time: '06:00', title: 'Утренний эфир', description: 'Новости и актуальные темы дня', category: 'Новости' },
      { time: '09:00', title: 'Вкусняшная гонка', description: 'Кулинарное шоу', category: 'Развлечения' },
      { time: '10:30', title: 'Travel Show: Поехали в город', description: 'Золотое кольцо России', category: 'Путешествия' },
      { time: '12:00', title: 'Большой футбол', description: 'Групповой этап', category: 'Спорт' },
      { time: '14:00', title: 'Дневные новости', description: 'Главные события', category: 'Новости' },
      { time: '15:00', title: 'Вкусняшная гонка', description: 'Кулинарное шоу', category: 'Развлечения' },
      { time: '18:00', title: 'Вечерний эфир', description: 'Итоги дня', category: 'Новости' },
      { time: '20:00', title: 'Большой футбол', description: 'Лучшие моменты', category: 'Спорт' },
      { time: '22:00', title: 'Travel Show: Поехали в город', description: 'Азия', category: 'Путешествия' }
    ]
  }
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Новости': 'bg-blue-500/10 text-blue-700 border-blue-200',
    'Развлечения': 'bg-purple-500/10 text-purple-700 border-purple-200',
    'Путешествия': 'bg-green-500/10 text-green-700 border-green-200',
    'Спорт': 'bg-red-500/10 text-red-700 border-red-200'
  };
  return colors[category] || 'bg-gray-500/10 text-gray-700 border-gray-200';
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(scheduleData[0].date);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Телепрограмма</h2>
        <p className="text-muted-foreground">Расписание передач на ближайшие дни</p>
      </div>

      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="w-full justify-start">
          {scheduleData.map((day) => (
            <TabsTrigger key={day.date} value={day.date}>
              {day.date}
            </TabsTrigger>
          ))}
        </TabsList>

        {scheduleData.map((day) => (
          <TabsContent key={day.date} value={day.date} className="space-y-4 mt-6">
            {day.programs.map((program, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="text-2xl font-bold text-primary">{program.time}</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold">{program.title}</h3>
                      <Badge variant="outline" className={getCategoryColor(program.category)}>
                        {program.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{program.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Schedule;
