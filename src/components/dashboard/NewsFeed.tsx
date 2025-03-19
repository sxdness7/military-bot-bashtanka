
import React from 'react';
import { FileText, Calendar } from 'lucide-react';

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

const NewsFeed = ({ news }: NewsFeedProps) => {
  return (
    <div className="grid-panel h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 title-font flex items-center gap-2">
        <FileText className="h-5 w-5 text-military-accent" />
        ПОСЛЕДНИЕ НОВОСТИ
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {news.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
