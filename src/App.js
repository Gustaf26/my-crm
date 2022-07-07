import "./Styles/App.css"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from "./Components/Home"
import LoginForm from "./Components/LoginForm"
import Products from "./Components/Products"
import Register from "./Components/Register"

function App() {
  const [notLoggedIn, setloginStatus] = useState(true)
  return (
    <div id="main-container">
      <div
        class="d-flex justify-content-center align-items-start"
        id="form-container"
      >
        <Routes>
          <Route exact path={"/"} element={<Home />}></Route>
          <Route path={"/register"} element={<Register />} />
          <Route
            path={"/login"}
            element={
              <LoginForm notLoggedIn={notLoggedIn} setLogin={setloginStatus} />
            }
          />
          <Route path={"/products"} element={<Products />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
