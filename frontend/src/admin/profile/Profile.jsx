import React from "react";
import "./Profile.css";
import { assets } from "../../assets/asset";

const Card = ({ title, value, percent, percentColor, icon }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-text">
          <p className="card-title">{title}</p>
          <h5 className="card-value">
            {value}
            <span className={`card-percent ${percentColor}`}>{percent}</span>
          </h5>
        </div>
        <div className="card-icon">
          <div className="icon-bg">{icon}</div>
        </div>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  return (
    <>
    <div className="cards-row">
      <Card
        title="Today's Money"
        value="$53,000"
        percent="+55%"
        percentColor="green"
        icon={<i className="ni ni-money-coins" />}
      />
      <Card
        title="Today's Users"
        value="2,300"
        percent="+3%"
        percentColor="green"
        icon={<i className="ni ni-world" />}
      />
      <Card
        title="New Clients"
        value="+3,462"
        percent="-2%"
        percentColor="red"
        icon={<i className="ni ni-paper-diploma" />}
      />
      <Card
        title="Sales"
        value="$103,430"
        percent="+5%"
        percentColor="green"
        icon={<i className="ni ni-cart" />}
      />
    </div>
    <div className="section-row">
      {/* Left Card */}
      <div className="section-left">
        <div className="card2">
          <div className="card-body">
            <div className="left-content">
              <p className="card-subtitle">Built by developers</p>
              <h5 className="card-title">Soft UI Dashboard</h5>
              <p className="card-text">
                From colors, cards, typography to complex elements, you will
                find the full documentation.
              </p>
              <a href="#" className="read-more">
                Read More <span className="arrow">→</span>
              </a>
            </div>
            <div className="right-content">
              <div className="gradient-box">
                <img src={assets.wave} alt="waves" className="waves" />
                <div className="rocket-wrapper">
                  <img src={assets.rocket} alt="rocket" className="rocket" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="section-right">
        <div
          className="card-img"
          style={{ backgroundImage: `url(${assets.ivanik})` }}
        >
          <span className="overlay"></span>
          <div className="card-img-content">
            <h5>Work with the rockets</h5>
            <p>
              Wealth creation is an evolutionarily recent positive-sum game. It
              is all about who take the opportunity first.
            </p>
            <a href="#" className="read-more white">
              Read More <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="dashboard-charts-row">
      {/* Left Card */}
      <div className="dashboard-card-left">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <div className="dashboard-chart-container">
              <canvas id="chart-bars" height="170"></canvas>
            </div>
            <h6 className="dashboard-card-title">Active Users</h6>
            <p className="dashboard-card-subtitle">
              (<span className="dashboard-text-bold">+23%</span>) than last week
            </p>

            <div className="dashboard-stats-row">
              <div className="dashboard-stat-item">
                <div className="dashboard-stat-icon users">U</div>
                <p className="dashboard-stat-label">Users</p>
                <h4>36K</h4>
                <div className="dashboard-progress-bar">
                  <div className="dashboard-progress-fill" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div className="dashboard-stat-item">
                <div className="dashboard-stat-icon clicks">C</div>
                <p className="dashboard-stat-label">Clicks</p>
                <h4>2M</h4>
                <div className="dashboard-progress-bar">
                  <div className="dashboard-progress-fill" style={{ width: "90%" }}></div>
                </div>
              </div>

              <div className="dashboard-stat-item">
                <div className="dashboard-stat-icon sales">S</div>
                <p className="dashboard-stat-label">Sales</p>
                <h4>435$</h4>
                <div className="dashboard-progress-bar">
                  <div className="dashboard-progress-fill" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div className="dashboard-stat-item">
                <div className="dashboard-stat-icon items">I</div>
                <p className="dashboard-stat-label">Items</p>
                <h4>43</h4>
                <div className="dashboard-progress-bar">
                  <div className="dashboard-progress-fill" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="dashboard-card-right">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h6>Sales Overview</h6>
            <p className="dashboard-overview-text">
              <i className="fa fa-arrow-up dashboard-text-lime"></i>
              <span className="dashboard-font-bold">4% more</span> in 2021
            </p>
          </div>
          <div className="dashboard-card-body">
            <canvas id="chart-line" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardCards;
