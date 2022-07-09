import React, { useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"

const Nav = () => {
  const handler = useContext(UserContext)

  const logout = () => {
    handler.setLogin(false)
  }

  return (
    <div>
      {handler.loggedIn ? (
        <nav className="nav flex-column bg-dark shadow-sm font-italic rounded p-4">
          <a className="w-100">
            <Link to="/home">
              <h6 className="text-white">MY CRM</h6>
            </Link>
          </a>
          <a id="1" className="nav-link rounded-pill">
            <i className="fa fa-solid fa-percent mr-2"></i>
            <span>Campaigns</span>
          </a>
          <div className="dropdown show">
            <a
              className="nav-link rounded-pill dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              role="button"
              id="dropdownMenuLink"
            >
              <i className="fa fa-eye mr-2"></i>
              <span>See products</span>
            </a>
            <div
              className="dropdown-menu ml-4 w-75 py-3"
              aria-labelledby="dropdownMenuLink"
            >
              <a
                className="dropdown-item py-2"
                onClick={() => handler.setCategory("sales")}
              >
                <Link to="/products">Sales</Link>
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item py-2"
                onClick={() => handler.setCategory("new_arrivals")}
              >
                <Link to="/products">New Arrivals</Link>
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item py-2"
                onClick={() => handler.setCategory("Second_hand")}
              >
                <Link to="/products">Second Hand</Link>
              </a>
            </div>
          </div>
          <a id="3" href="#" className="nav-link rounded-pill">
            <i className="fa fa-plus mr-2"></i>
            <span>Create product</span>
          </a>
          <a id="4" href="#" className="nav-link d-flex links rounded-pill">
            <i className="fa fa-pencil mr-2"></i>
            <span>Update product</span>
          </a>
          <a
            id="4"
            href="#"
            onClick={logout}
            className="nav-link d-flex links rounded-pill"
          >
            <i className="fa fa-user mr-2"></i>
            <span>Log out</span>
          </a>
        </nav>
      ) : (
        <Navigate to="/register" />
      )}
    </div>
  )
}

export default Nav
