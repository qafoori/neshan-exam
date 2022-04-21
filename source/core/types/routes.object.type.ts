export type RoutesObject = {
  [name: string]: {
    get: string
    return: JSX.Element
    title: string
  }
}
