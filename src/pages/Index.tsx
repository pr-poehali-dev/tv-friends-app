import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Schedule from '@/components/Schedule';
import Archive from '@/components/Archive';
import LiveStream from '@/components/LiveStream';
import Trailers from '@/components/Trailers';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="live">Прямой эфир</TabsTrigger>
            <TabsTrigger value="trailers">Тизеры</TabsTrigger>
            <TabsTrigger value="schedule">Программа</TabsTrigger>
            <TabsTrigger value="archive">Архив</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live">
            <LiveStream />
          </TabsContent>
          
          <TabsContent value="trailers">
            <Trailers />
          </TabsContent>
          
          <TabsContent value="schedule">
            <Schedule />
          </TabsContent>
          
          <TabsContent value="archive">
            <Archive />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;