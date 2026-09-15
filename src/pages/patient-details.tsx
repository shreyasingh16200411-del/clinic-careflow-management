import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./patient details.css"

type Patient = {
  patient_id: number
  full_name: string
  date_of_birth: string
  gender: string
  phone: string
  email: string
  address: string
  blood_group: string
  medical_history: string
  allergies: string
  status: string
}

export default function PatientDetails() {
  const { patientId } = useParams<{ patientId: string }>()

  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadPatient() {
      if (!patientId) {
        if (!cancelled) {
          setError("Patient ID is missing.")
          setLoading(false)
        }
        return
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/patients/${patientId}`,
        )

        if (!response.ok) {
          throw new Error("Patient not found.")
        }

        const data: Patient = await response.json()

        if (!cancelled) {
          setPatient(data)
        }
      } catch (err) {
        console.error(err)

        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError("Unable to load patient details.")
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPatient()

    return () => {
      cancelled = true
    }
  }, [patientId])

  if (loading) {
    return (
      <div className="patient-details-page">
        <Link to="/patients" className="patient-details-back">
          ← Back to Patients
        </Link>

        <p className="patient-details-loading">
          Loading patient details...
        </p>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="patient-details-page">
        <Link to="/patients" className="patient-details-back">
          ← Back to Patients
        </Link>

        <div className="patient-details-error">
          <h2>Unable to load patient</h2>

          <p>{error || "Patient details are unavailable."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="patient-details-page">
      <Link to="/patients" className="patient-details-back">
        ← Back to Patients
      </Link>

      <div className="patient-details-header">
        <div className="patient-profile-left">
          <div className="patient-details-avatar">
            {patient.full_name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="patient-details-name">
              {patient.full_name}
            </h1>

            <p className="patient-details-id">
              Patient ID: {patient.patient_id}
            </p>
          </div>
        </div>

        <span className="patient-details-status">
          {patient.status}
        </span>
      </div>

      <div className="patient-details-grid">
        <section className="patient-details-card">
          <h2 className="patient-details-card-title">
            Personal Information
          </h2>

          <div className="patient-info-list">
            <div className="patient-info-row">
              <span className="patient-info-label">
                Date of Birth
              </span>

              <span className="patient-info-value">
                {patient.date_of_birth || (
                  <span className="patient-empty-value">
                    Not provided
                  </span>
                )}
              </span>
            </div>

            <div className="patient-info-row">
              <span className="patient-info-label">
                Gender
              </span>

              <span className="patient-info-value">
                {patient.gender || (
                  <span className="patient-empty-value">
                    Not provided
                  </span>
                )}
              </span>
            </div>

            <div className="patient-info-row">
              <span className="patient-info-label">
                Phone
              </span>

              <span className="patient-info-value">
                {patient.phone || (
                  <span className="patient-empty-value">
                    Not provided
                  </span>
                )}
              </span>
            </div>

            <div className="patient-info-row">
              <span className="patient-info-label">
                Email
              </span>

              <span className="patient-info-value">
                {patient.email || (
                  <span className="patient-empty-value">
                    Not provided
                  </span>
                )}
              </span>
            </div>

            <div className="patient-info-row">
              <span className="patient-info-label">
                Address
              </span>

              <span className="patient-info-value">
                {patient.address || (
                  <span className="patient-empty-value">
                    Not provided
                  </span>
                )}
              </span>
            </div>
          </div>
        </section>

        <section className="patient-details-card">
          <h2 className="patient-details-card-title">
            Medical Information
          </h2>

          <div className="patient-info-list">
            <div className="patient-info-row">
              <span className="patient-info-label">
                Blood Group
              </span>

              <span className="patient-info-value">
                {patient.blood_group || (
                  <span className="patient-empty-value">
                    Not provided
                  </span>
                )}
              </span>
            </div>

            <div className="patient-info-row">
              <span className="patient-info-label">
                Medical History
              </span>

              <span className="patient-info-value">
                {patient.medical_history || (
                  <span className="patient-empty-value">
                    None
                  </span>
                )}
              </span>
            </div>

            <div className="patient-info-row">
              <span className="patient-info-label">
                Allergies
              </span>

              <span className="patient-info-value">
                {patient.allergies || (
                  <span className="patient-empty-value">
                    None
                  </span>
                )}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}