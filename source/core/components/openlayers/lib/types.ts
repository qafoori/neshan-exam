export interface OpenLayersProps {
  zoom: number
  coords: { lat: number; lng: number }
  rotation: number
  onZoomChange?: (zoom: number) => void
  onCoordsChange?: (latitude: number, longitude: number) => void
  onRotationChange?: (rotation: number) => void
}
