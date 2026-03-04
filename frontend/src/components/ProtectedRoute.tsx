// PrivateRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { JSX } from 'react'

interface PrivateRouteProps {
  children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuth()

  if (!token) {
    // Token yoksa login sayfasına yönlendir
    return <Navigate to="/login" replace />
  }

  // Token varsa sayfayı göster
  return children
}