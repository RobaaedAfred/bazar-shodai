const LOCALE = "bn-BD-u-nu-beng";

const intFmt = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });
const decFmt = new Intl.NumberFormat(LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pctFmt = new Intl.NumberFormat(LOCALE, { minimumFractionDigits: 1, maximumFractionDigits: 1 });


export const bn = (n: number) => intFmt.format(n);

/** Price: integer -> ৬২, fractional -> ৬৩.৫০ */
export const bnPrice = (n: number) => (Number.isInteger(n) ? intFmt.format(n) : decFmt.format(n));

export const bnPct = (n: number) => pctFmt.format(n);

const UNITS: Record<string, { full: string; short: string }> = {
  kg: { full: "প্রতি কেজি", short: "কেজি" },
  litre: { full: "প্রতি লিটার", short: "লিটার" },
  liter: { full: "প্রতি লিটার", short: "লিটার" },
  l: { full: "প্রতি লিটার", short: "লিটার" },
  dozen: { full: "প্রতি ডজন", short: "ডজন" },
  dz: { full: "প্রতি ডজন", short: "ডজন" },
  piece: { full: "প্রতি পিস", short: "পিস" },
  pcs: { full: "প্রতি পিস", short: "পিস" },
  pc: { full: "প্রতি পিস", short: "পিস" },
};

export function unitInfo(unit: string) {
  return UNITS[(unit ?? "").toLowerCase()] ?? { full: `প্রতি ${unit}`, short: unit };
}
