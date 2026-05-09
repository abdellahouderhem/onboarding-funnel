import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import RestaurantInfo from './pages/RestaurantInfo'
import BookCall from './pages/BookCall'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Welcome />
            </Layout>
          }
        />
        <Route
          path="/info"
          element={
            <Layout>
              <RestaurantInfo />
            </Layout>
          }
        />
        <Route
          path="/book"
          element={
            <Layout>
              <BookCall />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
