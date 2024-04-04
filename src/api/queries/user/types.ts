export interface DetailUserProfile {
  username: string;
  slug: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  email: string;
  phone: string;
  place_study_work: string;
  skills: string[];
  birth_date: Date;
  description?: string;
  language?: string;
  photo: string;
  views: number;
  rating: any; //TODO: Исправить поле API
}
