
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Clock, FileText, MessageSquare, Presentation, User } from 'lucide-react';
import ActionButton from '@/components/ActionButton';

// Base interface for all content types
export interface BaseContentItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  category: string;
}

// Specific content type interfaces
export interface VideoItem extends BaseContentItem {
  duration: string;
  author: string;
}

export interface TedTalkItem extends BaseContentItem {
  speaker: string;
  duration: string;
}

export interface ArticleItem extends BaseContentItem {
  author: string;
  readTime: string;
}

export interface PostItem extends BaseContentItem {
  author: string;
  excerpt: string;
}

// Union type for all content types
export type ContentItem = VideoItem | TedTalkItem | ArticleItem | PostItem;

// Type guard functions to help TypeScript determine the correct type
export function isVideoItem(item: ContentItem): item is VideoItem {
  return 'duration' in item && 'author' in item && !('speaker' in item);
}

export function isTedTalkItem(item: ContentItem): item is TedTalkItem {
  return 'duration' in item && 'speaker' in item;
}

export function isArticleItem(item: ContentItem): item is ArticleItem {
  return 'readTime' in item && 'author' in item;
}

export function isPostItem(item: ContentItem): item is PostItem {
  return 'excerpt' in item && 'author' in item;
}

interface ContentLibraryItemProps {
  item: ContentItem;
  type: 'videos' | 'tedTalks' | 'articles' | 'posts';
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
    if (isVideoItem(item)) {
      return (
        <>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{item.duration}</span>
          </div>
        </>
      );
    } else if (isTedTalkItem(item)) {
      return (
        <>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{item.speaker}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{item.duration}</span>
          </div>
        </>
      );
    } else if (isArticleItem(item)) {
      return (
        <>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{item.readTime}</span>
          </div>
        </>
      );
    } else if (isPostItem(item)) {
      return (
        <>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{item.author}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {item.excerpt}
          </p>
        </>
      );
    }
    return null;
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
