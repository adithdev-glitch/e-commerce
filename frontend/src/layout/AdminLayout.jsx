import React from 'react'
import Side from '../admin/dashboard/Side'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <Side/>
    <Outlet />
    </>
  )
}

export default AdminLayout
