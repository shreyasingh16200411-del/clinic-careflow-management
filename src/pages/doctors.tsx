import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./doctors.css"

type Doctor = {
  id: number
  doctor_id: string
  full_name: string
  specialization: string
  phone: string | null
  email: string | null
  status: string
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/doctors/")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data)
      })
      .catch((error) => {
        console.error("Failed to load doctors:", error)
      })
  }, [])

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <div>
          <h1 className="doctors-title">Doctors</h1>

          <p className="doctors-subtitle">
            Manage doctors and staff information.
          </p>
        </div>

        <Link to="/add-doctor">
          + Add Doctor
        </Link>
      </div>

      <div className="doctors-list">
        {doctors.map((doctor) => (
          <div
            className="doctor-card"
            key={doctor.doctor_id}
          >
            <div className="doctor-card-top">
              <div className="doctor-avatar">
                {doctor.full_name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div>
                <h2 className="doctor-name">
                  {doctor.full_name}
                </h2>

                <p className="doctor-specialization">
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="doctor-info">
              <div className="doctor-info-row">
                <span className="doctor-label">
                  Phone
                </span>

                <span className="doctor-value">
                  {doctor.phone}
                </span>
              </div>

              <div className="doctor-info-row">
                <span className="doctor-label">
                  Email
                </span>

                <span className="doctor-value">
                  {doctor.email}
                </span>
              </div>

              <div className="doctor-info-row">
                <span className="doctor-label">
                  Status
                </span>

                <span className="doctor-value doctor-status">
                  {doctor.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}