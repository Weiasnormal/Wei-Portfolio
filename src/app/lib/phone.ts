export function normalizePhInput(raw: string): string {
  if (raw.trim() === "") return "";

  const cleaned = raw.replace(/[^\d+]/g, "");

  if (/^0?9\d{0,9}$/.test(cleaned)) {
    const digits = cleaned.replace(/^0/, "");
    return `+63${digits}`;
  }

  if (cleaned.startsWith("+63")) {
    return cleaned;
  }

  return raw;
}

export function isValidPhPhone(value: string): boolean {
  const cleaned = value.replace(/[\s-]/g, "");
  return /^(\+639|09|9)\d{9}$/.test(cleaned);
}