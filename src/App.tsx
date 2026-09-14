import {
  useState,
  type ComponentType,
  type Dispatch,
  type SetStateAction,
} from "react"
import { NavLink, Routes, Route } from "react-router-dom"
import "./App.css"

/*
  ============================================================
  CAREFLOW APP SHELL

  Pages inside src/pages/ are automatically discovered.

  Examples:
  dashboard.tsx → /dashboard
  patients.tsx → /patients
  doctors.tsx → /doctors
  ============================================================
*/


/* ============================================================
   AUTOMATIC PAGE DISCOVERY
   ============================================================ */

type PageModule = {
  default: ComponentType
}

const pageModules = import.meta.glob("./pages/*.tsx", {
  eager: true,
}) as Record<string, PageModule>


/* ============================================================
   PAGE NAME HELPERS
   ============================================================ */

function getPageName(filePath: string) {
  const fileName = filePath
    .split("/")
    .pop()
    ?.replace(".tsx", "")

  if (!fileName) {
    return ""
  }

  return fileName
}


function formatPageName(name: string) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}


/* ============================================================
   HOME PAGE
   ============================================================ */

function Home() {
  return (
    <div className="home-page">

      <div className="home-content">

        <div className="home-eyebrow">
          CAREFLOW CLINIC MANAGEMENT
        </div>

        <h1>
          Everything your clinic needs,
          <br />
          <span>in one place.</span>
        </h1>

        <p>
          Manage patients, appointments, doctors, services,
          and clinic performance from one simple workspace.
        </p>

        <div className="home-actions">

          <NavLink
            to="/dashboard"
            className="primary-button"
          >
            Open Dashboard →
          </NavLink>

          <NavLink
            to="/patients"
            className="secondary-button"
          >
            View Patients
          </NavLink>

        </div>

      </div>


      <div className="home-overview">

        <div className="overview-card">
          <span>ACTIVE PATIENTS</span>
          <strong>1,248</strong>
          <small>↑ 8.2% this month</small>
        </div>

        <div className="overview-card">
          <span>TODAY'S APPOINTMENTS</span>
          <strong>12</strong>
          <small>4 completed</small>
        </div>

        <div className="overview-card">
          <span>MONTHLY REVENUE</span>
          <strong>₹8.4L</strong>
          <small>↑ 12.5% this month</small>
        </div>

      </div>

    </div>
  )
}


/* ============================================================
   SIDEBAR ICONS
   ============================================================ */

const icons: Record<string, string> = {
  dashboard: "▦",
  patients: "♙",
  doctors: "✚",
  appointments: "◷",
  services: "◇",
  reports: "▥",
  settings: "⚙",
}


/* ============================================================
   SIDEBAR
   ============================================================ */

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}) {

  const pages = Object.keys(pageModules)
    .map(getPageName)
    .filter((page) => page !== "App")
    .sort((a, b) => {

      const order = [
        "dashboard",
        "patients",
        "doctors",
        "appointments",
        "services",
        "reports",
        "settings",
      ]

      const aIndex = order.indexOf(a)
      const bIndex = order.indexOf(b)

      if (aIndex === -1 && bIndex === -1) {
        return a.localeCompare(b)
      }

      if (aIndex === -1) {
        return 1
      }

      if (bIndex === -1) {
        return -1
      }

      return aIndex - bIndex
    })


  return (
    <aside
      className={`sidebar ${sidebarOpen ? "sidebar-expanded" : ""}`}
      onClick={() => setSidebarOpen((current) => !current)}
      onMouseEnter={() => setSidebarOpen(true)}
    >

      <div className="logo">

        <div className="logo-mark">
          ✚
        </div>

        <strong>
          CareFlow
        </strong>

      </div>


      <nav
        className="sidebar-nav"
        onClick={(event) => event.stopPropagation()}
      >

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >

          <span className="nav-icon">
            ⌂
          </span>

          <span className="nav-label">
            Home
          </span>

        </NavLink>


        {pages.map((page) => (

          <NavLink
            key={page}
            to={`/${page}`}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >

            <span className="nav-icon">
              {icons[page] ?? "•"}
            </span>

            <span className="nav-label">
              {formatPageName(page)}
            </span>

          </NavLink>

        ))}

      </nav>


      <div
        className="sidebar-bottom"
        onClick={(event) => event.stopPropagation()}
      >

        <div className="admin-avatar">
          DA
        </div>

        <div className="admin-info">

          <strong>
            Dr. Admin
          </strong>

          <span>
            Administrator
          </span>

        </div>

      </div>

    </aside>
  )
}


/* ============================================================
   MAIN APP
   ============================================================ */

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false)


  const automaticRoutes = Object.entries(pageModules)
    .map(([filePath, module]) => {

      const pageName = getPageName(filePath)

      return {
        pageName,
        Component: module.default,
      }
    })


  /*
    Patient Details uses a dynamic route.

    /patients/CF-1001
    /patients/CF-1002
    /patients/CF-1003

    All use the same Patient Details component.
  */

  const PatientDetails =
    pageModules["./pages/patient-details.tsx"]?.default


  return (
    <div
      className={`app ${
        sidebarOpen ? "sidebar-open" : ""
      }`}
    >

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />


          {/* ==================================================
              DYNAMIC PATIENT DETAILS ROUTE
              ================================================== */}

          {PatientDetails && (
            <Route
              path="/patients/:patientId"
              element={<PatientDetails />}
            />
          )}


          {/* ==================================================
              AUTOMATIC PAGE ROUTES
              ================================================== */}

          {automaticRoutes.map(
            ({ pageName, Component }) => (

              <Route
                key={pageName}
                path={`/${pageName}`}
                element={<Component />}
              />

            )
          )}

        </Routes>

      </main>

    </div>
  )
}


export default App