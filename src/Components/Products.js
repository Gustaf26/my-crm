import React from "react"

function Products() {
  return (
    <div
      id="products-container"
      class="d-flex justify-content-center align-items-center flex-column"
    >
      <button
        id="slide-left"
        onClick="plusDivs(window.innerWidth >= 1000?-4:
      window.innerWidth >= 600 && window.innerWidth < 1000? -2:
      -1)"
      >
        &#10094;
      </button>
      <button
        id="slide-right"
        onclick="plusDivs(window.innerWidth >= 1000? 4:
        window.innerWidth >= 600 && window.innerWidth < 1000? 2:
        1)"
      >
        &#10095;
      </button>
    </div>
  )
}

export default Products
