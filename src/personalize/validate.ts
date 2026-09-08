import { NAME_MAX, NUMBER_MAX, NUMBER_MIN } from "./matrix";

const NAME_RE = /^[A-Z][A-Z '\-]{0,11}$/;

/** Profanity + BHS roster blocklist — extend via ops. */
const BLOCKLIST = new Set(
  [
    "fuck",
    "shit",
    "asshole",
    "bitch",
    "cunt",
    "nigger",
    "faggot",
    // placeholder — load real roster denylist from ops before launch
  ].map((s) => s.toUpperCase()),
);

export type PersonalizeInput = {
  name?: string;
  number?: string;
};

export type PersonalizeIssue = { field: "name" | "number"; code: string; message: string };

export function normalizeName(raw: string): string {
  return raw.toUpperCase().slice(0, NAME_MAX);
}

export function validatePersonalization(input: PersonalizeInput): PersonalizeIssue[] {
  const issues: PersonalizeIssue[] = [];
  if (input.name !== undefined) {
    const name = normalizeName(input.name);
    if (!NAME_RE.test(name) && name.length > 0) {
      issues.push({
        field: "name",
        code: "NAME_CHARS",
        message: "A–Z, space, hyphen, apostrophe only. Max 12.",
      });
    }
    if (BLOCKLIST.has(name.replace(/[\s'\-]/g, ""))) {
      issues.push({
        field: "name",
        code: "NAME_BLOCKED",
        message: "That name cannot be printed.",
      });
    }
  }
  if (input.number !== undefined && input.number !== "") {
    if (!/^\d{1,2}$/.test(input.number)) {
      issues.push({
        field: "number",
        code: "NUMBER_FORMAT",
        message: "0–99 only. No leading zero except 0.",
      });
    } else {
      const n = Number(input.number);
      if (input.number.length > 1 && input.number.startsWith("0")) {
        issues.push({
          field: "number",
          code: "NUMBER_LEADING_ZERO",
          message: "No leading zero except 0.",
        });
      }
      if (n < NUMBER_MIN || n > NUMBER_MAX) {
        issues.push({
          field: "number",
          code: "NUMBER_RANGE",
          message: "0–99.",
        });
      }
    }
  }
  return issues;
}
