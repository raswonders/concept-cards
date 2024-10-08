export type ConceptsHistory = Map<string, Set<string>>;
export type HistorySerializable = [string, string[]][];

export function toSerializableHistory(data: ConceptsHistory) {
  const array = Array.from(data);
  return array.map(([key, value]) => [key, Array.from(value)]);
}

export function fromSerializableHistory(data: HistorySerializable) {
  const array = data.map(([key, value]): [string, Set<string>] => [
    key,
    new Set(value),
  ]);
  return new Map(array);
}

export function serializeHistory(data: ConceptsHistory) {
  try {
    const json = JSON.stringify(toSerializableHistory(data));
    return json;
  } catch (error) {
    console.error("Couldn't serialize", data, error);
    return null;
  }
}

export function parseHistory(str: string) {
  try {
    const data = JSON.parse(str) as HistorySerializable;
    return fromSerializableHistory(data);
  } catch (error) {
    console.error("Couldn't parse", str, error);
    return new Map();
  }
}
