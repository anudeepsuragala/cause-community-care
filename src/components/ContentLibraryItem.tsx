
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Clock, FileText, MessageSquare, Presentation, User } from 'lucide-react';
import ActionButton from '@/components/ActionButton';

interface BaseContentItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  category: string;
}

interface VideoItem extends BaseContentItem {
  duration: string;
  author: string;
}

interface TedTalkItem extends BaseContentItem {
  speaker: string;
  duration: string;
}

interface ArticleItem extends BaseContentItem {
  author: string;
  readTime: string;
}

interface PostItem extends BaseContentItem {
  author: string;
  excerpt: string;
}

type ContentItem = VideoItem | TedTalkItem | ArticleItem | PostItem;

interface ContentLibraryItemProps {
  item: ContentItem;
  type: string;
  className?: string;
}

const ContentLibraryItem = ({ item, type, className }: ContentLibraryItemProps) => {
  const renderIcon = () => {
    switch (type) {
      case 'videos':
        return <Video className="w-4 h-4" />;
      case 'tedTalks':
        return <Presentation className="w-4 h-4" />;
      case 'articles':
        return <FileText className="w-4 h-4" />;
      case 'posts':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderMetadata = () => {
    switch (type) {
      case 'videos':
        return (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{(item as VideoItem).author}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{(item as VideoItem).duration}</span>
            </div>
          </>
        );
      case 'tedTalks':
        return (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{(item as TedTalkItem).speaker}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{(item as TedTalkItem).duration}</span>
            </div>
          </>
        );
      case 'articles':
        return (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{(item as ArticleItem).author}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{(item as ArticleItem).readTime}</span>
            </div>
          </>
        );
      case 'posts':
        return (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{(item as PostItem).author}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {(item as PostItem).excerpt}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden h-full transition-all hover:shadow-md", className)}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          {renderIcon()}
          <span className="capitalize">{type === 'tedTalks' ? 'TED Talk' : type.slice(0, -1)}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
        
        <div className="mb-4">
          {renderMetadata()}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-muted-foreground">{item.date}</span>
          
          <ActionButton
            variant="outline"
            label={type === 'articles' ? 'Read' : type === 'posts' ? 'View' : 'Watch'}
            icon={type === 'articles' ? <FileText className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            className="text-xs px-3 py-1 h-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentLibraryItem;
