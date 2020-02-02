import { number } from 'yup';

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

export interface Report {
  id: number;
  created: string;
  modify: string;
  lang: string;
  fw: string;
  env: string;
  errmsg: string;
  description: string;
  correspondence: string;
  descriptionHTML: string;
  correspondenceHTML: string;
  owner_id: number;
  owner: string;
}

export interface ReportList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Report[];
}
