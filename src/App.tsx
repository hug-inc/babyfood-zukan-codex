import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout, { ScrollManager } from './components/Layout'
import { CompareProvider } from './components/CompareContext'
import Home from './pages/Home'
import SearchPage from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import ComparePage from './pages/Compare'
import ArticleDetail from './pages/ArticleDetail'
import NotFound from './pages/NotFound'
import { CompanyPage, ContactPage, ForMakersPage, PrivacyPage, TermsPage } from './pages/StaticPages'
import { AdminProvider } from './pages/admin/AdminContext'
import { AdminDashboard, AdminLayout, AdminLogin, AdminProductForm } from './pages/admin/AdminPages'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollManager />
      <CompareProvider>
        <AdminProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="articles/:id" element={<ArticleDetail />} />
              <Route path="company" element={<CompanyPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="for-makers" element={<ForMakersPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="login" element={<AdminLogin />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:id/edit" element={<AdminProductForm />} />
            </Route>
          </Routes>
        </AdminProvider>
      </CompareProvider>
    </BrowserRouter>
  )
}
