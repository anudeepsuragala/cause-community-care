
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import CommentSection from './CommentSection';

export interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  likes: number;
  comments: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
  }>;
}

const SocialPost = ({ id, title, description, image, date, likes, comments }: PostProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <article className="card-glass overflow-hidden mb-8 animate-scale-in">
      <div className="relative overflow-hidden">
        <div className={cn(
          "w-full h-60 md:h-80 bg-muted relative overflow-hidden",
          !isImageLoaded && "image-loading"
        )}>
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isImageLoaded ? "image-loaded" : "image-loading",
              "hover:scale-105 transition-transform duration-500"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-white/90 rounded-full shadow-sm backdrop-blur-sm">
            {date}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-1 group",
                liked && "text-primary"
              )}
            >
              <Heart 
                className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110", 
                  liked ? "fill-primary" : "group-hover:fill-primary/10"
                )} 
              />
              <span>{likeCount}</span>
            </button>
            
            <button 
              onClick={toggleComments}
              className="flex items-center space-x-1 group"
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span>{comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-1 group">
              <Share2 className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:text-primary" />
            </button>
          </div>
          
          <button 
            onClick={toggleComments}
            className="text-sm font-medium text-primary hover:underline"
          >
            {showComments ? "Hide Comments" : "View Comments"}
          </button>
        </div>
      </div>
      
      {showComments && (
        <div className="border-t border-border p-6 bg-secondary/50">
          <CommentSection postId={id} comments={comments} />
        </div>
      )}
    </article>
  );
};

export default SocialPost;
