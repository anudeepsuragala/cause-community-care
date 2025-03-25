
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserList from '../components/UserList';
import ChatMessageSection from '../components/ChatMessageSection';
import CreateGroupDialog from '../components/CreateGroupDialog';
import { fetchChatGroups, subscribeToGroupMessages, ChatMessage, ChatGroup } from '../services/ChatService';
import { toast } from 'sonner';

const Chat = () => {
  const { currentUser, allUsers } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial chat groups
  useEffect(() => {
    const loadGroups = async () => {
      try {
        if (currentUser) {
          const chatGroups = await fetchChatGroups();
          setGroups(chatGroups);
        }
      } catch (error) {
        console.error('Error loading chat groups:', error);
        toast.error('Failed to load chat groups');
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, [currentUser]);

  // Subscribe to messages when a group is selected
  useEffect(() => {
    if (!selectedGroupId) {
      setMessages([]);
      return;
    }

    const unsubscribe = subscribeToGroupMessages(selectedGroupId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [selectedGroupId]);

  const handleSelectUser = (userId: string) => {
    // When selecting a user, we need to find or create a direct message group
    // For simplicity, we'll just select the user for now
    setSelectedUserId(userId);
    setSelectedGroupId(undefined);
    // In a real app, you would create a direct message group or find an existing one
  };

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setSelectedUserId(undefined);
  };

  const handleCreateGroup = () => {
    setIsCreateGroupOpen(true);
  };

  const handleGroupCreated = async (groupId: string) => {
    try {
      const chatGroups = await fetchChatGroups();
      setGroups(chatGroups);
      setSelectedGroupId(groupId);
      setSelectedUserId(undefined);
    } catch (error) {
      console.error('Error refreshing chat groups:', error);
    }
  };

  useEffect(() => {
    document.title = 'Social Cause - Chat';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-3">
            Chat with Others
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Social Cause Chat</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with other users, share documents, videos, and create group discussions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-240px)]">
            <div className="col-span-1 border-r">
              <UserList 
                users={allUsers}
                currentUserId={currentUser?.uid}
                onSelectUser={handleSelectUser}
                onCreateGroup={handleCreateGroup}
                selectedUserId={selectedUserId}
                groups={groups.map(g => ({ id: g.id, name: g.name }))}
                onSelectGroup={handleSelectGroup}
                selectedGroupId={selectedGroupId}
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              {selectedGroupId ? (
                <ChatMessageSection 
                  groupId={selectedGroupId}
                  messages={messages}
                  currentUserId={currentUser?.uid}
                />
              ) : selectedUserId ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    Direct messaging is not implemented in this demo.
                    Please select or create a group chat.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-md p-6">
                    <h3 className="text-xl font-medium mb-2">Welcome to Social Cause Chat</h3>
                    <p className="text-muted-foreground mb-4">
                      Select a group chat from the sidebar or create a new one to start messaging.
                    </p>
                    <button
                      onClick={handleCreateGroup}
                      className="button-primary"
                    >
                      Create New Group
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <CreateGroupDialog 
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        users={allUsers}
        currentUserId={currentUser?.uid}
        onGroupCreated={handleGroupCreated}
      />
    </div>
  );
};

export default Chat;
