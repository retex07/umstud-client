export function getRoutePath(
  path: string | string[] | readonly string[],
  basePath = ""
): string | string[] {
  return typeof path === "string"
    ? `${basePath}${path}`
    : path.map((_path) => `${basePath}${_path}`);
}

export function getBasePath(path: string) {
  return path.split("/").slice(0, -1).join("/");
}
