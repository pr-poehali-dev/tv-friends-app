import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Schedule from '@/components/Schedule';
import Archive from '@/components/Archive';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="schedule">Телепрограмма</TabsTrigger>
            <TabsTrigger value="archive">Архив передач</TabsTrigger>
          </TabsList>
          
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
