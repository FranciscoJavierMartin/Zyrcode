export function generateRandomID(): string {
  return Date.now() + Math.random().toString(36);
}
