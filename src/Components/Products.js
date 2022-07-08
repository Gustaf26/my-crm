import React, { useContext, useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../Hooks/userContext"
import Nav from "./Nav"
import Slide from "./Slide"

function Products() {
  const handler = useContext(UserContext)
  const [currentCategory, setCategory] = useState("sales")
  const [categoryProducts, setCatProds] = useState([])
  const prevSize = useRef(window.innerWidth)
  // Slider logic adapted to window.innerWidth (responsive)
  const [slideIndex, setIndex] = useState(0)
  const [minIndex, setMinimum] = useState(-1)

  useEffect(() => {
    handler.products.map((cat, i) => {
      console.log(currentCategory)
      if (Object.keys(cat).toString() == currentCategory) {
        setCatProds(handler.products[i][`${currentCategory}`])
      }
    })
  }, [handler.products])

  useEffect(() => {
    handler.setLogin(true)
    setIndex(
      window.innerWidth >= 1000
        ? 4
        : window.innerWidth >= 600 && window.innerWidth < 1000
        ? 2
        : 1
    )
  }, [])

  useEffect(() => {
    function handleResize(width) {
      if (slideIndex > categoryProducts.length || minIndex < -1) {
        return
      } else if (Number(width) > Number(prevSize.current)) {
        setIndex(
          width >= 1000
            ? slideIndex + 4
            : width >= 600 && width < 1000
            ? slideIndex + 2
            : slideIndex + 1
        )
      } else if (Number(width) < Number(prevSize.current)) {
        console.log(width)
        setIndex(width >= 1000 ? 4 : width >= 600 && width < 1000 ? 2 : 1)
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
      {handler.loggedIn === true ? <div>{/* <Nav /> */}</div> : null}
      <div
        ref={this}
        id="products-container"
        className="d-flex justify-content-center align-items-center"
      >
        {currentCategory && (
          <h3 className="products-category">{currentCategory.toUpperCase()}</h3>
        )}
        {categoryProducts.length &&
          categoryProducts.map((prod, i) => {
            if (i < slideIndex && i > minIndex) {
              return <Slide key={i} prod={prod} />
            }
          })}
        <button
          id="slide-left"
          onClick={() => {
            if (minIndex <= -1) {
              return
            }
            setIndex(
              window.innerWidth >= 1000
                ? slideIndex - 4
                : window.innerWidth >= 600 && window.innerWidth < 1000
                ? slideIndex - 2
                : slideIndex - 1
            )
            setMinimum(
              window.innerWidth >= 1000
                ? minIndex - 4
                : window.innerWidth >= 600 && window.innerWidth < 1000
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
              window.innerWidth >= 1000
                ? slideIndex + 4
                : window.innerWidth >= 600 && window.innerWidth < 1000
                ? slideIndex + 2
                : slideIndex + 1
            )
            setMinimum(
              window.innerWidth >= 1000
                ? minIndex + 4
                : window.innerWidth >= 600 && window.innerWidth < 1000
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
