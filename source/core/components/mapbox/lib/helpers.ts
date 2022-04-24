import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'mapbox-gl'

export const coordinatesGeocoder = (query: string): MapboxGeocoder.Result[] => {
  const matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i)
  if (!matches) {
    return []
  }
  function coordinateFeature(lng: number, lat: number) {
    return {
      center: [lng, lat],
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      place_name: 'Lat: ' + lat + ' Lng: ' + lng,
      place_type: ['coordinate'],
      properties: {},
      type: 'Feature',
    }
  }
  const coord1 = Number(matches[1])
  const coord2 = Number(matches[2])
  const geoCodes = []

  if (coord1 < -90 || coord1 > 90) {
    geoCodes.push(coordinateFeature(coord1, coord2))
  }
  if (coord2 < -90 || coord2 > 90) {
    geoCodes.push(coordinateFeature(coord2, coord1))
  }
  if (geoCodes.length === 0) {
    geoCodes.push(coordinateFeature(coord1, coord2))
    geoCodes.push(coordinateFeature(coord2, coord1))
  }
  return <MapboxGeocoder.Result[]>geoCodes
}

export const addControls = (map: mapboxgl.Map, accessToken: string) => {
  map.addControl(
    new MapboxGeocoder({
      accessToken,
      mapboxgl: <mapboxgl.Map>(<unknown>mapboxgl),
      localGeocoder: coordinatesGeocoder,
      language: 'fa',
    }),
  )
}
