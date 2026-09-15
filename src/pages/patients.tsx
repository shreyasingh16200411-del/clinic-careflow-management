
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link } from "react-router-dom"
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

type PatientForm = {
  full_name: string
  date_of_birth: string
  gender: string
  phone: string
  email: string
  address: string
  medical_history: string
  allergies: string
}

const emptyForm: PatientForm = {
  full_name: "",
  date_of_birth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  medical_history: "",
  allergies: "",
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #2b374b",
  background: "#0b111b",
  color: "#e5e7eb",
  outline: "none",
  boxSizing: "border-box" as const,
}

function Patients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState<PatientForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function loadPatients() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/patients/",
      )

      if (!response.ok) {
        throw new Error("Failed to load patients.")
      }

      const data: Patient[] = await response.json()

      setPatients(data)
      setError("")
    } catch (err) {
      console.error(err)

      setError(
        "Unable to load patients. Please make sure the CareFlow backend is running.",
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  const timer = window.setTimeout(() => {
    void loadPatients()
  }, 0)

  return () => {
    window.clearTimeout(timer)
  }
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
      .filter(Boolean)
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  function handleFormChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleAddPatient(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setFormError("")
    setSuccessMessage("")

    if (!form.full_name.trim()) {
      setFormError("Patient name is required.")
      return
    }

    if (!form.email.trim()) {
      setFormError("Email is required.")
      return
    }

    try {
      setSaving(true)

      const response = await fetch(
        "http://127.0.0.1:8000/api/patients/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: form.full_name.trim(),
            date_of_birth: form.date_of_birth || null,
            gender: form.gender || null,
            phone: form.phone.trim() || null,
            email: form.email.trim(),
            address: form.address.trim() || null,
            medical_history:
              form.medical_history.trim() || null,
            allergies: form.allergies.trim() || null,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        const message =
          typeof data?.detail === "string"
            ? data.detail
            : "Unable to create patient."

        throw new Error(message)
      }

      setForm(emptyForm)
      setShowAddForm(false)

      setSuccessMessage(
        `${data.full_name} was added successfully.`,
      )

      await loadPatients()
    } catch (err) {
      console.error(err)

      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to create patient.",
      )
    } finally {
      setSaving(false)
    }
  }

  function openAddForm() {
    setForm(emptyForm)
    setFormError("")
    setSuccessMessage("")
    setShowAddForm(true)
  }

  function closeAddForm() {
    if (saving) {
      return
    }

    setShowAddForm(false)
    setFormError("")
  }

  return (
    <div className="patients-page">
      <header className="patients-header">
        <div>
          <div className="eyebrow">
            PATIENT MANAGEMENT
          </div>

          <h1>Patients</h1>

          <p>
            Manage patient records, contact information, and
            status.
          </p>
        </div>

        <button
          type="button"
          className="add-patient-btn"
          onClick={openAddForm}
        >
          + Add Patient
        </button>
      </header>

      {successMessage && (
        <div
          style={{
            marginBottom: "20px",
            padding: "14px 18px",
            borderRadius: "12px",
            background: "rgba(34, 197, 94, 0.10)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            color: "#4ade80",
          }}
        >
          ✓ {successMessage}
        </div>
      )}

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

        <button
          type="button"
          className="filter-btn"
        >
          All Patients ▾
        </button>
      </section>

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
          <div
            style={{
              padding: "30px",
              color: "#748198",
            }}
          >
            Loading patients...
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              padding: "30px",
              color: "#f87171",
            }}
          >
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
                            {patient.email ??
                              "No email provided"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>{patient.patient_id}</td>

                    <td>—</td>

                    <td>
                      {patient.gender ?? "—"}
                    </td>

                    <td>
                      {patient.phone ?? "—"}
                    </td>

                    <td>
                      <span
                        className={`patient-status ${
                          patient.status.toLowerCase() ===
                          "active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/patients/${encodeURIComponent(
                          patient.patient_id,
                        )}`}
                        className="view-btn"
                      >
                        View →
                      </Link>
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

      {showAddForm && (
        <div
          onClick={closeAddForm}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "720px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#101722",
              border: "1px solid #253044",
              borderRadius: "18px",
              padding: "28px",
              boxShadow:
                "0 24px 80px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div>
                <div className="eyebrow">
                  NEW RECORD
                </div>

                <h2
                  style={{
                    margin: "6px 0",
                    color: "#f3f4f6",
                  }}
                >
                  Add Patient
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#748198",
                  }}
                >
                  Create a new patient record.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddForm}
                disabled={saving}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#94a3b8",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {formError && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background:
                    "rgba(248, 113, 113, 0.10)",
                  border:
                    "1px solid rgba(248, 113, 113, 0.25)",
                  color: "#f87171",
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleAddPatient}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "18px",
                }}
              >
                <label>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Full Name *
                  </span>

                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleFormChange}
                    placeholder="Enter full name"
                    required
                    style={inputStyle}
                  />
                </label>

                <label>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Date of Birth
                  </span>

                  <input
                    type="date"
                    name="date_of_birth"
                    value={form.date_of_birth}
                    onChange={handleFormChange}
                    style={inputStyle}
                  />
                </label>

                <label>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Gender
                  </span>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleFormChange}
                    style={inputStyle}
                  >
                    <option value="">
                      Select gender
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </label>

                <label>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Phone
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="Enter phone number"
                    style={inputStyle}
                  />
                </label>

                <label
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Email *
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="patient@example.com"
                    required
                    style={inputStyle}
                  />
                </label>

                <label
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Address
                  </span>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleFormChange}
                    placeholder="Enter address"
                    rows={2}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </label>

                <label>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Medical History
                  </span>

                  <textarea
                    name="medical_history"
                    value={form.medical_history}
                    onChange={handleFormChange}
                    placeholder="Optional"
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </label>

                <label>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#cbd5e1",
                      fontSize: "14px",
                    }}
                  >
                    Allergies
                  </span>

                  <textarea
                    name="allergies"
                    value={form.allergies}
                    onChange={handleFormChange}
                    placeholder="Optional"
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "26px",
                }}
              >
                <button
                  type="button"
                  onClick={closeAddForm}
                  disabled={saving}
                  className="filter-btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="add-patient-btn"
                >
                  {saving
                    ? "Saving..."
                    : "Create Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients