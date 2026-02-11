import { faker } from "@faker-js/faker";

import { fakerFR } from "@faker-js/faker/locale/fr";
import { fakerDE } from "@faker-js/faker/locale/de";
import { fakerEN_GB } from "@faker-js/faker/locale/en_GB";
import { fakerIT } from "@faker-js/faker/locale/it";
import { fakerCA } from "@faker-js/faker/locale/en_CA";
import { fakerAU } from "@faker-js/faker/locale/en_AU";
import { fakerES } from "@faker-js/faker/locale/es";
import { fakerRU } from "@faker-js/faker/locale/ru";
import { fakerJP } from "@faker-js/faker/locale/ja";
import { fakerUS } from "@faker-js/faker/locale/en_US";
// Map of country names to their corresponding faker locales

const localeMap = {
  france: fakerFR,
  germany: fakerDE,
  unitedKingdom: fakerEN_GB,
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
    return Array.from({ length: 6 }, () => createFakeFlight(query));
  }
};
