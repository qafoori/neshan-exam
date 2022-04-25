import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAccessibility } from '../core/hooks'
import { routes } from './routes'
import { Helmet } from 'react-helmet'

export const RouteSwitcher: React.FC = (): JSX.Element => {
  const { isMounted, hasAccess } = useAccessibility()

  return (
    <Routes>
      {isMounted && (
        <>
          {hasAccess &&
            Object.keys(routes.private).map((key, index) => {
              const { return: page, get: route, title } = routes.private[key]
              return (
                <Route
                  path={route}
                  key={index}
                  element={
                    <>
                      <Helmet>
                        <title>{title} | Neshan</title>
                      </Helmet>
                      {page}
                    </>
                  }
                />
              )
            })}

          {!hasAccess &&
            Object.keys(routes.public).map((key, index) => {
              const { return: page, get: route, title } = routes.public[key]
              return (
                <Route
                  path={route}
                  key={index}
                  element={
                    <>
                      <Helmet>
                        <title>{title} | Neshan</title>
                      </Helmet>
                      {page}
                    </>
                  }
                />
              )
            })}
        </>
      )}
    </Routes>
  )
}
