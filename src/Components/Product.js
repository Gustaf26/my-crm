import React, { useEffect, useState, useContext } from "react"
import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faSquarePen } from "@fortawesome/free-solid-svg-icons"

function Product({ prod, campInfo }) {
  const [activeSlide, setActive] = useState(false)
  const [prodId, setId] = useState("")
  const handler = useContext(UserContext)
  const singleProdShowing = useParams()
  const [navigateToUpdate, setNavigate] = useState(false)
  const [prodDiscount, setDiscount] = useState(0)

  const goToUpdate = () => {
    handler.setSingleProd(prod)
    setNavigate(true)
  }

  const getCampDiscount = () => {
    handler.campaigns.map(campaign => {
      if (campaign.info === campInfo) {
        setDiscount(Number(campaign.discount) / 100)
      }
    })
  }

  useEffect(() => {
    setActive(true)
    getCampDiscount()

    return () => {
      setActive(false)
    }
  }, [])

  return (
    <div
      className={
        Number(singleProdShowing.id) === prod.id
          ? "d-flex single-prod-slide pt-5 mt-3"
          : activeSlide
          ? "d-flex mySlides active-slide pt-5 mt-3"
          : "d-flex mySlides pt-5 mt-3"
      }
    >
      {!prodId ? (
        <div
          className="bbb_deals"
          onClick={
            handler.singleProd.id !== prod.id || !singleProdShowing.id
              ? () => {
                  handler.setSingleProd(prod)
                  handler.setCampInfo(campInfo)
                  setId(prod.id)
                }
              : null
          }
        >
          <span className="rib">{campInfo}</span>
          {singleProdShowing.id && (
            <div
              id="update-delete-prod-wrapper"
              className="w-100 d-flex justify-content-center"
            >
              <FontAwesomeIcon
                icon={faSquarePen}
                className="icon mr-2"
                onClick={goToUpdate}
              />
              <FontAwesomeIcon icon={faTrash} className="icon ml-2" />
            </div>
          )}
          <div className="bbb_deals_item">
            <div className="bbb_deals_image">
              <img src={prod.img} alt="product" />
            </div>
            <div className="bbb_deals_content">
              <div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                <div className="bbb_deals_item_price_a ml-auto">
                  <strike>{prod.price}</strike>
                </div>
              </div>
              <div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                <div className="bbb_deals_item_price ml-auto">
                  {prod.price - prod.price * prodDiscount}
                </div>
              </div>
              <div className="end-of-card">
                <div className="bbb_deals_item_name w-100 pt-2">
                  {prod.model.charAt(0).toUpperCase() + prod.model.slice(1)}
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
        </div>
      ) : (
        <Navigate to={`/product/${prodId}`} />
      )}

      {navigateToUpdate && <Navigate to="/update" />}
    </div>
  )
}

export default Product
