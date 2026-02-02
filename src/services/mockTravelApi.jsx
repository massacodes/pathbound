import { faker } from "@faker-js/faker";

// Generate a single fake flight
const createFakeFlight = () => ({
  id: faker.string.uuid(),
  airline: faker.company.name(),
  logo: `https://img.logo.dev/${faker.company.name()}.com?token=pk_abc123`, // Mock logo
  price: faker.commerce.price({ min: 150, max: 1200, symbol: "$" }),
  duration: `${faker.number.int({ min: 2, max: 14 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
  destination: faker.location.city(),
  image: faker.image.url({
    category: "travel",
    width: 640,
    height: 480,
  }),
});

// The exported function to fetch flights based on a search query
export const fetchFlights = async (query) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const flights = [Array.from({ length: 16 }, createFakeFlight)];

  // If there is no search query, return all flights
  if (!query) {
    return flights;
  } else {
    // Simple filter by destination name
    return flights.filter((flight) =>
      flight.destination.toLowerCase().includes(query.toLowerCase()),
    );
  }
};
