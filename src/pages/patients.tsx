import "./patients.css"

function Patients() {
  return (
    <div className="patients-page">

      {/* Page Header */}
      <header className="patients-header">
        <div>
          <div className="eyebrow">PATIENT MANAGEMENT</div>
          <h1>Patients</h1>
          <p>Manage patient records, contact information, and status.</p>
        </div>

        <button className="add-patient-btn">
          + Add Patient
        </button>
      </header>

      {/* Search & Filters */}
      <section className="patients-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search patients..."
          />
        </div>

        <button className="filter-btn">
          All Patients ▾
        </button>
      </section>

      {/* Patient Table */}
      <section className="patients-table-card">

        <div className="table-header">
          <div>
            <h2>All Patients</h2>
            <p>1,248 registered patients</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>

            <thead>
              <tr>
                <th>Patient</th>
                <th>Patient ID</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>
                  <div className="patient-name">
                    <div className="patient-avatar">AS</div>
                    <div>
                      <strong>Aisha Sharma</strong>
                      <span>aisha.sharma@email.com</span>
                    </div>
                  </div>
                </td>

                <td>CF-1001</td>
                <td>28</td>
                <td>Female</td>
                <td>+91 98765 43210</td>

                <td>
                  <span className="patient-status active">
                    Active
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    View →
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="patient-name">
                    <div className="patient-avatar">RM</div>
                    <div>
                      <strong>Rahul Mehta</strong>
                      <span>rahul.mehta@email.com</span>
                    </div>
                  </div>
                </td>

                <td>CF-1002</td>
                <td>34</td>
                <td>Male</td>
                <td>+91 98123 45678</td>

                <td>
                  <span className="patient-status active">
                    Active
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    View →
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="patient-name">
                    <div className="patient-avatar">PK</div>
                    <div>
                      <strong>Priya Kapoor</strong>
                      <span>priya.kapoor@email.com</span>
                    </div>
                  </div>
                </td>

                <td>CF-1003</td>
                <td>41</td>
                <td>Female</td>
                <td>+91 97654 32109</td>

                <td>
                  <span className="patient-status active">
                    Active
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    View →
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="patient-name">
                    <div className="patient-avatar">VK</div>
                    <div>
                      <strong>Vikram Kumar</strong>
                      <span>vikram.kumar@email.com</span>
                    </div>
                  </div>
                </td>

                <td>CF-1004</td>
                <td>36</td>
                <td>Male</td>
                <td>+91 98987 65432</td>

                <td>
                  <span className="patient-status inactive">
                    Inactive
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    View →
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="patient-name">
                    <div className="patient-avatar">NK</div>
                    <div>
                      <strong>Neha Kapoor</strong>
                      <span>neha.kapoor@email.com</span>
                    </div>
                  </div>
                </td>

                <td>CF-1005</td>
                <td>25</td>
                <td>Female</td>
                <td>+91 98234 56781</td>

                <td>
                  <span className="patient-status active">
                    Active
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    View →
                  </button>
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </section>

    </div>
  )
}

export default Patients