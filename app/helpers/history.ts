export type History = Map<string, Set<string>>;

export function serializeHistory(data: History) {
  try {
    let array = Array.from(data);
    let result = array.map(([key, value]) => [key, Array.from(value)]);
    let json = JSON.stringify(result);
    return json;
  } catch (error) {
    console.error("Couldn't serialize", data, error);
    return null;
  }
}

export function parseHistory(str: string) {
  try {
    let data = JSON.parse(str) as [string, string[]][];
    let array = data.map(([key, value]): [string, Set<string>] => [
      key,
      new Set(value),
    ]);
    let result = new Map(array);
    return result;
  } catch (error) {
    console.error("Couldn't parse", str, error);
    return new Map();
  }
}