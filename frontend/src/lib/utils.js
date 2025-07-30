export function cn(...inputs) {
  return inputs
    .filter(Boolean)
    .map((input) => (typeof input === "string" ? input : input.className))
    .join(" ");
}
