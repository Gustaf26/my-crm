import React, { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"
import Nav from "./Nav"

function Index() {
  const handler = useContext(UserContext)

  useEffect(() => {
    handler.activateMenu(true)

    return () => {
      handler.activateMenu(false)
    }
  }, [])

  return (
    <div className="w-100">
      <Nav />
      {handler.loggedIn ? (
        <div class="d-flex w-100 ml-auto welcome-container justify-content-center align-items-start">
          <h4 id="greeting">Welcome, {handler.userRegistered.email}</h4>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}
export default Index
