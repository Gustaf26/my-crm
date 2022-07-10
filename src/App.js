import "./Styles/App.css"
import { Routes, Route } from "react-router-dom"
import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./Hooks/userContext"
import UpdateProd from "./Components/UpdateProd"
import LoginForm from "./Components/LoginForm"
import Products from "./Components/Products"
import Register from "./Components/Register"
import Campaigns from "./Components/Campaigns"
import Index from "./Components/Index"

function App() {
  const [products, setProducts] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loggedIn, setloginStatus] = useState(false)
  const [userRegistered, setRegistered] = useState(false)
  const [productsCategory, setCategory] = useState("sales")
  const [activeMenu, setToActive] = useState(false)

  const getProdsFromStorage = () => {
    fetch("./Db/products.json")
      .then(res => res.json())
      .then(res => {
        setProducts(res.products)
      })
      .catch(err => console.log(err))
  }

  const getCampaignsFromStorage = () => {
    fetch("./Db/campaigns.json")
      .then(res => res.json())
      .then(res => {
        setCampaigns(res.campaigns)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (loggedIn === true) {
      getProdsFromStorage()
      getCampaignsFromStorage()
    }
  }, [loggedIn])

  return (
    <div id="main-container">
      <UserContext.Provider
        value={{
          loggedIn: loggedIn,
          products: products,
          campaigns: campaigns,
          updateCampaigns: setCampaigns,
          updateProducts: setProducts,
          setLogin: setloginStatus,
          userRegistered: userRegistered,
          register: setRegistered,
          productsCategory: productsCategory,
          setCategory: setCategory,
          activateMenu: setToActive,
          activeMenu: activeMenu,
        }}
      >
        <div className="d-flex justify-content-center align-items-start m-0">
          <Routes>
            <Route exact path={"/"} element={<Index />}></Route>
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<LoginForm />} />
            <Route path={"/products"} element={<Products />} />
            <Route path={"/campaigns"} element={<Campaigns />} />
            <Route path={"/update"} element={<UpdateProd />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App
