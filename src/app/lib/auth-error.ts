/** Converts Better Auth errors to Bangla messages. */
export function authErrorMessage(error: { code?: string; message?: string } | null | undefined, fallback: string) {
  const code = (error?.code ?? "").toUpperCase();
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || code.includes("INVALID_PASSWORD"))
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  if (code.includes("ALREADY_EXISTS")) return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।";
  if (code.includes("INVALID_EMAIL")) return "সঠিক ইমেইল ঠিকানা লিখুন।";
  if (code.includes("TOO_SHORT")) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  return fallback;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Only allow same-site relative redirects. */
export function safeCallback(url: string | null) {
  return url && url.startsWith("/") && !url.startsWith("//") ? url : "/";
}
