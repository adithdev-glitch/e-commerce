import './App.css'
import React, { useState } from 'react'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import ShopPage from './pages/shop/Shop'
import Footer from './component/footer/Footer'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Verify from './pages/verification/Verify'
import { Toaster } from 'react-hot-toast'
import Account from './pages/account/Account'
import ForgotPass from './pages/password/ForgotPass'
import ResetPassword from './pages/password/ResetPass'
import Dashboard from './admin/dashboard/Dashboard'
import Layout from './layout/Layout'
import HeaderLayout from './layout/HeaderLayout'
import AdminLayout from './layout/AdminLayout'
import Profile from './admin/profile/Profile'
import AddProduct from './admin/product/AddProduct'
import Billing from './admin/billing/Billing'
import ProductDescription from './pages/product-description/ProductDescription'
import Cart from './pages/cart/Cart'
import Wishlist from './pages/wishlist/Wishlist'



function App() {

  return (
  <BrowserRouter>
  <Toaster position="top-center" reverseOrder={false} />
  <Routes>
    <Route path="/" element={<Layout />}/>
      {/* <Route index element={ <Home  />}/> */}
      <Route path='/home' element={<HeaderLayout />}>
      <Route path="/home/about" element={<About />} />
      <Route path="/home/contact" element={<Contact />} />
      <Route path="/home/products" element={<ShopPage />} />
      <Route path='/home/verify' element={<Verify />} />
      <Route path="/home/forgot-password" element={<ForgotPass />}/>
      <Route path='/home/reset-password/:token' element={<ResetPassword />} />
      <Route path="/home/account" element={<Account />} />
      <Route path="/home/product/:id" element={<ProductDescription />}/>
      <Route path="/home/favourite" element={<Wishlist />}/>
      <Route path="/home/cart" element={<Cart />}/>
    </Route>
    <Route path="/admin" element={<AdminLayout/>}>
      <Route index element={ <Dashboard  />}/>
      <Route path="/admin/profile" element={<Profile />}/>
      <Route path='/admin/add-product' element={<AddProduct />} />
      <Route path='/admin/billing' element={<Billing />} />
    </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App

