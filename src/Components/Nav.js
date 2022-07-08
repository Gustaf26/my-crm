import React from "react"
const Nav = () => {
  return (
    <nav className="nav flex-column bg-dark shadow-sm font-italic rounded p-4">
      <a href="index.html" className="w-100">
        <h6 className="text-white">MY CRM</h6>
      </a>
      <a id="1" href="campaigns.html" className="nav-link rounded-pill">
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
            // onClick={setCategory("sales")}
            href="products.html"
          >
            Sales
          </a>
          <div className="dropdown-divider"></div>
          <a
            className="dropdown-item py-2"
            onclick="setCategory('new_arrivals')"
            href="products.html"
          >
            New Arrivals
          </a>
          <div className="dropdown-divider"></div>
          <a
            className="dropdown-item py-2"
            onclick="setCategory('Second_hand')"
            href="products.html"
          >
            Second Hand
          </a>
        </div>
      </div>
      <a id="3" href="createprod.html" className="nav-link rounded-pill">
        <i className="fa fa-plus mr-2"></i>
        <span>Create product</span>
      </a>
      <a
        id="4"
        href="updateProduct.html"
        className="nav-link d-flex links rounded-pill"
      >
        <i className="fa fa-pencil mr-2"></i>
        <span>Update product</span>
      </a>
      <a
        id="4"
        href="#"
        onclick="logout()"
        className="nav-link d-flex links rounded-pill"
      >
        <i className="fa fa-user mr-2"></i>
        <span>Log out</span>
      </a>
    </nav>
  )
}

export default Nav
