import { useState, type ComponentType } from "react"
import { NavLink, Routes, Route } from "react-router-dom"
import "./App.css"

/*
  ============================================================
  CAREFLOW APP SHELL

  Any .tsx page placed inside src/pages/ will automatically
  become a route.

  Examples:

  src/pages/dashboard.tsx
  → /dashboard

  src/pages/patients.tsx
  → /patients

  src/pages/doctors.tsx
  → /doctors

  src/pages/appointments.tsx
  → /appointments

  You do NOT need to edit App.tsx when adding those pages.
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
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

  /*
    Get every page automatically.

    Example:
    dashboard.tsx → dashboard
    patients.tsx → patients
    doctors.tsx → doctors
  */

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

      {/* ======================================================
          LOGO
          ====================================================== */}

      <div className="logo">

        <div className="logo-mark">
          ✚
        </div>

        <strong>
          CareFlow
        </strong>

      </div>


      {/* ======================================================
          NAVIGATION
          ====================================================== */}

      <nav
        className="sidebar-nav"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HOME */}

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


        {/* AUTOMATIC PAGES */}

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


      {/* ======================================================
          SIDEBAR BOTTOM
          ====================================================== */}

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


  /*
    Automatically create routes for every page
    inside src/pages/.
  */

  const automaticRoutes = Object.entries(pageModules)
    .map(([filePath, module]) => {

      const pageName = getPageName(filePath)

      return {
        pageName,
        Component: module.default,
      }
    })


  return (
    <div
      className={`app ${
        sidebarOpen ? "sidebar-open" : ""
      }`}
    >

      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <main className="main-content">

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* AUTOMATIC PAGE ROUTES */}

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