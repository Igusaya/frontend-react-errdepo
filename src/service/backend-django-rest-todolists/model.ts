export interface Profile {
  id: number;
  user_id: number;
  username: string;
  email: string;
  last_login: string;
  image: string;
  description: string;
  modify: string;
}

export interface PutProfile {
  id: number;
  image: string;
  description: string;
}
