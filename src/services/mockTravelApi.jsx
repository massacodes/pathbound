import { Faker, faker } from "@faker-js/faker";

// Generate a single fake flight
const createFakeFlight = () => ({
  id: faker.string.uuid(),
  airline: faker.company.name(),
  logo: `https://img.logo.dev/${faker.company.name()}.com?token=pk_abc123`, // Mock logo
  price: faker.commerce.price({ min: 150, max: 1200, symbol: "$" }),
  duration: `${faker.number.int({ min: 2, max: 14 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
  destination: faker.location.city(),
  country: faker.location.country(),
  image: faker.image.url({
    category: "travel",
    destination: faker.location.country(),
    width: 640,
    height: 480,
  }),
});

const flights = Array.from({ length: 12 }, createFakeFlight);

// The exported function to fetch flights based on a search query
export const fetchFlights = async (query) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // If there is no search query, return initial flights
  if (!query) {
    return flights;
  } else {
    // filter flights based on country matching the search query

    const filteredFlights = flights.filter((flight) => {
      // Check if flight exists and has a country string
      if (!flight || !flight.country) return false;

      return flight.country.toLowerCase().includes(query.toLowerCase());
    });
    return filteredFlights;
  }
};
