export function stringToPascalCase(str: string) {
  const camelCase = str.replace(/([-_][a-z])/gi, ($1) => { return $1.toUpperCase().replace('-', '').replace('_', ' '); });
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}