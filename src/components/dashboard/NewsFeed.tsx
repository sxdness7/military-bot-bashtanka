import React, { useEffect, useState } from 'react';
import { FileText, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
};

const fetchRealNews = async (city: string): Promise<NewsItem[]> => {
  try {
    // Используем прокси для обхода CORS
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const rssUrl = encodeURIComponent('https://rssexport.rbc.ru/rbcnews/news/30/full.rss');
    
    const response = await fetch(`${proxyUrl}${rssUrl}`);
    if (!response.ok) throw new Error('RSS fetch failed');
    
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    
    return Array.from(items).slice(0, 5).map((item, index) => {
      const title = item.getElementsByTagName('title')[0]?.textContent || 'Без заголовка';
      const description = item.getElementsByTagName('description')[0]?.textContent || 'Нет описания';
      const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || new Date().toUTCString();
      
      return {
        id: `${index}-${Date.now()}`,
        title: title,
        date: new Date(pubDate).toLocaleDateString('ru-RU'),
        source: 'РБК',
        summary: description
      };
    });
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    throw error;
  }
};

const NewsFeed = ({ city = 'Баштанка' }: { city: string }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        console.log(`Fetching news for ${city}`);
        const newsItems = await fetchRealNews(city);
        setNews(newsItems);
      } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        toast({
          title: 'Ошибка',
          description: `Не удалось получить новости для ${city}`,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    getNews();
    const interval = setInterval(getNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  if (loading) {
    return <div>Загрузка новостей...</div>;
  }

  return (
    <div className="grid-panel h-full animate-scanner">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <FileText className="h-5 w-5 text-military-accent" />
        НОВОСТИ - {city}
      </h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border-b border-military-border pb-4">
            <h3 className="font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{item.summary}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {item.date}
              </span>
              <span>{item.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;