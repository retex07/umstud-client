export function getRoutePath(
  path: string | string[] | readonly string[],
  basePath = ""
): string | string[] {
  return typeof path === "string"
    ? `${basePath}${path}`
    : path.map((_path) => `${basePath}${_path}`);
}
