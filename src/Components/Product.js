import React, { useEffect, useState } from "react"

function Product({ prod, campInfo }) {
  const [activeSlide, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    return () => {
      setActive(false)
    }
  }, [])

  return (
    <div
      className={
        activeSlide
          ? "d-flex mySlides active-slide pt-5 mt-3"
          : "d-flex mySlides pt-5 mt-3"
      }
    >
      <div className="bbb_deals">
        <span class="rib">{campInfo}</span>
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
              <div className="bbb_deals_item_price ml-auto">{prod.price}</div>
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
    </div>
  )
}

export default Product
