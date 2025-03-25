
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  where,
  getDoc,
  setDoc,
  DocumentData,
  getDocs
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export interface ChatMessage {
  id?: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  attachments?: Attachment[];
  groupId?: string;
}

export interface Attachment {
  type: 'image' | 'document' | 'video';
  url: string;
  name: string;
  size?: number;
}

export interface ChatGroup {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  members: string[];
  lastMessage?: string;
  lastMessageAt?: Date;
}

// Fetch all chat groups
export const fetchChatGroups = async (): Promise<ChatGroup[]> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated');

  const q = query(
    collection(firestore, 'chatGroups'),
    where('members', 'array-contains', currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  const groups: ChatGroup[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    groups.push({
      id: doc.id,
      name: data.name,
      createdBy: data.createdBy,
      createdAt: data.createdAt.toDate(),
      members: data.members,
      lastMessage: data.lastMessage,
      lastMessageAt: data.lastMessageAt?.toDate()
    });
  });

  return groups;
};

// Create a new chat group
export const createChatGroup = async (name: string, memberIds: string[]): Promise<string> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated');

  // Add creator to members if not already included
  if (!memberIds.includes(currentUser.uid)) {
    memberIds.push(currentUser.uid);
  }

  const groupRef = await addDoc(collection(firestore, 'chatGroups'), {
    name,
    createdBy: currentUser.uid,
    createdAt: serverTimestamp(),
    members: memberIds,
  });

  return groupRef.id;
};

// Subscribe to messages for a specific group
export const subscribeToGroupMessages = (
  groupId: string, 
  callback: (messages: ChatMessage[]) => void
) => {
  const q = query(
    collection(firestore, 'chatMessages'),
    where('groupId', '==', groupId),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        text: data.text,
        senderId: data.senderId,
        senderName: data.senderName,
        timestamp: data.timestamp.toDate(),
        attachments: data.attachments || [],
        groupId: data.groupId
      });
    });
    callback(messages);
  });
};

// Send a message to a group
export const sendMessage = async (
  groupId: string, 
  text: string, 
  attachments: File[] = []
): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated');

  const uploadedAttachments: Attachment[] = [];

  // Upload attachments if any
  if (attachments.length > 0) {
    for (const file of attachments) {
      const fileRef = ref(storage, `chat-attachments/${groupId}/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      
      let type: 'image' | 'document' | 'video' = 'document';
      if (file.type.startsWith('image/')) type = 'image';
      if (file.type.startsWith('video/')) type = 'video';
      
      uploadedAttachments.push({
        type,
        url: downloadUrl,
        name: file.name,
        size: file.size
      });
    }
  }

  // Add message to Firestore
  await addDoc(collection(firestore, 'chatMessages'), {
    text,
    senderId: currentUser.uid,
    senderName: currentUser.displayName || 'Anonymous',
    timestamp: serverTimestamp(),
    attachments: uploadedAttachments,
    groupId
  });

  // Update last message in group
  await updateDoc(doc(firestore, 'chatGroups', groupId), {
    lastMessage: text,
    lastMessageAt: serverTimestamp()
  });
};
