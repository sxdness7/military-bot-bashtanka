
import React, { useState, useEffect } from 'react';
import { FileText, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
};

const fetchCityNews = async (city: string): Promise<NewsItem[]> => {
  try {
    switch (city) {
      case 'Баштанка': {
        // Используем прокси для обхода CORS
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const siteUrl = encodeURIComponent('https://bashtanka.rayon.in.ua/news');
        
        const response = await fetch(`${proxyUrl}${siteUrl}`);
        if (!response.ok) throw new Error('Failed to fetch Bashtanka news');
        
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        const newsItems = Array.from(doc.querySelectorAll('.article-list article'))
          .slice(0, 5)
          .map((article, index) => {
            const title = article.querySelector('.article-title')?.textContent?.trim() || 'Без заголовка';
            const summary = article.querySelector('.article-summary')?.textContent?.trim() || '';
            const dateStr = article.querySelector('.article-date')?.textContent?.trim() || '';
            
            return {
              id: `bashtanka-${index}-${Date.now()}`,
              title,
              date: dateStr || new Date().toLocaleDateString('ru-RU'),
              source: 'Bashtanka.Rayon',
              summary
            };
          });
          
        return newsItems;
      }
      
      case 'Дублин': {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssUrl = encodeURIComponent('https://www.rte.ie/news/dublin/rss');
        
        const response = await fetch(`${proxyUrl}${rssUrl}`);
        if (!response.ok) throw new Error('Failed to fetch Dublin news');
        
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        return Array.from(items).slice(0, 5).map((item, index) => ({
          id: `dublin-${index}-${Date.now()}`,
          title: item.querySelector('title')?.textContent || 'No title',
          date: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString('ru-RU'),
          source: 'RTE News',
          summary: item.querySelector('description')?.textContent || 'No description'
        }));
      }
      
      case 'Алматы': {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssUrl = encodeURIComponent('https://tengrinews.kz/kazakhstan_news/rss/');
        
        const response = await fetch(`${proxyUrl}${rssUrl}`);
        if (!response.ok) throw new Error('Failed to fetch Almaty news');
        
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        return Array.from(items)
          .filter(item => item.querySelector('description')?.textContent?.includes('Алматы'))
          .slice(0, 5)
          .map((item, index) => ({
            id: `almaty-${index}-${Date.now()}`,
            title: item.querySelector('title')?.textContent || 'Без заголовка',
            date: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString('ru-RU'),
            source: 'Tengrinews',
            summary: item.querySelector('description')?.textContent || 'Нет описания'
          }));
      }
      
      case 'Белград': {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssUrl = encodeURIComponent('https://www.b92.net/eng/rss/news.xml');
        
        const response = await fetch(`${proxyUrl}${rssUrl}`);
        if (!response.ok) throw new Error('Failed to fetch Belgrade news');
        
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        return Array.from(items).slice(0, 5).map((item, index) => ({
          id: `belgrade-${index}-${Date.now()}`,
          title: item.querySelector('title')?.textContent || 'No title',
          date: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString('ru-RU'),
          source: 'B92',
          summary: item.querySelector('description')?.textContent || 'No description'
        }));
      }
      
      default:
        return [];
    }
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
        const newsItems = await fetchCityNews(city);
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
