export interface Project {
  id: string; // Firestore document IDs are strings
  title: string;
  description: string;
  youtubeVideoId: string;
  isPublic: boolean;
  createdAt: number; // To sort by creation time
}

export interface AppUser {
  uid: string;
  name: string | null;
  email: string | null;
  picture: string | null;
  given_name: string | null;
}
