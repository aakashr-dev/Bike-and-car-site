import scooters from './scooters.json';
import smallCcBikes from './smallCcBikes.json';
import midCcBikes from './midCcBikes.json';
import highCcBikes from './highCcBikes.json';
import oldModelCars from './oldModelCars.json';
import topModelCars from './topModelCars.json';

export { scooters, smallCcBikes, midCcBikes, highCcBikes, oldModelCars, topModelCars };

export const allBikes = [
  ...scooters,
  ...smallCcBikes,
  ...midCcBikes,
  ...highCcBikes
];

export const gearBikes = [
  ...smallCcBikes,
  ...midCcBikes,
  ...highCcBikes
];

export const allCars = [
  ...oldModelCars,
  ...topModelCars
];

export const allVehicles = [
  ...allBikes,
  ...allCars
];
