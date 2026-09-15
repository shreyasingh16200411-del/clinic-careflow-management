import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function AddDoctor() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("Active")

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const response = await fetch(
      "http://127.0.0.1:8000/api/doctors/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          specialization: specialization,
          phone: phone,
          email: email,
          status: status,
        }),
      },
    )

    if (!response.ok) {
      alert("Failed to save doctor.")
      return
    }

    alert("Doctor saved successfully.")

    navigate("/doctors")
  }

  return (
    <div>
      <Link to="/doctors">← Back to Doctors</Link>

      <h1>Add Doctor</h1>

      <p>Create a new doctor profile.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
            required
          />
        </label>

        <br />

        <label>
          Specialization
          <input
            type="text"
            value={specialization}
            onChange={(event) =>
              setSpecialization(event.target.value)
            }
            required
          />
        </label>

        <br />

        <label>
          Phone
          <input
            type="text"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
          />
        </label>

        <br />

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </label>

        <br />

        <label>
          Status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        <br />

        <button type="submit">
          Save Doctor
        </button>
      </form>
    </div>
  )
}