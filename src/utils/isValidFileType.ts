export const isValidFileType = (type: string, accept: string): boolean => {
  const validTypes = accept.split(',');
  return validTypes.includes(type);
};
