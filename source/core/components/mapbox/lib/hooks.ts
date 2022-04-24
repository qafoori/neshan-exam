import * as Lib from '.'
import mapboxgl, { Map } from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', e => e && console.error(e), true)

export const useMapBox = ({ accessToken, coords, rotation, zoom, onCoordsChange, onRotationChange, onZoomChange }: Lib.T.MapboxProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const { lat, lng } = coords

  const createMap = () => {
    if (mapRef.current || !mapElement.current) {
      return
    }
    mapboxgl.accessToken = accessToken

    const options: mapboxgl.MapboxOptions = {
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      bearing: rotation,
      minZoom: 2,
      maxZoom: 18,
    }
    const map = new mapboxgl.Map(options)
    map.on('moveend', onMove)
    Lib.HE.addControls(map, accessToken)
    mapRef.current = map
  }

  const onMove = () => {
    const { current } = mapRef
    if (current) {
      if (onCoordsChange) {
        const { lat, lng } = current.getCenter()!
        onCoordsChange(lat, lng)
      }
      if (onZoomChange) {
        onZoomChange(current.getZoom())
      }
      if (onRotationChange) {
        onRotationChange(current.getBearing())
      }
    }
  }

  const onCoords = () => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng })
    }
  }

  const onZoom = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom)
    }
  }

  const onRotate = () => {
    if (mapRef.current) {
      mapRef.current.setBearing(rotation)
    }
  }

  useEffect(createMap, [])
  useEffect(onCoords, [lat, lng])
  useEffect(onZoom, [zoom])
  useEffect(onRotate, [rotation])
  return mapElement
}
