import React, { useState } from 'react'
import Header from '../component/header/Header'
import Home from '../pages/home/Home';

const Layout = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

  return (
    <>
    <Header onLoginClick={() => setShowLogin(true)} onSearchClick={() => setShowSearch(true)}/>
    <Home showLogin={showLogin} onCloseLogin={() => setShowLogin(false)} showSearch={showSearch} onCloseSearch={() => setShowSearch(false)} />
    </>
  )
}

export default Layout
