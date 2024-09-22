const MAX_FILE_NAME_LENGTH = 20;

const truncateFileName = (fileName: string) => {
  if (fileName.length > MAX_FILE_NAME_LENGTH) {
    return fileName.slice(0, MAX_FILE_NAME_LENGTH) + '...';
  }
  return fileName;
};

export default truncateFileName;