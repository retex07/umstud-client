export function convertSlashLink(
  links: string[] | string,
  splitter = "/"
): string {
  const convert = (link: string): string =>
    link.endsWith(splitter) ? link : link + splitter;
  if (Array.isArray(links)) {
    const convertedLinks = links.map((link) =>
      link.endsWith(splitter) ? link.slice(0, -1) : link
    );
    const result = convertedLinks.join(splitter);
    return result.endsWith(splitter) ? result : result + splitter;
  }

  return convert(links);
}

export function replaceSubstringLink(
  str: string,
  searchValue: string,
  newValue: string
): string {
  const searchRegExp = new RegExp(searchValue, "g");
  return str.replace(searchRegExp, newValue);
}
