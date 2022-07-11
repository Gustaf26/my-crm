import "./Styles/App.css"
import { Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { UserContext } from "./Hooks/userContext"
import UpdateProd from "./Components/UpdateProd"
import Product from "./Components/Product"
import LoginForm from "./Components/LoginForm"
import Products from "./Components/Products"
import Register from "./Components/Register"
import Campaigns from "./Components/Campaigns"
import Index from "./Components/Index"
import Nav from "./Components/Nav"

function App() {
  const [products, setProducts] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loggedIn, setloginStatus] = useState(false)
  const [userRegistered, setRegistered] = useState(false)
  const [productsCategory, setCategory] = useState("sales")
  const [activeMenu, setToActive] = useState(false)
  const [singleProd, setSingleProd] = useState("")
  const [campInfo, setCampInfo] = useState("")

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
          loggedIn,
          products,
          campaigns,
          updateCampaigns: setCampaigns,
          updateProducts: setProducts,
          setLogin: setloginStatus,
          userRegistered,
          register: setRegistered,
          productsCategory,
          setCategory,
          activateMenu: setToActive,
          activeMenu,
          singleProd,
          setSingleProd,
          campInfo,
          setCampInfo,
        }}
      >
        {loggedIn && <Nav />}
        <div className="d-flex justify-content-center align-items-start h-100 m-0">
          <Routes>
            <Route exact path={"/"} element={<Index />}></Route>
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<LoginForm />} />
            <Route path={"/products"} element={<Products />} />
            <Route path={"/campaigns"} element={<Campaigns />} />
            <Route path={"/update"} element={<UpdateProd />} />
            <Route
              path={"/product/:id"}
              element={<Product prod={singleProd} campInfo={campInfo} />}
            />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App
