import React from 'react'
import './Billing.css'
import { assets } from '../../assets/asset'
const Billing = () => {
    const billingUsers = [
        { name: "Oliver Liam", company: "Viking Burrito", email: "oliver@burrito.com", vat: "FRB1235476" },
        { name: "Lucas Harper", company: "Stone Tech Zone", email: "lucas@stone-tech.com", vat: "FRB1235476" },
        { name: "Ethan James", company: "Fiber Notion", email: "ethan@fiber.com", vat: "FRB1235476" },
      ];
      
      const transactionsData = [
        { type: "down", color: "red", title: "Netflix", time: "27 March 2020, at 12:30 PM", amount: "- $2,500" },
        { type: "up", color: "green", title: "Apple", time: "27 March 2020, at 04:30 AM", amount: "+ $2,000" },
      ];
      
  return (
    <>
<div className="billing-container">
    <div className="billing-left">
        {/* Credit Card */}
        <div className="card3">
          <div className="card3-bg" style={{ backgroundImage: `url(${assets.curved14})` }}>
            <span className="card3-overlay"></span>
            <div className="card3-content">
              <i className="fas fa-wifi card3-icon"></i>
              <h5 className="card3-number">4562&nbsp;1122&nbsp;4594&nbsp;7852</h5>
              <div className="card3-details">
                <div className="card3-holder">
                  <p>Card Holder</p>
                  <h6>Jack Peterson</h6>
                </div>
                <div className="card3-expiry">
                  <p>Expires</p>
                  <h6>11/22</h6>
                </div>
                <div className="card3-logo">
                  <img src={assets.mastercard} alt="logo" />
                </div>
              </div>
            </div>
          </div>
        </div>

    {/* Salary & Paypal */}
    <div className="card3-small-cards">
      <div className="card3-small-card">
        <div className="icon-bg purple-pink">
          <i className="fas fa-landmark"></i>
        </div>
        <div className="card3-body">
          <h6>Salary</h6>
          <span>Belong Interactive</span>
          <hr />
          <h5>+$2000</h5>
        </div>
      </div>
      <div className="card3-small-card">
        <div className="icon-bg purple-pink">
          <i className="fab fa-paypal"></i>
        </div>
        <div className="card3-body">
          <h6>Paypal</h6>
          <span>Freelance Payment</span>
          <hr />
          <h5>$455.00</h5>
        </div>
      </div>
    </div>

    {/* Payment Methods */}
    <div className="card3-payment-method">
      <div className="card3-payment-header">
        <h6>Payment Method</h6>
        <a href="#" className="add-card3-btn">
          <i className="fas fa-plus"></i> Add New Card
        </a>
      </div>
      <div className="card3-payment-cards">
        <div className="card3-payment-card">
          <img src={assets.mastercard} alt="logo" />
          <h6>**** **** **** 7852</h6>
          <i className="fas fa-pencil-alt card3-edit-icon"></i>
        </div>
        <div className="card3-payment-card">
          <img src={assets.visa} alt="logo" />
          <h6>**** **** **** 5248</h6>
          <i className="fas fa-pencil-alt card3-edit-icon"></i>
        </div>
      </div>
    </div>
  </div>

  {/* Invoices */}
  <div className="billing-right">
    <div className="invoices-card">
      <div className="invoices-header">
        <h6>Invoices</h6>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="invoices-list">
        {[
          { date: "March, 01, 2020", code: "#MS-415646", amount: "$180" },
          { date: "February, 10, 2021", code: "#RV-126749", amount: "$250" },
          { date: "April, 05, 2020", code: "#FB-212562", amount: "$560" },
          { date: "June, 25, 2019", code: "#QW-103578", amount: "$120" },
          { date: "March, 01, 2019", code: "#AR-803481", amount: "$300" },
        ].map((invoice, index) => (
          <li key={index} className="invoice-item">
            <div className="invoice-info">
              <h6>{invoice.date}</h6>
              <span>{invoice.code}</span>
            </div>
            <div className="invoice-action">
              {invoice.amount}
              <button className="pdf-btn">
                <i className="fas fa-file-pdf"></i> PDF
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  </div>
  <div className="billing-container2">
      {/* Left Section: Billing Info */}
      <div className="billing-left2">
        <div className="billing-card2">
          <div className="billing-card-header">
            <h6>Billing Information</h6>
          </div>
          <div className="billing-card-body">
            <ul>
              {billingUsers.map((user, idx) => (
                <li key={idx} className="billing-user-item">
                  <div className="billing-user-info">
                    <h6>{user.name}</h6>
                    <span>Company Name: <strong>{user.company}</strong></span>
                    <span>Email Address: <strong>{user.email}</strong></span>
                    <span>VAT Number: <strong>{user.vat}</strong></span>
                  </div>
                  <div className="billing-user-actions">
                    <button className="billing-btn-delete">Delete</button>
                    <button className="billing-btn-edit">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section: Transactions */}
      <div className="billing-right2">
        <div className="transactions-card">
          <div className="transactions-header">
            <h6>Your Transactions</h6>
            <small>23 - 30 March 2020</small>
          </div>
          <div className="transactions-body">
            <h6 className="transactions-section-title">Newest</h6>
            <ul>
              {transactionsData.map((tx, idx) => (
                <li key={idx} className="transaction-item">
                  <div className="transaction-left">
                    <button className={`transaction-btn ${tx.color}`}>{tx.type === "up" ? "↑" : "↓"}</button>
                    <div className="transaction-details">
                      <h6>{tx.title}</h6>
                      <span>{tx.time}</span>
                    </div>
                  </div>
                  <div className="transaction-right">
                    <p className={tx.color}>{tx.amount}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
</div>


    </>
  )
}

export default Billing
