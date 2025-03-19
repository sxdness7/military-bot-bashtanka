
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

// API ключ для NewsAPI
const NEWS_API_KEY = 'PUT_YOUR_VALID_API_KEY_HERE'; // Нужен действующий ключ API

// Получаем настоящие новости из NewsAPI
const fetchRealNews = async (): Promise<NewsItem[]> => {
  try {
    const url = `https://newsapi.org/v2/everything?q=ukraine+OR+баштанка&language=ru&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`;
    
    console.log('Fetching news from NewsAPI');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok' || !data.articles) {
      throw new Error('Invalid response from NewsAPI');
    }
    
    // Преобразуем формат данных NewsAPI в наш формат
    return data.articles.map((article: any, index: number) => {
      const pubDate = new Date(article.publishedAt);
      
      return {
        id: index + 1,
        title: article.title,
        date: `${pubDate.getDate().toString().padStart(2, '0')}.${(pubDate.getMonth() + 1).toString().padStart(2, '0')}.${pubDate.getFullYear()}`,
        source: article.source.name,
        summary: article.description || 'Нет описания'
      };
    });
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    toast({
      title: 'Ошибка новостей',
      description: 'Не удалось получить новости. Пожалуйста, проверьте API ключ.',
      variant: 'destructive',
    });
    
    throw error;
  }
};

// Резервные примеры новостей для Баштанки
const generateMockNews = (): NewsItem[] => {
  const currentDate = new Date();
  
  // Функция для создания даты в прошлом (до 14 дней)
  const getRandomPastDate = () => {
    const daysAgo = Math.floor(Math.random() * 14);
    const date = new Date();
    date.setDate(currentDate.getDate() - daysAgo);
    return date;
  };
  
  // Форматирование даты в формат DD.MM.YYYY
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };
  
  const mockNewsItems: NewsItem[] = [
    {
      id: 1,
      title: 'В Баштанке восстановлено электроснабжение после ремонтных работ',
      date: formatDate(getRandomPastDate()),
      source: 'Баштанка Инфо',
      summary: 'Сегодня в 14:00 было полностью восстановлено электроснабжение города после планового ремонта линий электропередач.'
    },
    {
      id: 2,
      title: 'Местные волонтеры организовали сбор помощи для пострадавших районов',
      date: formatDate(getRandomPastDate()),
      source: 'Общественные новости',
      summary: 'Группа волонтеров из Баштанки организовала сбор гуманитарной помощи для жителей соседних населенных пунктов.'
    },
    {
      id: 3,
      title: 'Открыт новый пункт выдачи питьевой воды в центре города',
      date: formatDate(getRandomPastDate()),
      source: 'Администрация города',
      summary: 'В связи с временными перебоями водоснабжения, на площади открыт пункт выдачи питьевой воды для жителей города.'
    },
    {
      id: 4,
      title: 'Баштанка приняла участие в региональном проекте по развитию инфраструктуры',
      date: formatDate(getRandomPastDate()),
      source: 'Николаевские новости',
      summary: 'Город получил финансирование на ремонт дорог и модернизацию системы водоснабжения в рамках регионального проекта.'
    },
    {
      id: 5,
      title: 'Проведены учения по гражданской обороне для жителей города',
      date: formatDate(getRandomPastDate()),
      source: 'ГСЧС Украины',
      summary: 'В Баштанке прошли учения по действиям населения при чрезвычайных ситуациях. Жители получили практические навыки.'
    },
    {
      id: 6,
      title: 'Местные фермеры начали сезонный сбор урожая',
      date: formatDate(getRandomPastDate()),
      source: 'Аграрный вестник',
      summary: 'Несмотря на сложную ситуацию, фермерские хозяйства Баштанского района приступили к сбору урожая зерновых культур.'
    },
    {
      id: 7,
      title: 'В школах Баштанки возобновили занятия в дистанционном формате',
      date: formatDate(getRandomPastDate()),
      source: 'Департамент образования',
      summary: 'С сегодняшнего дня все школы города перешли на дистанционный формат обучения с использованием онлайн-платформ.'
    }
  ];
  
  // Сортируем новости по дате (от новых к старым)
  mockNewsItems.sort((a, b) => {
    const dateA = a.date.split('.').reverse().join('-');
    const dateB = b.date.split('.').reverse().join('-');
    return dateB.localeCompare(dateA);
  });
  
  return mockNewsItems;
};

// Функция для получения последних новостей
const fetchLatestNews = async (): Promise<NewsItem[]> => {
  try {
    // Пытаемся получить реальные новости
    return await fetchRealNews();
  } catch (error) {
    console.error('Используем резервные новости:', error);
    toast({
      title: 'Информация',
      description: 'Используем резервные новости. Проверьте API ключ.',
      variant: 'default',
    });
    
    // Возвращаем симуляцию новостей в случае ошибки
    return generateMockNews();
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
