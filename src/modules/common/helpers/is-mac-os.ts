export default function isMacOS(): boolean {
  const userAgent = navigator.userAgent;
  return userAgent.includes('Mac OS');
}
