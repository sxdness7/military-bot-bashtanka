
import React, { useEffect, useState } from 'react';
import { FileText, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type NewsItem = {
  id: number;
  title: string;
  date: string;
  source: string;
  summary: string;
};

type NewsFeedProps = {
  news: NewsItem[];
};

// Функция для получения последних новостей
const fetchLatestNews = async (): Promise<NewsItem[]> => {
  try {
    // Запрос для получения новостей об Украине
    const apiKey = '8c3d5bcf2b1a4773b7a25b58e14ae800'; // Публичный ключ для демонстрации
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=ukraine+OR+баштанка&language=ru&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Не удалось получить последние новости');
    }
    
    const data = await response.json();
    
    // Преобразуем данные из API в нужный формат
    const newsItems: NewsItem[] = data.articles.map((article: any, index: number) => {
      const publishedDate = new Date(article.publishedAt);
      const formattedDate = `${publishedDate.getDate().toString().padStart(2, '0')}.${(publishedDate.getMonth() + 1).toString().padStart(2, '0')}.${publishedDate.getFullYear()}`;
      
      return {
        id: index + 1,
        title: article.title,
        date: formattedDate,
        source: article.source.name,
        summary: article.description || 'Нет описания'
      };
    });
    
    return newsItems;
  } catch (error) {
    console.error('Ошибка при получении последних новостей:', error);
    toast({
      title: 'Ошибка',
      description: 'Не удалось получить актуальные новости',
      variant: 'destructive',
    });
    
    // Возвращаем резервные данные при ошибке
    return [
      {
        id: 1,
        title: 'Ошибка при загрузке последних новостей',
        date: new Date().toLocaleDateString('ru-RU'),
        source: 'Система',
        summary: 'Не удалось получить актуальные новости. Пожалуйста, попробуйте позже.'
      }
    ];
  }
};

const NewsFeed = ({ news }: NewsFeedProps) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(news);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Получаем актуальные новости при загрузке компонента
    const getLatestNews = async () => {
      setLoading(true);
      try {
        const items = await fetchLatestNews();
        setNewsItems(items);
      } finally {
        setLoading(false);
      }
    };
    
    getLatestNews();
    
    // Обновляем новости каждый час
    const interval = setInterval(getLatestNews, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid-panel h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <FileText className="h-5 w-5 text-military-accent" />
        ПОСЛЕДНИЕ НОВОСТИ
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="military-loader">Загрузка...</div>
          </div>
        ) : (
          newsItems.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-3 military-panel hover:border-military-accent/60 transition-all duration-300"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              
              <div className="flex items-center gap-2 text-xs text-military-accent mt-1 mb-2">
                <Calendar className="h-3 w-3" />
                <span>{item.date}</span>
                <span className="text-gray-400">| {item.source}</span>
              </div>
              
              <p className="text-sm text-gray-300">{item.summary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
