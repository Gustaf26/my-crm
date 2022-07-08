import React from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

function Home() {
  const [option, setOption] = useState("none")

  return (
    <form
      id="welcome-form"
      class="border border-dark rounded login-form p-4 d-flex flex-column align-items-center ml-0"
    >
      <h5 class="p-3">MY CRM</h5>
      <div className="d-flex w-100 justify-content-center mx-auto">
        <button
          type="button"
          className="btn bg-transparent border border-dark font-weight-bold px-3"
          onClick={() => setOption("register")}
        >
          Register
        </button>
        <p className="p-3">Or</p>
        <button
          type="button"
          className="btn bg-transparent border border-dark font-weight-bold p-3"
          onClick={() => {
            setOption("login")
          }}
        >
          Log in
        </button>

        {option === "login" ? (
          <Navigate to="/login" />
        ) : option === "register" ? (
          <Navigate to="/register" />
        ) : null}
      </div>
    </form>
  )
}

export default Home
