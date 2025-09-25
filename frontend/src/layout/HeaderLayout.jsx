import React from 'react'
import Header from '../component/header/Header'
import { Outlet } from 'react-router-dom'

const HeaderLayout = () => {
  return (
    <>
    <Header/>
    <Outlet />
    </>
  )
}

export default HeaderLayout
