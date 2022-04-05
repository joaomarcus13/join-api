import cities from '../assets/DistanciaCidade.json';

function calculateDistance(a, b) {
  const toRad = (v, x = 90) => ((x - v) * Math.PI) / 180;
  return (
    6371 *
    Math.acos(
      Math.cos(toRad(b.lat)) * Math.cos(toRad(a.lat)) +
        Math.sin(toRad(b.lat)) *
          Math.sin(toRad(a.lat)) *
          Math.cos(toRad(b.long, a.long))
    )
  );
}

export function getCities(city, km) {
  const result = [];
  city = String(city)?.toUpperCase();
  const toCompare = cities[city];
  if (!toCompare || !parseInt(km)) return null;
  Object.values(cities).forEach((values) => {
    const distancia = calculateDistance(toCompare, values);
    if (distancia <= parseInt(km)) {
      result.push(values.id);
    }
  });
  return result.join(',');
}
