export function getDraftStorageKey(slug: string, roomId: string) {
  return `${slug}-chats-room-${roomId}`;
}
