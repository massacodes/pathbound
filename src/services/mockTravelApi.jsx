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
import { faker as fakerKO } from "@faker-js/faker/locale/ko";
import { faker as fakerPT_BR } from "@faker-js/faker/locale/pt_BR";
import { faker as fakerTR } from "@faker-js/faker/locale/tr";
import { faker as fakerCN } from "@faker-js/faker/locale/zh_CN";
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
  korea: fakerKO,
  brazil: fakerPT_BR,
  turkey: fakerTR,
  china: fakerCN,
};

// Normalized lookup map to handle queries like "United Kingdom" or "unitedkingdom"
const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
const normalizedLocaleMap = Object.fromEntries(
  Object.entries(localeMap).map(([k, v]) => [normalize(k), v]),
);

// This function creates a fake Tour object, optionally forcing the country to match the search query

const createFakeTour = (forcedCountry = null) => {
  const normalized = normalize(forcedCountry);
  const countryWorker = normalizedLocaleMap[normalized] || faker;
  const countryName = forcedCountry || faker.location.country();
  const lockId = faker.number.int({ min: 1, max: 1000 });

  return {
    id: faker.string.uuid(),
    title: `${faker.location.city()} & The ${faker.commerce.productAdjective()} Coast`,
    country: countryName,
    destination: `${countryWorker.location.city()}`,
    duration: faker.number.int({ min: 5, max: 14 }),
    operator: "Expat Explore Travel",
    price: `$${faker.commerce.price({ min: 800, max: 4500, dec: 0 })}`,
    rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
    reviews: faker.number.int({ min: 20, max: 500 }),
    image: `https://picsum.photos/seed/${lockId}/800/600`,
    tourCode: faker.string.numeric(3).toUpperCase(),
    groupSize: `${faker.number.int({ min: 10, max: 20 })} - ${faker.number.int({ min: 30, max: 50 })}`,
    physicalRating: faker.helpers.arrayElement(["Low", "Medium", "High"]),
    interests: faker.helpers.arrayElements(
      ["Culture", "History", "Nature", "Food"],
      2,
    ),
    // Brief summary for the card
    excerpt: `Discover the hidden gems of ${faker.location.country()} on this fully-guided journey.`,
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

export const fetchTours = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!query) {
    // Return 12 random Tours if there's no search
    return Array.from({ length: 9 }, () => createFakeTour());
  }

  if (!looksLikeCountry(query)) {
    return [];
  }

  // Generate results that match the user's country query
  return Array.from({ length: 9 }, () => createFakeTour(query));
};

export const fetchTourById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const tour = createFakeTour();
  return {
    ...tour,
    id,
    image: `https://picsum.photos/seed/${id}/640/480`,
  };
};
