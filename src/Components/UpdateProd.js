import React, { useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import "../Styles/App.css"
import { UserContext } from "../Hooks/userContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  prodId: yup.number().min(1).max(1000000).required(),
  prodName: yup.string().min(10).max(40).required(),
  prodPrice: yup.number().min(0).max(5000).required(),
  prodQty: yup.number().min(0).max(100).required(),
  campCode: yup.string().min(1).max(4).required(),
  prodImg: yup.string().required(),
})

function UpdateProd() {
  const handler = useContext(UserContext)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const [successMsg, setMsg] = useState(false)
  const [prodUpdated, setprodUpdated] = useState(false)

  const updateProduct = data => {
    console.log(data)
    let allProds = handler.products
    allProds.map((cat, index) => {
      let catName
      catName = Object.keys(cat).toString()
      allProds[index][`${catName}`].map((prod, i) => {
        if (Number(prod.id) === Number(data.prodId)) {
          let updatedProd
          updatedProd = {
            id: data.prodId,
            img: data.prodImg,
            model: data.prodName,
            qty: data.prodQty,
            price: data.prodPrice,
            campaign: data.campCode,
          }
          allProds[index][`${catName}`][i] = updatedProd
          handler.setSingleProd(updatedProd)
          handler.campaigns.map(camp => {
            if (camp.kod === data.campCode) {
              handler.setCampInfo(camp.info)
              return
            }
          })
          return
        }
      })
    })
    handler.updateProducts(allProds)
    setMsg(true)
    setTimeout(() => {
      setprodUpdated(true)
      setMsg(false)
    }, 3000)
  }

  useEffect(() => {
    return () => {
      setMsg(false)
    }
  }, [])

  return (
    <div>
      {!prodUpdated && !successMsg ? (
        <form
          onSubmit={handleSubmit(updateProduct)}
          id="create-prod-form"
          class="contact-form d-flex border border-dark p-3 rounded flex-column justify-content-start align-items-center"
        >
          <h5 class="text-center p-3 bg-none row border border-dark m-4 br-5 rounded">
            UPDATE A PRODUCT
          </h5>
          <div class="form-group col-lg-6 col-md-6 col-sm-8">
            <input
              required
              id="prod-id"
              type="number"
              name="prodId"
              class="form-control"
              placeholder="Product id"
              ref={register}
              defaultValue={handler.singleProd ? handler.singleProd.id : null}
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-8">
            <input
              required
              id="prod-name"
              name="prodName"
              type="text"
              class="form-control w-100"
              placeholder="Product name"
              ref={register}
              defaultValue={
                handler.singleProd ? handler.singleProd.model : null
              }
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-8">
            <input
              required
              id="prod-price"
              name="prodPrice"
              type="number"
              class="form-control"
              placeholder="Price"
              ref={register}
              defaultValue={
                handler.singleProd ? handler.singleProd.price : null
              }
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-8">
            <input
              required
              id="prod-qty"
              name="prodQty"
              type="number"
              class="form-control"
              placeholder="Quantity"
              ref={register}
              defaultValue={handler.singleProd ? handler.singleProd.qty : null}
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-8">
            <select
              name="campCode"
              class="c-form-code form-control"
              id="c-form-camp-code"
              ref={register}
              defaultValue={
                handler.singleProd ? handler.singleProd.campaign : null
              }
            >
              {handler.campaigns &&
                handler.campaigns.map(camp => {
                  return (
                    <option class="py-3" value={camp.kod}>
                      {camp.kod}
                    </option>
                  )
                })}
            </select>
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-8">
            <input
              required
              id="prod-img"
              name="prodImg"
              type="text"
              class="form-control"
              placeholder="Product image"
              ref={register}
              defaultValue={handler.singleProd ? handler.singleProd.img : null}
            />
          </div>
          <button
            type="submit"
            class="btn bg-dark border border-dark font-weight-bold"
          >
            Submit
          </button>
        </form>
      ) : successMsg ? (
        <div
          id="success-message"
          className="text-primary mh-25 text-large p-4 mx-auto"
        >
          <h6>SUCCESS!</h6>
          <p className="text-white">Redirecting...</p>
          <div className="spinner-grow text-primary"></div>
        </div>
      ) : (
        <Navigate to={`/product/${handler.singleProd.id}`} />
      )}
    </div>
  )
}

export default UpdateProd
