import { OutputResult, GeoCoderProps } from '../../geo-coder/lib/types'
import { Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'

export interface OpenLayersProps extends Omit<GeoCoderProps, 'id'> {
  accessToken: string
  zoom: number
  coords: Coords
  rotation: number
  geoCoderId: string
  searchResult?: OutputResult
  onZoomChange?: (zoom: number) => void
  onCoordsChange?: (latitude: number, longitude: number) => void
  onRotationChange?: (rotation: number) => void
}

export type Coords = { lat: number; lng: number }

export type TypedMarker = VectorLayer<VectorSource> & {
  type: MarkerType
}

export type MarkerType = 'searched' | 'clicked'
