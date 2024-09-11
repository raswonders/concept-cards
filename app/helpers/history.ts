export type History = Map<string, Set<string>>;

export function serializeHistory(data: History) {
  try {
    const array = Array.from(data);
    const result = array.map(([key, value]) => [key, Array.from(value)]);
    const json = JSON.stringify(result);
    return json;
  } catch (error) {
    console.error("Couldn't serialize", data, error);
    return null;
  }
}

export function parseHistory(str: string) {
  try {
    const data = JSON.parse(str) as [string, string[]][];
    const array = data.map(([key, value]): [string, Set<string>] => [
      key,
      new Set(value),
    ]);
    const result = new Map(array);
    return result;
  } catch (error) {
    console.error("Couldn't parse", str, error);
    return new Map();
  }
}