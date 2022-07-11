import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../Hooks/userContext"
import Nav from "./Nav"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  campId: yup.string().min(1).max(4).required(),
  campInfo: yup.string().min(10).max(40).required(),
  campDisc: yup.number().min(0).max(100).required(),
})

function Campaigns() {
  const handler = useContext(UserContext)
  const [successMsg, setMessage] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const submitCamp = data => {
    let camps = handler.campaigns
    camps.push({
      kod: data.campId,
      discount: data.campDisc,
      info: data.campInfo,
    })
    handler.updateCampaigns(camps)
    setMessage(true)
  }

  useEffect(() => {
    return function () {
      setMessage(false)
    }
  }, [])

  return (
    <div>
      <Nav />
      <div className="w-75 ml-auto d-flex justfiy-content-center">
        {successMsg === false ? (
          <form
            onSubmit={handleSubmit(submitCamp)}
            id="campaign-form"
            class="contact-form row ml-3 d-flex border border-dark p-3 rounded justify-content-center align-items-center flex-column"
          >
            <h5 class="col-lg-6 col-md-6 col-sm-8 p-3 bg-none border border-dark my-4 text-center br-5 rounded">
              CREATE CAMPAIGN
            </h5>
            <div class="form-group col-lg-6 col-md-6 col-sm-8">
              <input
                required
                id="camp-id"
                name="campId"
                type="text"
                class="form-control"
                placeholder="Campaign code"
                ref={register}
              />
            </div>
            <p class="text-light"> {errors.campId?.message} </p>
            <div class="form-group col-lg-6 col-md-6 col-sm-8">
              <input
                required
                id="camp-info"
                name="campInfo"
                type="text"
                class="form-control w-100"
                placeholder="Campaign info"
                ref={register}
              />
            </div>
            <p class="text-light"> {errors.campInfo?.message} </p>
            <div class="form-group col-lg-6 col-md-6 col-sm-8">
              <input
                required
                id="camp-disc"
                name="campDisc"
                type="number"
                class="form-control"
                placeholder="Discount (%)"
                ref={register}
              />
            </div>
            <p class="text-light"> {errors.campDisc?.message} </p>
            <button
              type="submit"
              class="btn bg-dark border border-dark font-weight-bold"
            >
              Submit
            </button>
          </form>
        ) : (
          <div
            id="success-message"
            className="text-primary text-large p-3 mx-auto"
          >
            <h6>SUCCESS!</h6>
            <div className="d-flex justify-content-between w-100">
              <Link
                to="/campaigns"
                onClick={() => setMessage(false)}
                className="text-light"
              >
                &#8666; Campaigns
              </Link>
              <Link to="/products" className="text-light">
                Products &#8667;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Campaigns
