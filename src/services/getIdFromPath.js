const getIdFromPath = (url) => {
    if (url) {
      const match = url.match(/\/(\d+)$/);
      return match ? match[1] : null;
    } else {
      return null;
    }
};
  
export default getIdFromPath;