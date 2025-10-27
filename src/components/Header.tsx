import Icon from '@/components/ui/icon';

const Header = () => {
  const currentTime = new Date().toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <header className="sticky top-0 z-50 bg-card border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Tv" size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Новые друзья ТВ</h1>
              <p className="text-sm text-muted-foreground">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
