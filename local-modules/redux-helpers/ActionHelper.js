export function createConstants (keys) {
  const hash = {};
  keys.forEach((key) => { hash[key] = key });
  return hash;
}
