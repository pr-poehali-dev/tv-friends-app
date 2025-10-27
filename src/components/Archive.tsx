import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Episode {
  number: number;
  title: string;
  description: string;
  duration: string;
}

interface Show {
  id: string;
  title: string;
  description: string;
  totalSeasons?: number;
  episodes: Episode[];
  category: string;
}

const archiveShows: Show[] = [
  {
    id: 'bolshoi-futbol',
    title: 'Большой футбол',
    description: 'Уникальное реалити-шоу о футболе с 9 захватывающими выпусками',
    category: 'Спорт',
    episodes: [
      { number: 1, title: 'Выпуск 1', description: 'Начало пути. Знакомство с участниками', duration: '45 мин' },
      { number: 2, title: 'Выпуск 2', description: 'Первые испытания на поле', duration: '45 мин' },
      { number: 3, title: 'Выпуск 3', description: 'Формирование команд', duration: '45 мин' },
      { number: 4, title: 'Выпуск 4', description: 'Групповой этап - начало', duration: '50 мин' },
      { number: 5, title: 'Выпуск 5', description: 'Групповой этап - продолжение', duration: '50 мин' },
      { number: 6, title: 'Выпуск 6', description: 'Групповой этап - финал', duration: '50 мин' },
      { number: 7, title: 'Выпуск 7 - Полуфинал 1', description: 'Первая полуфинальная игра', duration: '60 мин' },
      { number: 8, title: 'Выпуск 8 - Полуфинал 2', description: 'Вторая полуфинальная игра', duration: '60 мин' },
      { number: 9, title: 'Выпуск 9 - Финал', description: 'Грандиозный финал реалити-шоу', duration: '90 мин' }
    ]
  },
  {
    id: 'vkusnyashnaya-gonka',
    title: 'Вкусняшная гонка',
    description: 'Популярное кулинарное шоу - все 31 сезон',
    totalSeasons: 31,
    category: 'Развлечения',
    episodes: Array.from({ length: 31 }, (_, i) => ({
      number: i + 1,
      title: `Сезон ${i + 1}`,
      description: `Захватывающие кулинарные баталии сезона ${i + 1}`,
      duration: '40-50 мин'
    }))
  },
  {
    id: 'travel-show',
    title: 'Travel Show: Поехали в город',
    description: 'Путешествия по городам с Максимом Зуевым',
    category: 'Путешествия',
    episodes: [
      { number: 1, title: 'Сезон 1 - Города России', description: 'Путешествие по российским городам', duration: '30 мин' },
      { number: 2, title: 'Сезон 2 - Международный тур', description: 'Европа, Азия и другие континенты', duration: '35 мин' },
      { number: 3, title: 'Сезон 3 - Россия и мир', description: 'Микс российских городов и международных направлений', duration: '35 мин' },
      { number: 4, title: 'Сезон 4 - Выпуск 1: Байкал', description: 'Максим Зуев отправляется к жемчужине Сибири - озеру Байкал. Невероятные пейзажи, местная культура и уникальная природа', duration: '45 мин 49 сек' }
    ]
  }
];

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<{ title: string; description: string } | null>(null);

  const categories = Array.from(new Set(archiveShows.map(show => show.category)));

  const filteredShows = archiveShows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         show.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || show.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Архив передач</h2>
        <p className="text-muted-foreground">Все выпуски наших популярных шоу</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск передач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            size="sm"
          >
            Все
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredShows.map((show) => (
          <Card key={show.id} className="overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{show.title}</h3>
                    <Badge variant="secondary">{show.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{show.description}</p>
                  {show.totalSeasons && (
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Film" size={16} className="inline mr-1" />
                      {show.totalSeasons} сезонов
                    </p>
                  )}
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="episodes" className="border-none">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-sm font-medium">
                      Смотреть все выпуски ({show.episodes.length})
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 mt-4">
                      {show.episodes.map((episode) => (
                        <div
                          key={episode.number}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedEpisode({ title: episode.title, description: episode.description })}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon name="Play" size={24} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{episode.title}</h4>
                              <p className="text-sm text-muted-foreground">{episode.description}</p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Icon name="Clock" size={16} />
                            {episode.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>
        ))}
      </div>

      {filteredShows.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Передачи не найдены</p>
        </div>
      )}

      {selectedEpisode && (
        <VideoPlayer
          isOpen={!!selectedEpisode}
          onClose={() => setSelectedEpisode(null)}
          title={selectedEpisode.title}
          description={selectedEpisode.description}
        />
      )}
    </div>
  );
};

export default Archive;