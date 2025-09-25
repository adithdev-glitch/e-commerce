import React from 'react'
import './Membership.css'
import { assets } from '../../assets/asset'

const Membership = () => {
  return (
    <>
    <div className="main-5">
        <div className="member-header">
            <h2>Membership Perks</h2>
        </div>
        <div className="member-content">
                <img src={assets.gift} />
                <img src={assets.truck} />
                <img src={assets.card} />
                <img src={assets.pillow} />
        </div>
    </div>

    </>
  )
}

export default Membership