import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"

const Nav = () => {
  const handler = useContext(UserContext)

  const logout = () => {
    handler.setLogin(false)
  }

  return (
    <div>
      <nav
        className={
          handler.activeMenu
            ? "active nav flex-column bg-dark shadow-sm font-italic rounded mx-2 px-2"
            : "nav flex-column bg-dark shadow-sm font-italic rounded mx-2 px-2"
        }
      >
        <Link to="/">
          <h6 className="w-100 text-white">MY CRM</h6>
        </Link>
        <Link className="nav-link rounded-pill" to="/campaigns">
          <i className="fa fa-solid fa-percent mr-2"></i>
          <span>Campaigns</span>
        </Link>
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
            <Link
              className="dropdown-item py-2"
              onClick={() => handler.setCategory("sales")}
              to="/products"
            >
              Sales
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item py-2"
              onClick={() => handler.setCategory("new_arrivals")}
              to="/products"
            >
              New Arrivals
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              to="/products"
              className="dropdown-item py-2"
              onClick={() => handler.setCategory("Second_hand")}
            >
              Second Hand
            </Link>
          </div>
        </div>
        <a id="3" href="#" className="nav-link rounded-pill">
          <i className="fa fa-plus mr-2"></i>
          <span>Create product</span>
        </a>
        <Link to="/update" className="nav-link d-flex links rounded-pill">
          <i className="fa fa-pencil mr-2"></i>
          <span>Update product</span>
        </Link>
        <Link
          id="4"
          href="#"
          onClick={logout}
          to="/login"
          className="nav-link d-flex links rounded-pill"
        >
          <i className="fa fa-user mr-2"></i>
          <span>Log out</span>
        </Link>
      </nav>
    </div>
  )
}

export default Nav
