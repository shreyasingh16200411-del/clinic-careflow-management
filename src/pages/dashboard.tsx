import "./dashboard.css"
function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <div className="eyebrow">CLINIC OVERVIEW</div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here's what's happening at your clinic today.</p>
        </div>

        <div className="dashboard-date">
          <span>Today</span>
          <strong>September 13, 2026</strong>
        </div>
      </header>

      {/* Statistics */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-top">
            <span>Total Patients</span>
            <div className="stat-icon">+</div>
          </div>

          <strong>1,248</strong>

          <div className="stat-bottom">
            <span className="positive">↑ 8.2%</span>
            <span>vs last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Doctors</span>
            <div className="stat-icon">+</div>
          </div>

          <strong>36</strong>

          <div className="stat-bottom">
            <span className="positive">↑ 2</span>
            <span>this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Appointments</span>
            <div className="stat-icon">+</div>
          </div>

          <strong>184</strong>

          <div className="stat-bottom">
            <span className="positive">12</span>
            <span>scheduled today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Monthly Revenue</span>
            <div className="stat-icon">₹</div>
          </div>

          <strong>₹8.4L</strong>

          <div className="stat-bottom">
            <span className="positive">↑ 12.5%</span>
            <span>vs last month</span>
          </div>
        </div>

      </section>

      {/* Main Dashboard */}
      <section className="dashboard-grid">

        {/* Appointments */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Upcoming Appointments</h2>
              <p>Today's scheduled visits</p>
            </div>

            <button>View all →</button>
          </div>

          <div className="appointment">
            <div className="appointment-person">
              <div className="avatar">AS</div>

              <div>
                <strong>Aisha Sharma</strong>
                <span>General Consultation</span>
              </div>
            </div>

            <div className="appointment-time">
              <strong>10:30 AM</strong>
              <span>Room 204</span>
            </div>
          </div>

          <div className="appointment">
            <div className="appointment-person">
              <div className="avatar">RM</div>

              <div>
                <strong>Rahul Mehta</strong>
                <span>Dental Checkup</span>
              </div>
            </div>

            <div className="appointment-time">
              <strong>11:15 AM</strong>
              <span>Room 102</span>
            </div>
          </div>

          <div className="appointment">
            <div className="appointment-person">
              <div className="avatar">PK</div>

              <div>
                <strong>Priya Kapoor</strong>
                <span>Follow-up Consultation</span>
              </div>
            </div>

            <div className="appointment-time">
              <strong>12:00 PM</strong>
              <span>Room 201</span>
            </div>
          </div>

          <div className="appointment">
            <div className="appointment-person">
              <div className="avatar">VK</div>

              <div>
                <strong>Vikram Kumar</strong>
                <span>Health Assessment</span>
              </div>
            </div>

            <div className="appointment-time">
              <strong>01:30 PM</strong>
              <span>Room 105</span>
            </div>
          </div>

        </div>

        {/* Recent Patients */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Recent Patients</h2>
              <p>Recently registered patients</p>
            </div>

            <button>View all →</button>
          </div>

          <div className="patient">
            <div className="avatar">AS</div>

            <div className="patient-info">
              <strong>Aisha Sharma</strong>
              <span>Patient ID · CF-1001</span>
            </div>

            <span className="status">Active</span>
          </div>

          <div className="patient">
            <div className="avatar">RM</div>

            <div className="patient-info">
              <strong>Rahul Mehta</strong>
              <span>Patient ID · CF-1002</span>
            </div>

            <span className="status">Active</span>
          </div>

          <div className="patient">
            <div className="avatar">PK</div>

            <div className="patient-info">
              <strong>Priya Kapoor</strong>
              <span>Patient ID · CF-1003</span>
            </div>

            <span className="status">Active</span>
          </div>

          <div className="patient">
            <div className="avatar">VK</div>

            <div className="patient-info">
              <strong>Vikram Kumar</strong>
              <span>Patient ID · CF-1004</span>
            </div>

            <span className="status">Active</span>
          </div>

        </div>

      </section>

      {/* Bottom Section */}
      <section className="bottom-grid">

        <div className="quick-card">
          <div>
            <span className="quick-label">TODAY</span>
            <h3>12 appointments</h3>
            <p>4 completed · 8 remaining</p>
          </div>

          <div className="progress">
            <div className="progress-bar"></div>
          </div>
        </div>

        <div className="quick-card">
          <div>
            <span className="quick-label">PATIENT ACTIVITY</span>
            <h3>+24 new patients</h3>
            <p>Registered this month</p>
          </div>

          <div className="activity-number">24</div>
        </div>

        <div className="quick-card">
          <div>
            <span className="quick-label">REVENUE</span>
            <h3>₹8.4L</h3>
            <p>Current monthly revenue</p>
          </div>

          <div className="revenue-number">↑</div>
        </div>

      </section>

    </div>
  )
}

export default Dashboard