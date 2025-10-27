import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';

interface Trailer {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: 'trailer' | 'teaser';
  showName: string;
  category: string;
}

const trailersData: Trailer[] = [
  {
    id: '1',
    title: 'Большой футбол - Финал (трейлер)',
    description: 'Грандиозный финал самого захватывающего футбольного реалити. Кто станет победителем?',
    thumbnail: '🏆',
    type: 'trailer',
    showName: 'Большой футбол',
    category: 'Спорт'
  },
  {
    id: '2',
    title: 'Вкусняшная гонка - Сезон 32 (тизер)',
    description: 'Совсем скоро! Новый сезон легендарного кулинарного шоу с неожиданными поворотами',
    thumbnail: '👨‍🍳',
    type: 'teaser',
    showName: 'Вкусняшная гонка',
    category: 'Развлечения'
  },
  {
    id: '3',
    title: 'Travel Show: Поехали в город - Сезон 4 (трейлер)',
    description: 'Максим Зуев отправляется в новое путешествие по самым удивительным местам планеты',
    thumbnail: '✈️',
    type: 'trailer',
    showName: 'Travel Show',
    category: 'Путешествия'
  },
  {
    id: '4',
    title: 'Большой футбол - Полуфиналы (тизер)',
    description: 'Напряжение достигает пика! Смотрите полуфинальные игры',
    thumbnail: '⚽',
    type: 'teaser',
    showName: 'Большой футбол',
    category: 'Спорт'
  },
  {
    id: '5',
    title: 'Вкусняшная гонка - Лучшие моменты сезона 31',
    description: 'Вспоминаем самые яркие и вкусные моменты прошедшего сезона',
    thumbnail: '🍰',
    type: 'trailer',
    showName: 'Вкусняшная гонка',
    category: 'Развлечения'
  },
  {
    id: '6',
    title: 'Travel Show - Спецвыпуск: Байкал (тизер)',
    description: 'Готовьтесь к незабываемому путешествию к жемчужине Сибири',
    thumbnail: '🏔️',
    type: 'teaser',
    showName: 'Travel Show',
    category: 'Путешествия'
  },
  {
    id: '7',
    title: 'Большой футбол - Знакомство с участниками',
    description: 'Познакомьтесь с героями нового сезона футбольного реалити',
    thumbnail: '🎬',
    type: 'trailer',
    showName: 'Большой футбол',
    category: 'Спорт'
  },
  {
    id: '8',
    title: 'Вкусняшная гонка - Тизер финала сезона 31',
    description: 'Последняя битва! Кто покорит жюри своим кулинарным шедевром?',
    thumbnail: '🔥',
    type: 'teaser',
    showName: 'Вкусняшная гонка',
    category: 'Развлечения'
  }
];

const Trailers = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [filter, setFilter] = useState<'all' | 'trailer' | 'teaser'>('all');

  const filteredTrailers = filter === 'all' 
    ? trailersData 
    : trailersData.filter(t => t.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Тизеры и трейлеры</h2>
        <p className="text-muted-foreground">Анонсы новых выпусков и сезонов наших шоу</p>
      </div>

      <div className="flex gap-2">
        <Badge 
          variant={filter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2"
          onClick={() => setFilter('all')}
        >
          Все
        </Badge>
        <Badge 
          variant={filter === 'trailer' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2"
          onClick={() => setFilter('trailer')}
        >
          <Icon name="Film" size={14} className="mr-1" />
          Трейлеры
        </Badge>
        <Badge 
          variant={filter === 'teaser' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2"
          onClick={() => setFilter('teaser')}
        >
          <Icon name="Sparkles" size={14} className="mr-1" />
          Тизеры
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrailers.map((trailer) => (
          <Card 
            key={trailer.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => setSelectedTrailer(trailer)}
          >
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-6xl">{trailer.thumbnail}</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Play" size={32} className="text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <Badge variant={trailer.type === 'trailer' ? 'default' : 'secondary'}>
                  {trailer.type === 'trailer' ? 'Трейлер' : 'Тизер'}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-background/80 backdrop-blur">
                  {trailer.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <Icon name="Tv" size={16} className="text-primary mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold leading-tight mb-1">{trailer.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{trailer.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <Icon name="Video" size={14} />
                <span>{trailer.showName}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedTrailer && (
        <VideoPlayer
          isOpen={!!selectedTrailer}
          onClose={() => setSelectedTrailer(null)}
          title={selectedTrailer.title}
          description={selectedTrailer.description}
        />
      )}
    </div>
  );
};

export default Trailers;
