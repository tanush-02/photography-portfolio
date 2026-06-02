export interface Photo {
  id: string;
  url: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string;
}

// Made with Bob
