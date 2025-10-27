import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const VideoPlayer = ({ isOpen, onClose, title, description }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying ? (
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full"
                  onClick={() => setIsPlaying(true)}
                >
                  <Icon name="Play" size={32} />
                </Button>
              ) : (
                <div className="text-white text-center space-y-2">
                  <Icon name="Loader2" size={48} className="animate-spin mx-auto" />
                  <p className="text-sm">Видео загружается...</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Icon name="ThumbsUp" size={16} className="mr-2" />
              Нравится
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share2" size={16} className="mr-2" />
              Поделиться
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Скачать
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
