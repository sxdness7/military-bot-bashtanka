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

const NEWS_API_KEY = '241ca959ec114710896f74a50c9df9c4';

const fetchRealNews = async (city: string): Promise<NewsItem[]> => {
  const query = `${city} AND Ukraine`;
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=ru&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('News API error');
  }

  const data = await response.json();
  return data.articles.slice(0, 5).map((article: any, index: number) => ({
    id: `${index}-${Date.now()}`,
    title: article.title,
    date: new Date(article.publishedAt).toLocaleDateString('ru-RU'),
    source: article.source.name,
    summary: article.description || article.content?.slice(0, 200) || 'Нет описания'
  }));
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