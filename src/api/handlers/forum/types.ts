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

export type MarkCommentPut_Body = {
  comment_id: number;
};

export type FormDataUploadFile_Body = {
  file: File;
  type: "chat" | "discussion";
};

export type FormDataUploadFile_Success = {
  file_url: string;
  file_path: string;
  original_filename: string;
  mime_type: string;
  scan_id: number;
  was_deleted: boolean;
  scan_status: UploadFileStatus;
};

export type UploadFileStatus = "safe" | "pending" | "dangerous" | "error";

export type CreateDiscussion_Response = CreateDiscussion_Body & {
  id: number;
};

export type Comment = {
  id: number;
  content: string;
  author: ForumCustomUser;
  created_at: string;
  file?: string;
  file_size?: number;
  formatted_file_size?: string;
  original_filename?: string;
  mime_type?: string;
};

export type ForumCustomUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  slug: string;
  photo?: string;
};

export type ScanResponse = {
  status: UploadFileStatus;
  scan_id: number;
  was_deleted: boolean;
};

export type DiscussionStatusTypes = "open" | "resolved";
