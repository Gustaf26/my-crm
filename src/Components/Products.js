import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"
import Nav from "./Nav"

function Products() {
  const handler = useContext(UserContext)
  const [currentCategory, setCategory] = useState("sales")
  const [categoryProducts, setCatProds] = useState([])

  // Slider logic adapted to window.innerWidth (responsive)
  const [slideIndex, setIndex] = useState(0)
  const [slides, setSlides] = useState("")

  function plusDivs(n) {
    if (slideIndex + n > slides.length - 1 || slideIndex + slides < 0) {
      return
    }
    setIndex(slideIndex + n)
    setTimeout(() => {
      showProducts(slideIndex)
    }, 500)
  }

  window.addEventListener("resize", () => {
    setIndex(0)
    setTimeout(() => {
      showProducts(slideIndex)
    }, 500)
  })

  function showProducts(n) {
    let i
    if (n > slides.length) {
      setIndex(1)
    }
    if (n < 0) {
      setIndex(0)
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove("d-flex")
      slides[i].style.display = "none"
    }

    //x = [...x]
    window.innerWidth >= 1000
      ? slides.map((element, index) => {
          if (index <= slideIndex + 3 && index >= slideIndex) {
            element.classList.add("d-flex")
          }
        })
      : window.innerWidth >= 600 && window.innerWidth < 1000
      ? slides.map((element, index) => {
          if (index <= slideIndex + 1 && index >= slideIndex) {
            element.classList.add("d-flex")
          }
        })
      : slides[slideIndex].classList.add("d-flex")
  }

  useEffect(() => {
    handler.products.map((cat, i) => {
      console.log(currentCategory)
      if (Object.keys(cat).toString() == currentCategory) {
        setCatProds(handler.products[i][`${currentCategory}`])
        setTimeout(() => {
          showProducts(slideIndex)
          setSlides([...document.getElementsByClassName("mySlides")])
        }, 500)
      }
    })
  }, [handler.products])

  useEffect(() => {
    handler.setLogin(true)
  }, [])

  return (
    <div>
      {handler.loggedIn === true ? <div>{/* <Nav /> */}</div> : null}
      <div
        id="products-container"
        className="d-flex justify-content-center align-items-center"
      >
        {currentCategory && (
          <h3 className="products-category">{currentCategory.toUpperCase()}</h3>
        )}
        {categoryProducts.length &&
          categoryProducts.map((prod, i) => {
            return (
              <div key={i} className="mySlides pt-5 mt-3">
                <div className="bbb_deals">
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
                          {prod.price}
                        </div>
                      </div>
                      <div className="end-of-card">
                        <div className="bbb_deals_item_name w-100 pt-2">
                          {prod.model.charAt(0).toUpperCase() +
                            prod.model.slice(1)}
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
          })}
        <button
          id="slide-left"
          onClick={() =>
            plusDivs(
              window.innerWidth >= 1000
                ? -4
                : window.innerWidth >= 600 && window.innerWidth < 1000
                ? -2
                : -1
            )
          }
        >
          &#10094;
        </button>
        <button
          id="slide-right"
          onClick={() =>
            plusDivs(
              window.innerWidth >= 1000
                ? 4
                : window.innerWidth >= 600 && window.innerWidth < 1000
                ? 2
                : 1
            )
          }
        >
          &#10095;
        </button>
      </div>
    </div>
  )
}

export default Products
