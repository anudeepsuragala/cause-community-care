
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const Chats = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: '1',
      sender: 'Support Team',
      text: 'Welcome to Social Cause chats! How can we help you today?',
      timestamp: '10:30 AM'
    }
  ]);

  useEffect(() => {
    document.title = 'Social Cause - Chats & Responses';
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const autoResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'Support Team',
        text: 'Thank you for your message. Our team will get back to you soon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, autoResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-3">
            Chats & Responses
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Join the Conversation</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our community, share your thoughts, and get responses from our team and other supporters.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-glass">
            <div className="border-b p-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-primary" />
              <h2 className="font-medium">Community Chat</h2>
            </div>
            
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'You'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-secondary rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${msg.sender === 'You' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {msg.sender}
                      </span>
                      <span className={`text-xs ${msg.sender === 'You' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <button 
                  type="submit"
                  className="button-primary"
                  disabled={!message.trim()}
                >
                  <Send size={16} className="mr-2" />
                  Send
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-secondary rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Help & Support</h3>
            <p className="mb-4 text-muted-foreground">
              If you have any questions or need support, you can also reach us through other channels:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-24 font-medium">Email:</span>
                <a href="mailto:support@socialcause.org" className="text-primary hover:underline">support@socialcause.org</a>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Phone:</span>
                <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Hours:</span>
                <span>Monday-Friday, 9am-5pm EST</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
