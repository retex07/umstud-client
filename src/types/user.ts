export type User = {
  id: number;
  firstname: string;
  lastname: string;
  patronymic: string | null;
  avatar: Avatar | null;
};

export type Avatar = {
  path: string;
};
