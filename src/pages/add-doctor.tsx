import { Link } from "react-router-dom"

export default function AddDoctor() {
  return (
    <div>
      <Link to="/doctors">← Back to Doctors</Link>

      <h1>Add Doctor</h1>

      <p>Create a new doctor profile.</p>

      <form>
        <label>
          Full Name
          <input type="text" />
        </label>

        <br />

        <label>
          Specialization
          <input type="text" />
        </label>

        <br />

        <label>
          Phone
          <input type="text" />
        </label>

        <br />

        <label>
          Email
          <input type="email" />
        </label>

        <br />

        <label>
          Status
          <select defaultValue="Active">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        <br />

        <button type="button">
          Save Doctor
        </button>
      </form>
    </div>
  )
}