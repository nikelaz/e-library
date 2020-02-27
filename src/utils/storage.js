// Used to get the token from the localStorage

export function getFromStorage(key) {
    if (!key) {
      return null;
    }  try {
      const valueStr = localStorage.getItem(key);
      if (valueStr) {
        return JSON.parse(valueStr);
      }
      return null;
    } catch (err) {
      return null;
    }
  }
  
// Used to set the token to the localStorage with the user as a parameter 'obj'

export function setInStorage(key, obj) {
  if (!key) {
    console.error('Error: Key is missing');
  }  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}