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

// This function creates a fake flight object, optionally forcing the country to match the search query

const createFakeFlight = (forcedCountry = null) => {
  // when the user enters a search query, we'll generate flights that match it by using the corresponding locale. Otherwise, we generate random country and locale.

  const countryKey = forcedCountry?.toLowerCase();
  const countryWorker = localeMap[countryKey] || faker;
  const countryName = forcedCountry || faker.location.country();

  // Generate a flight object with realistic data
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

export const fetchFlights = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!query) {
    // Return 12 random flights if theres no search
    return Array.from({ length: 12 }, () => createFakeFlight());
  } else {
    // We'll create 6 results that all "match" the user's search
    return Array.from({ length: 12 }, () => createFakeFlight(query));
  }
};
