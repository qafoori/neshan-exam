import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

export const tileLayer = () => {
  return new TileLayer({
    source: new XYZ({
      url: 'http://mt0.google.com/vt/lyrs=p&hl=fa&x={x}&y={y}&z={z}',
    }),
  })
}

export const calcZoom = (zoom: number) => {
  const newZoom = zoom + 1
  return newZoom
}
