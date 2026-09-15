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
    <div className="page">
      <h1>Doctors</h1>

      <p>Manage doctors and staff information.</p>

      {doctors.map((doctor) => (
        <div key={doctor.doctor_id}>
          <h2>{doctor.full_name}</h2>
          <p>Specialization: {doctor.specialization}</p>
          <p>Phone: {doctor.phone}</p>
          <p>Email: {doctor.email}</p>
          <p>Status: {doctor.status}</p>
        </div>
      ))}
    </div>
  )
}