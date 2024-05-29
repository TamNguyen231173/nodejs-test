type ImportedObject = {
  [key: string]: any
}

export const queryFilter = (object: ImportedObject, keys: string[] = []) => {
  return keys.reduce((obj: ImportedObject, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as ImportedObject);
};
