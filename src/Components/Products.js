import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../Hooks/userContext"
import Product from "./Product"

function Products() {
  const handler = useContext(UserContext)

  const [categoryProducts, setCatProds] = useState([])
  const prevSize = useRef(window.innerWidth)
  // Slider logic adapted to window.innerWidth (responsive)
  const [slideIndex, setIndex] = useState(0)
  const [minIndex, setMinimum] = useState(-1)

  useEffect(() => {
    handler.products.map((cat, i) => {
      console.log(handler.productsCategory)
      if (Object.keys(cat).toString() === handler.productsCategory) {
        setCatProds(handler.products[i][`${handler.productsCategory}`])
        return
      }
    })
  }, [handler.products, handler.productsCategory])

  useEffect(() => {
    setIndex(
      window.innerWidth >= 1100
        ? 4
        : window.innerWidth >= 700 && window.innerWidth < 1099
        ? 2
        : 1
    )
  }, [])

  useEffect(() => {
    function handleResize(width) {
      if (slideIndex > categoryProducts.length || minIndex < -1) {
        return
      } else {
        setIndex(width >= 1100 ? 4 : width >= 700 && width <= 1099 ? 2 : 1)
        setMinimum(-1)
      }
      prevSize.current = width
    }

    window.addEventListener("resize", () => {
      handleResize(Number(window.innerWidth))
    })

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <div>
      <div
        ref={this}
        id="products-container"
        className="d-flex justify-content-center align-items-center"
      >
        {handler.productsCategory && (
          <h3 className="products-category">
            {handler.productsCategory.toUpperCase()}
          </h3>
        )}
        {categoryProducts.length &&
          categoryProducts.map((prod, i) => {
            if (i < slideIndex && i > minIndex) {
              let prodCampInfo
              handler.campaigns.map(camp => {
                if (camp.kod === prod.campaign) {
                  prodCampInfo = camp.info
                }
              })
              return (
                <Product
                  key={i}
                  productShowing={prod}
                  prodCampInfo={prodCampInfo}
                />
              )
            }
          })}
        <button
          id="slide-left"
          onClick={() => {
            if (minIndex <= -1) {
              return
            }
            setIndex(
              window.innerWidth >= 1100
                ? slideIndex - 4
                : window.innerWidth >= 700 && window.innerWidth < 1099
                ? slideIndex - 2
                : slideIndex - 1
            )
            setMinimum(
              window.innerWidth >= 1100
                ? minIndex - 4
                : window.innerWidth >= 700 && window.innerWidth < 1099
                ? minIndex - 2
                : minIndex - 1
            )
          }}
        >
          &#10094;
        </button>
        <button
          id="slide-right"
          onClick={() => {
            if (slideIndex >= categoryProducts.length) {
              return
            }
            setIndex(
              window.innerWidth >= 1100
                ? slideIndex + 4
                : window.innerWidth >= 700 && window.innerWidth < 1099
                ? slideIndex + 2
                : slideIndex + 1
            )
            setMinimum(
              window.innerWidth >= 1100
                ? minIndex + 4
                : window.innerWidth >= 700 && window.innerWidth < 1099
                ? minIndex + 2
                : minIndex + 1
            )
          }}
        >
          &#10095;
        </button>
      </div>
    </div>
  )
}

export default Products
