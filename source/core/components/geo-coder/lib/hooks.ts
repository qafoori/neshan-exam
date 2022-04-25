import * as Lib from '.'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useEffect, useRef } from 'react'

export const useGeoCoder = ({ accessToken, onClear, onResult }: Pick<Lib.T.GeoCoderProps, 'accessToken' | 'onClear' | 'onResult'>) => {
  const geoCoderRef = useRef<HTMLDivElement | null>(null)

  const makeGeoCoder = () => {
    if (!geoCoderRef.current) {
      return
    }

    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      types: 'country,region,place,postcode,locality,neighborhood',
      language: 'fa',
      localGeocoder: coordinatesGeocoder,
    })

    geocoder.addTo(`#${geoCoderRef.current.id}`)
    geocoder.on('result', ({ result }) => onResult && onResult(manipulateResult(result)))
    geocoder.on('clear', () => onClear && onClear())
  }

  const manipulateResult = ({ place_name_fa, center, properties, context, text_fa }: Lib.T.InputResult): Lib.T.OutputResult => ({
    address: place_name_fa,
    coords: center,
    wiki: properties.wikidata,
    country: context[0].text_fa,
    city: text_fa,
  })

  const coordinatesGeocoder = (query: string): MapboxGeocoder.Result[] => {
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
        place_name: `عرض ${lat} و طول ${lng} جغرافیایی`,
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

  useEffect(makeGeoCoder, [])
  return geoCoderRef
}
