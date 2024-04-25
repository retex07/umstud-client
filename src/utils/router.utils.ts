export function getRoutePath(
  path: string | string[] | readonly string[],
  basePath = ""
): string | string[] {
  return typeof path === "string"
    ? `${basePath}${path}`
    : path.map((_path) => `${basePath}${_path}`);
}

export function getBasePath(path: string | undefined) {
  const locPath = path || "";
  return locPath.split("/").slice(0, -1).join("/");
}
