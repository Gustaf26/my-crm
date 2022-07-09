import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import "../Styles/App.css"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { UserContext } from "../Hooks/userContext"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmpassword: yup.string().oneOf([yup.ref("password"), null]),
})

function Register() {
  const handler = useContext(UserContext)

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const submitRegister = data => {
    handler.register(data)
  }

  return (
    <div class="d-flex justify-content-center pr-0">
      {handler.userRegistered === false ? (
        <form
          id="register-form"
          onSubmit={handleSubmit(submitRegister)}
          class="border border-dark rounded login-form col-6 d-flex flex-column align-items-center ml-0 py-3"
        >
          <h5 class="p-2">MY CRM</h5>
          <h6 className="text-light pb-1">Please register</h6>
          <div class="form-group">
            <input
              id="email"
              type="email"
              name="email"
              class="w-100 p-2 bg-transparent text-light rounded border border-secondary"
              placeholder="Enter your email"
              ref={register}
            />
          </div>
          <p class="text-light"> {errors.email?.message} </p>
          <div class="form-group">
            <input
              id="pass"
              type="password"
              name="password"
              class="w-100 bg-transparent text-light p-2 rounded border border-secondary"
              placeholder="Enter your password"
              ref={register}
            />
          </div>
          <p class="text-light"> {errors.password?.message} </p>
          <div class="form-group">
            <input
              id="pass"
              type="password"
              name="confirmpassword"
              className="text-light w-100 bg-transparent text-light p-2 rounded border border-secondary"
              placeholder="Enter same password"
              ref={register}
            />
          </div>
          <p class="text-light"> {errors.confirmpassword?.message} </p>
          <button
            type="submit"
            class="btn bg-transparent border border-dark font-weight-bold"
          >
            Submit
          </button>
        </form>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

export default Register
