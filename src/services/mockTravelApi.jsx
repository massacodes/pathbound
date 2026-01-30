import { faker } from "@faker-js/faker";

// Generate a single fake flight
const createFakeFlight = () => ({
  id: faker.string.uuid(),
  airline: faker.company.name(),
  logo: `https://img.logo.dev/${faker.company.name()}.com?token=pk_abc123`, // Mock logo
  price: faker.commerce.price({ min: 150, max: 1200, symbol: "$" }),
  duration: `${faker.number.int({ min: 2, max: 14 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
  destination: faker.location.city(),
  image: faker.image.urlLoremFlickr({
    category: "travel",
    width: 640,
    height: 480,
  }),
});

// The exported function your UI will call
export const fetchFlights = async (query) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate 6 random flights
  return Array.from({ length: 6 }, createFakeFlight);
};
