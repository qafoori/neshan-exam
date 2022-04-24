import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import * as ol from 'ol'
import * as Lib from '.'
import { MapOptions } from 'ol/PluggableMap'

export const useOpenLayers = ({ coords, rotation, zoom, onCoordsChange, onRotationChange, onZoomChange }: Lib.T.OpenLayersProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<ol.Map | null>(null)
  const { lat, lng } = coords

  const createMap = () => {
    if (!mapElement.current) {
      return
    }
    const options: MapOptions = {
      target: mapElement.current,
      layers: [Lib.HE.tileLayer()],
      controls: [],
      view: new View({
        center: [lng, lat],
        zoom: zoom,
        projection: 'EPSG:4326',
        minZoom: 2,
        maxZoom: 18,
      }),
    }
    const map = new Map(options)
    map.on('moveend', onMove)
    mapRef.current = map
  }

  const onMove = () => {
    const { current } = mapRef
    if (current) {
      if (onCoordsChange) {
        const [lat, lng] = current.getView().getCenter()!
        onCoordsChange(lng, lat)
      }
      if (onZoomChange) {
        onZoomChange(current.getView().getZoom()! - 1)
      }
      // if (onRotationChange) {
      //   onRotationChange(current.getView().getRotation())
      // }
    }
  }

  const onZoom = () => {
    if (mapRef.current) {
      mapRef.current.getView().setZoom(zoom + 1)
    }
  }

  const onCoords = () => {
    if (mapRef.current) {
      mapRef.current.getView().setCenter([lng, lat])
    }
  }

  const onRotate = () => {
    if (mapRef.current) {
      mapRef.current.getView().setRotation((-1 * rotation) / 30 / Math.PI)
    }
  }

  useEffect(createMap, [])
  useEffect(onCoords, [lat, lng])
  useEffect(onZoom, [zoom])
  useEffect(onRotate, [rotation])
  return mapElement
}

// const onMapClick = (evt: ol.MapBrowserEvent<any>) => {
//   if (!mapRef.current) {
//     return
//   }
//   const clickedCoord = mapRef.current.getCoordinateFromPixel(evt.pixel)
//   const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
//   console.log(transformedCoord)
// }
