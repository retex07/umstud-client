import { Discussion } from "@/api/handlers/forum/types";

export type ForumState = {
  isLoading: boolean;
  discussionList: Discussion[];
  discussions: {
    [key: Discussion["id"]]: Discussion;
  };
};
