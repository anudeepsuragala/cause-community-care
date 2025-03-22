
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

const CommentSection = ({ postId, comments: initialComments }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      text: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    toast.success('Comment posted successfully!');
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-lg font-medium mb-4">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button 
            type="submit"
            className="button-primary px-3 w-10"
            disabled={!newComment.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="bg-white rounded-lg p-4 shadow-soft"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
            </div>
            <p className="text-sm">{comment.text}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            Be the first to comment on this post.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
