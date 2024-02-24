export const formatDate = (dateString) => {
  if (!dateString) return null; // Return null or a default string if the date is null
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
