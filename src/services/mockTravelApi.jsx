import { faker } from "@faker-js/faker";

import { faker as fakerFR } from "@faker-js/faker/locale/fr";
import { faker as fakerDE } from "@faker-js/faker/locale/de";
import { faker as fakerIT } from "@faker-js/faker/locale/it";
import { faker as fakerGB } from "@faker-js/faker/locale/en_GB";
import { faker as fakerCA } from "@faker-js/faker/locale/en_CA";
import { faker as fakerAU } from "@faker-js/faker/locale/en_AU";
import { faker as fakerES } from "@faker-js/faker/locale/es";
import { faker as fakerRU } from "@faker-js/faker/locale/ru";
import { faker as fakerJP } from "@faker-js/faker/locale/ja";
import { faker as fakerUS } from "@faker-js/faker/locale/en_US";
// Map of country names to their corresponding faker locales

const localeMap = {
  france: fakerFR,
  germany: fakerDE,
  unitedKingdom: fakerGB,
  italy: fakerIT,
  unitedStates: fakerUS,
  canada: fakerCA,
  australia: fakerAU,
  spain: fakerES,
  russia: fakerRU,
  japan: fakerJP,
};

// Normalized lookup map to handle queries like "United Kingdom" or "unitedkingdom"
const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
const normalizedLocaleMap = Object.fromEntries(
  Object.entries(localeMap).map(([k, v]) => [normalize(k), v]),
);

// This function creates a fake flight object, optionally forcing the country to match the search query

const createFakeFlight = (forcedCountry = null) => {
  // Use normalized lookup so queries like "United Kingdom" match `unitedKingdom`
  const normalized = normalize(forcedCountry);
  const countryWorker = normalizedLocaleMap[normalized] || faker;
  const countryName = forcedCountry || faker.location.country();

  return {
    id: faker.string.uuid(),
    airline: faker.company.name(),
    price: faker.commerce.price({ min: 150, max: 1200, symbol: "$" }),
    duration: `${faker.number.int({ min: 2, max: 14 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
    destination: countryWorker.location.city(),
    country: countryName,
    image: `https://picsum.photos/seed/${faker.string.uuid()}/640/480`,
  };
};

// determine whether a user query looks like a country name
const looksLikeCountry = (query) => {
  if (!query) return false;
  const raw = String(query).trim();
  const normalized = normalize(raw);

  // If it exists in locale map, it's valid
  if (normalized in normalizedLocaleMap) return true;

  // letters/spaces only, No numbers or special chars.
  const lower = raw.toLowerCase();
  if (!/^[a-z ]+$/.test(lower)) return false;

  // Reject extremely short/long inputs
  if (normalized.length < 3 || normalized.length > 60) return false;

  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length > 4) return false;

  // Reject obvious gibberish: long repeated characters
  if (/(.)\1{4,}/.test(lower)) return false;

  // Reject very long consonant clusters
  if (/[bcdfghjklmnpqrstvwxyz]{6,}/.test(lower)) return false;

  // Ensure a reasonable vowel ratio (guards against random consonant-heavy strings)
  const lettersOnly = normalized.replace(/ /g, "");
  const vowelCount = (lettersOnly.match(/[aeiouy]/g) || []).length;
  const vowelRatio = lettersOnly.length ? vowelCount / lettersOnly.length : 0;
  if (vowelRatio < 0.18) return false;

  // Ensure each word is a reasonable length
  for (const w of words) {
    if (w.length < 2) return false;
    if (w.length > 25) return false;
  }

  return true;
};

export const fetchFlights = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!query) {
    // Return 12 random flights if there's no search
    return Array.from({ length: 12 }, () => createFakeFlight());
  }

  if (!looksLikeCountry(query)) {
    return [];
  }

  // Generate results that match the user's country query
  return Array.from({ length: 12 }, () => createFakeFlight(query));
};
