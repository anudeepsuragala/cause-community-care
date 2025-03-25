
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChatUser } from "../contexts/AuthContext";
import { createChatGroup } from "../services/ChatService";
import { toast } from "sonner";

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  users: ChatUser[];
  currentUserId?: string;
  onGroupCreated: (groupId: string) => void;
}

const CreateGroupDialog = ({
  isOpen,
  onClose,
  users,
  currentUserId,
  onGroupCreated,
}: CreateGroupDialogProps) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const filteredUsers = users.filter((user) => user.uid !== currentUserId);

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
      return;
    }
    
    setIsCreating(true);
    
    try {
      const groupId = await createChatGroup(groupName, selectedUsers);
      toast.success("Group created successfully!");
      onGroupCreated(groupId);
      handleReset();
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };
  
  const handleReset = () => {
    setGroupName("");
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Create a new chat group with selected users.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select Users</Label>
              <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                {filteredUsers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No other users available</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user.uid} className="flex items-center space-x-2">
                      <Checkbox
                        id={`user-${user.uid}`}
                        checked={selectedUsers.includes(user.uid)}
                        onCheckedChange={() => handleUserToggle(user.uid)}
                      />
                      <Label
                        htmlFor={`user-${user.uid}`}
                        className="text-sm cursor-pointer"
                      >
                        {user.displayName || user.email || "Anonymous User"}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || !groupName.trim() || selectedUsers.length === 0}
            >
              {isCreating ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
