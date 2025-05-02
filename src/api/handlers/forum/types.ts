export type Discussion = {
  id: number;
  title: string;
  description: string;
  file?: string;
  created_at?: string;
  status: DiscussionStatusTypes;
  author: ForumCustomUser;
  comments: Comment[];
  resolved_comment: Comment;
};

export type CreateComment = {
  content: string;
  file?: string;
};

export type CreateDiscussion_Body = {
  title: string;
  description: string;
};

export type FormDataUploadFile_Body = {
  file: File;
  type: "chat" | "discussion";
};

export type FormDataUploadFile_Success = {
  file_url: string;
  status: string;
};

export type CreateDiscussion_Response = CreateDiscussion_Body & {
  id: number;
};

type Comment = {
  id: number;
  content: string;
  author: ForumCustomUser;
  created_at: string;
};

export type ForumCustomUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  slug: string;
  photo?: string;
};

export type DiscussionStatusTypes = "open" | "resolved";
