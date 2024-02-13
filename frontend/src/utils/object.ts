const transformKeys = (dottedKey: string) => {
  return dottedKey
    .split(".")
    .map((key) => key.replace(/\d+/g, (match) => `${match}`));
};

export const accessNestedValue = (jsonData: any, dottedKey: string) => {
  const keys = transformKeys(dottedKey); // Transform the dotted key into an array of keys

  let currentValue = jsonData;
  for (const key of keys) {
    if (currentValue === undefined || typeof currentValue !== "object") {
      return undefined; // Handle invalid paths or non-object values
    }
    currentValue = currentValue[key]; // Navigate through each nested level
  }

  return currentValue; // Return the final value at the specified path
};
