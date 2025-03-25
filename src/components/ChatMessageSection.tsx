
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Send, Paperclip, Image, Video, File, X } from 'lucide-react';
import { toast } from 'sonner';
import { sendMessage, ChatMessage, Attachment } from '../services/ChatService';
import { Button } from './ui/button';

interface ChatMessageSectionProps {
  groupId: string;
  messages: ChatMessage[];
  currentUserId: string | undefined;
}

const ChatMessageSection = ({ groupId, messages, currentUserId }: ChatMessageSectionProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() && !attachments.length) return;
    
    try {
      await sendMessage(groupId, newMessage, attachments);
      setNewMessage('');
      setAttachments([]);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Function to render message attachments
  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="relative rounded-md overflow-hidden">
            <img 
              src={attachment.url} 
              alt={attachment.name} 
              className="max-h-40 object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
              {attachment.name}
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative rounded-md overflow-hidden bg-gray-100 p-2">
            <Video className="text-primary h-8 w-8 mb-1" />
            <a 
              href={attachment.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline truncate block"
            >
              {attachment.name}
            </a>
          </div>
        );
      case 'document':
        return (
          <div className="relative rounded-md overflow-hidden bg-gray-100 p-2">
            <File className="text-primary h-8 w-8 mb-1" />
            <a 
              href={attachment.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline truncate block"
            >
              {attachment.name}
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-slide-up h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderId === currentUserId
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-secondary rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium ${message.senderId === currentUserId ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {message.senderName}
                </span>
                <span className={`text-xs ${message.senderId === currentUserId ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.text && <p className="text-sm mb-2">{message.text}</p>}
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="flex flex-col">
                      {renderAttachment(attachment)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      
      {/* Upload preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t">
          <p className="text-xs font-medium mb-2">Attachments:</p>
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="relative bg-secondary rounded-md p-2 flex items-center">
                <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="ml-1 text-muted-foreground hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmitMessage} className="p-4 border-t mt-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            multiple 
          />
          <Button 
            type="button"
            variant="outline"
            size="icon"
            onClick={triggerFileInput}
            className="h-10 w-10"
          >
            <Paperclip size={16} />
          </Button>
          <Button 
            type="submit"
            className="button-primary h-10 px-3 w-10"
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageSection;
