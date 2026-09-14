import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

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

export default function PatientDetails() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadPatient() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          `http://127.0.0.1:8000/api/patients/${patientId}`,
        )

        if (!response.ok) {
          throw new Error("Patient not found.")
        }

        const data: Patient = await response.json()
        setPatient(data)
      } catch (err) {
        console.error(err)
        setError("Unable to load patient details.")
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      loadPatient()
    }
  }, [patientId])

  if (loading) {
    return <div className="page">Loading patient details...</div>
  }

  if (error || !patient) {
    return (
      <div className="page">
        <h2>Patient not found</h2>
        <p>{error}</p>

        <Link to="/patients">
          ← Back to Patients
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/patients">
        ← Back to Patients
      </Link>

      <div style={{ marginTop: "24px" }}>
        <h1>{patient.full_name}</h1>

        <p>
          Patient ID: <strong>{patient.patient_id}</strong>
        </p>

        <p>
          Status: <strong>{patient.status}</strong>
        </p>

        <hr />

        <h2>Personal Information</h2>

        <p>
          <strong>Date of Birth:</strong>{" "}
          {patient.date_of_birth || "Not provided"}
        </p>

        <p>
          <strong>Gender:</strong>{" "}
          {patient.gender || "Not provided"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {patient.phone || "Not provided"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {patient.email || "Not provided"}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {patient.address || "Not provided"}
        </p>

        <hr />

        <h2>Medical Information</h2>

        <p>
          <strong>Medical History:</strong>{" "}
          {patient.medical_history || "None provided"}
        </p>

        <p>
          <strong>Allergies:</strong>{" "}
          {patient.allergies || "None provided"}
        </p>
      </div>
    </div>
  )
}