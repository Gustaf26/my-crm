import React, { useEffect, useState, useContext } from "react"
import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faSquarePen } from "@fortawesome/free-solid-svg-icons"

function Product({ productShowing, prodCampInfo }) {
  const [activeSlide, setActive] = useState(false)
  const [prodId, setId] = useState("")
  const handler = useContext(UserContext)
  const singleProdParam = useParams()
  const [navigateToUpdate, setNavigate] = useState(false)
  const [prodDiscount, setDiscount] = useState(0)
  const [deletedProd, setDeleted] = useState(false)
  const [goToProds, setGoToProds] = useState(false)
  const [prodFromParams, setParamProd] = useState("")
  const [campFromProdParams, setParamCamp] = useState("")

  const goToUpdate = () => {
    handler.setSingleProd(prodFromParams ? prodFromParams : productShowing)
    setNavigate(true)
  }

  const deleteProd = () => {
    let allProds = handler.products
    allProds.map((cat, index) => {
      let catName
      let catProds
      catName = Object.keys(cat).toString()
      catProds = allProds[index][`${catName}`].filter(product => {
        return Number(product.id) !== Number(singleProdParam.id)
      })
      allProds[index][`${catName}`] = catProds
      handler.updateProducts(allProds)
    })

    setDeleted(true)

    setTimeout(() => {
      setGoToProds(true)
      setId("")
    }, 3000)
  }

  const getCampDiscount = () => {
    handler.campaigns.map(campaign => {
      if (campaign.info === prodCampInfo) {
        setDiscount(Number(campaign.discount) / 100)
      } else if (campaign.info === handler.campInfo) {
        setDiscount(Number(campaign.discount) / 100)
      }
    })
  }

  useEffect(() => {
    setActive(true)
    getCampDiscount()

    return () => {
      setActive(false)
      handler.setSingleProd("")
    }
  }, [])

  useEffect(() => {
    // Populate the cards with right prod if navigating back
    // to product with id as a param
    if (singleProdParam.id) {
      handler.products.map((cat, index) => {
        let catName
        catName = Object.keys(cat).toString()
        handler.products[index][`${catName}`].map(product => {
          if (Number(product.id) === Number(singleProdParam.id)) {
            setParamProd(product)
          }
        })
      })

      handler.campaigns.map(camp => {
        if (camp.kod.toString() === prodFromParams.campaign) {
          setParamCamp(camp.info)
          alert("hello")
        }
      })
    }
  }, [])

  return (
    <div
      className={
        prodFromParams
          ? "d-flex single-prod-slide pt-5 mt-3"
          : activeSlide
          ? "d-flex mySlides active-slide pt-5 mt-3"
          : "d-flex mySlides pt-5 mt-3"
      }
    >
      {!prodId && !deletedProd ? (
        <div
          className="bbb_deals"
          onClick={
            handler.singleProd.id !== productShowing.id && !singleProdParam.id
              ? () => {
                  handler.setSingleProd(
                    prodFromParams ? prodFromParams : productShowing
                  )
                  handler.setCampInfo(
                    campFromProdParams ? campFromProdParams : prodCampInfo
                  )
                  setId(prodFromParams ? prodFromParams.id : productShowing.id)
                }
              : null
          }
        >
          {(prodCampInfo || handler.campInfo) && (
            <div id="campaign-info-wrapper">
              <span className="rib">
                {prodCampInfo ? prodCampInfo : handler.campInfo}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {prodCampInfo ? prodCampInfo : handler.campInfo}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {window.innerWidth < 1000
                  ? `${prodCampInfo ? prodCampInfo : handler.campInfo}`
                  : null}
              </span>
            </div>
          )}
          {singleProdParam.id && (
            <div
              id="update-delete-prod-wrapper"
              className="w-100 d-flex justify-content-center"
            >
              <FontAwesomeIcon
                icon={faSquarePen}
                className="icon mr-2"
                onClick={goToUpdate}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="icon ml-2"
                onClick={deleteProd}
              />
            </div>
          )}
          {(productShowing || prodFromParams) && (
            <div className="bbb_deals_item">
              <div className="bbb_deals_image">
                <img
                  src={productShowing ? productShowing.img : prodFromParams.img}
                  alt="product"
                />
              </div>
              <div className="bbb_deals_content">
                <div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                  <div className="bbb_deals_item_price_a ml-auto">
                    <strike>
                      {productShowing
                        ? productShowing.price
                        : prodFromParams.price}
                    </strike>
                  </div>
                </div>
                <div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                  <div className="bbb_deals_item_price ml-auto">
                    {productShowing
                      ? productShowing.price -
                        productShowing.price * prodDiscount
                      : prodFromParams.price -
                        prodFromParams.price * prodDiscount}
                  </div>
                </div>
                <div className="end-of-card">
                  <div className="bbb_deals_item_name w-100 pt-2">
                    {productShowing
                      ? productShowing.model.charAt(0).toUpperCase() +
                        productShowing.model.slice(1)
                      : prodFromParams.model.charAt(0).toUpperCase() +
                        prodFromParams.model.slice(1)}
                  </div>
                  <div className="available">
                    <div className="available_line d-flex flex-column align-items-center justify-content-center">
                      <div>Rating</div>
                      <div className="sold_stars d-flex py-2 mx-auto">
                        <i className="fa fa-star mx-2"></i>
                        <i className="fa fa-star mx-2"></i>
                        <i className="fa fa-star mx-2"></i>
                      </div>
                    </div>
                    <div>
                      <span style={{ width: "17%" }}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : deletedProd && !goToProds ? (
        <div
          id="delete-success-message"
          className="text-primary mh-25 text-large p-4 mx-auto"
        >
          <h6>SUCCESS!</h6>
          <p className="text-white">Redirecting...</p>
          <div className="spinner-grow text-primary"></div>
        </div>
      ) : goToProds ? (
        <Navigate to="/products" />
      ) : (
        <Navigate to={`/product/${prodId}`} />
      )}

      {navigateToUpdate && <Navigate to="/update" />}
    </div>
  )
}

export default Product
