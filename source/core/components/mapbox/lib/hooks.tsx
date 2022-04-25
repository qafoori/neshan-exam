import * as Lib from '.'
import mapboxgl, { Map } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', e => e && console.error(e), true)

export const useMapBox = ({ coords, rotation, zoom, onCoordsChange, onRotationChange, onZoomChange, searchResult, accessToken, onClear }: Lib.T.MapboxProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markers = useRef<(Lib.T.TypedMarker | null)[]>([])
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
    map.on('click', onClick)
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

  const onResultClear = () => {
    clearMarkers('searched')
    onClear && onClear()
  }

  const onResult = () => {
    const { current } = mapRef
    if (!current) {
      return
    }
    if (!searchResult) {
      clearMarkers('searched')
      return
    }
    const { address, city, coords, country, wiki } = searchResult
    const [lat, lng] = coords

    addMarker([lat, lng], 'searched')
    current.setZoom(15)
    current.setCenter(coords)
  }

  const onClick = (evt: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (!mapRef.current) {
      return
    }
    const { lngLat } = evt
    addMarker([lngLat.lng, lngLat.lat], 'clicked')
  }

  const addMarker = (coords: [number, number], type: Lib.T.MarkerType) => {
    const { current } = mapRef
    if (!current) {
      return
    }

    const img = document.createElement('img')
    img.src = `${type}-marker.png`

    const marker = new mapboxgl.Marker({
      element: img,
      anchor: 'bottom',
    }) as Lib.T.TypedMarker

    marker.type = type
    markers.current = [...markers.current, marker]
    marker.setLngLat(coords)
    marker.addTo(current)
  }

  const clearMarkers = (markerType?: Lib.T.MarkerType) => {
    const marks = markerType ? markers.current.filter(marker => marker?.type === markerType) : markers.current
    marks.forEach((marker, index) => {
      marker?.remove()
      markers.current[index] = null
    })
  }

  useEffect(createMap, [])
  useEffect(onCoords, [lat, lng])
  useEffect(onZoom, [zoom])
  useEffect(onRotate, [rotation])
  useEffect(onResult, [searchResult])
  return { mapElement, onResultClear }
}
