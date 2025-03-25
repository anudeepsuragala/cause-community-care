
import React from 'react';
import { ChatUser } from '../contexts/AuthContext';
import { User, Users, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserListProps {
  users: ChatUser[];
  currentUserId?: string;
  onSelectUser: (userId: string) => void;
  onCreateGroup: () => void;
  selectedUserId?: string;
  groups: { id: string; name: string }[];
  onSelectGroup: (groupId: string) => void;
  selectedGroupId?: string;
}

const UserList = ({ 
  users, 
  currentUserId,
  onSelectUser, 
  onCreateGroup,
  selectedUserId,
  groups,
  onSelectGroup,
  selectedGroupId
}: UserListProps) => {
  const filteredUsers = users.filter(user => user.uid !== currentUserId);

  return (
    <div className="w-full h-full bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-medium text-lg">Chats</h3>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <div className="p-3 border-b">
          <button 
            onClick={onCreateGroup}
            className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-secondary text-primary"
          >
            <Users size={18} />
            <span className="text-sm font-medium">Create New Group</span>
          </button>
        </div>
        
        {groups.length > 0 && (
          <div className="p-3">
            <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2">Groups</h4>
            <ul className="space-y-1">
              {groups.map(group => (
                <li key={group.id}>
                  <button
                    onClick={() => onSelectGroup(group.id)}
                    className={cn(
                      "flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-secondary transition-colors",
                      selectedGroupId === group.id && "bg-secondary"
                    )}
                  >
                    <Users size={18} className="text-primary" />
                    <span className="text-sm">{group.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="p-3">
          <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2">Online Users</h4>
          <ul className="space-y-1">
            {filteredUsers
              .filter(user => user.isOnline)
              .map(user => (
                <li key={user.uid}>
                  <button
                    onClick={() => onSelectUser(user.uid)}
                    className={cn(
                      "flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-secondary transition-colors",
                      selectedUserId === user.uid && "bg-secondary"
                    )}
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <UserCircle size={24} className="text-primary" />
                      )}
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <span className="text-sm">{user.displayName || user.email || "Anonymous User"}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
        
        <div className="p-3">
          <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2">Offline Users</h4>
          <ul className="space-y-1">
            {filteredUsers
              .filter(user => !user.isOnline)
              .map(user => (
                <li key={user.uid}>
                  <button
                    onClick={() => onSelectUser(user.uid)}
                    className={cn(
                      "flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-secondary transition-colors",
                      selectedUserId === user.uid && "bg-secondary"
                    )}
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-6 h-6 rounded-full opacity-60"
                        />
                      ) : (
                        <UserCircle size={24} className="text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {user.displayName || user.email || "Anonymous User"}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
