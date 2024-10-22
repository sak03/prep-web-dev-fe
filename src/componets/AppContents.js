import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../routes'


const AppContents = () => {
  return (
    <Suspense fallback={<span>loading ...</span>}>
      <Routes>
        {routes.map((route, idx) => {
          return route.element && <Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.element />} />
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppContents