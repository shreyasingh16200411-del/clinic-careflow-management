import { useEffect, useState } from "react"
import "./patients.css"

type Patient = {
  id: number
  patient_id: string
  full_name: string
  date_of_birth: string | null
  gender: string | null
  phone: string | null
  email: string | null
  address: string | null
  medical_history: string | null
  allergies: string | null
  status: string
}

function Patients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadPatients() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          "http://127.0.0.1:8000/api/patients/",
        )

        if (!response.ok) {
          throw new Error("Failed to load patients.")
        }

        const data: Patient[] = await response.json()

        setPatients(data)
      } catch (err) {
        console.error(err)
        setError(
          "Unable to load patients. Please make sure the CareFlow backend is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    loadPatients()
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase().trim()

    if (!search) {
      return true
    }

    return (
      patient.full_name.toLowerCase().includes(search) ||
      patient.patient_id.toLowerCase().includes(search) ||
      (patient.email ?? "").toLowerCase().includes(search) ||
      (patient.phone ?? "").toLowerCase().includes(search)
    )
  })

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className="patients-page">

      {/* Page Header */}
      <header className="patients-header">
        <div>
          <div className="eyebrow">PATIENT MANAGEMENT</div>

          <h1>Patients</h1>

          <p>
            Manage patient records, contact information, and status.
          </p>
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
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
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

            <p>
              {patients.length} registered patients
            </p>
          </div>

        </div>

        {loading && (
          <div style={{ padding: "30px", color: "#748198" }}>
            Loading patients...
          </div>
        )}

        {error && (
          <div style={{ padding: "30px", color: "#f87171" }}>
            {error}
          </div>
        )}

        {!loading && !error && (
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

                {filteredPatients.map((patient) => (

                  <tr key={patient.id}>

                    <td>
                      <div className="patient-name">

                        <div className="patient-avatar">
                          {getInitials(patient.full_name)}
                        </div>

                        <div>
                          <strong>
                            {patient.full_name}
                          </strong>

                          <span>
                            {patient.email ?? "No email provided"}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      {patient.patient_id}
                    </td>

                    <td>
                      —
                    </td>

                    <td>
                      {patient.gender ?? "—"}
                    </td>

                    <td>
                      {patient.phone ?? "—"}
                    </td>

                    <td>
                      <span
                        className={`patient-status ${
                          patient.status.toLowerCase() === "active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td>
                      <button className="view-btn">
                        View →
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredPatients.length === 0 && (
              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                  color: "#748198",
                }}
              >
                No patients found.
              </div>
            )}

          </div>
        )}

      </section>

    </div>
  )
}

export default Patients