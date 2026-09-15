import {Link} from 
"react-router-dom"
import "./doctors.css"

type Doctor = {
  doctor_id: number
  full_name: string
  specialization: string
  phone: string
  email: string
  status: string
}

export default function Doctors() {

  const doctors: Doctor[] = [
    {
      doctor_id: 1,
      full_name: "Dr. Rahul Sharma",
      specialization: "Cardiology",
      phone: "9876543210",
      email: "rahul.sharma@careflow.com",
      status: "Active",
    },
    {
      doctor_id: 2,
      full_name: "Dr. Priya Mehta",
      specialization: "Dermatology",
      phone: "9876543211",
      email: "priya.mehta@careflow.com",
      status: "Active",
    },
  ]

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
          <div className="doctor-card" key={doctor.doctor_id}>
            <div className="doctor-card-top">
              <div className="doctor-avatar">
                {doctor.full_name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div>
                <h2 className="doctor-name">{doctor.full_name}</h2>

                <p className="doctor-specialization">
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="doctor-info">
              <div className="doctor-info-row">
                <span className="doctor-label">Phone</span>
                <span className="doctor-value">{doctor.phone}</span>
              </div>

              <div className="doctor-info-row">
                <span className="doctor-label">Email</span>
                <span className="doctor-value">{doctor.email}</span>
              </div>

              <div className="doctor-info-row">
                <span className="doctor-label">Status</span>
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