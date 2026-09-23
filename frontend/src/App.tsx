import { Navigate, Route, Routes } from 'react-router'
import { GuestOnly, RequireAuth } from '@/auth/guards'
import { LoginPage } from '@/pages/LoginPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SignupPage } from '@/pages/SignupPage'

export default function App() {
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  )
}
