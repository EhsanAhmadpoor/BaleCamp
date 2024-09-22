const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (['svg', 'jpg', 'jpeg', 'png', 'gif'].includes(extension!)) return 'image';
  if (['mp4', 'webm', 'ogg'].includes(extension!)) return 'video';
  if (['pdf'].includes(extension!)) return 'pdf';
  return 'other';
};

export default getFileType;