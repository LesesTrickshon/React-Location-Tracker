export function success(
  position: any,
  setLat: any,
  setLon: any,
  id: any,
  setID: any
) {
  setLat(position.coords.latitude);
  setLon(position.coords.longitude);

  setID(id + 1);
  places.push({
    lat: position.coords.latitude.toFixed(7),
    lon: position.coords.longitude.toFixed(7),
    id: id + 1,
  });
}

export function error() {
  alert("Error: Location didnt work bc IDFK");
}

export const places: any[] = [];
