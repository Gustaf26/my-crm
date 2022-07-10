import React, { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import "../Styles/App.css"
import { UserContext } from "../Hooks/userContext"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
})

function LoginForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const [registerMsg, setRegister] = useState(false)

  const handler = useContext(UserContext)

  const submitForm = data => {
    if (data) {
      if (
        data.email === handler.userRegistered.email &&
        data.password === handler.userRegistered.password
      ) {
        handler.setLogin(true)
      } else {
        setRegister(true)
      }
    }
  }
  return (
    <div className="d-flex justify-content-center pr-0">
      {handler.loggedIn === false && !registerMsg ? (
        <form
          id="login-form"
          onSubmit={handleSubmit(submitForm)}
          className="border border-dark rounded login-form col-6 d-flex flex-column align-items-center ml-0 py-3"
        >
          <h5 className="p-3">MY CRM</h5>
          <h6 className="text-light pb-1">Please log in</h6>
          <div className="form-group">
            <input
              id="email"
              type="email"
              name="email"
              className="w-100 p-2 bg-transparent text-light rounded border border-secondary"
              placeholder="Enter your email"
              ref={register}
            />
          </div>
          <p className="text-light"> {errors.email?.message} </p>
          <div className="form-group">
            <input
              id="pass"
              type="password"
              name="password"
              className="w-100 bg-transparent text-light p-2 rounded border border-secondary"
              placeholder="Enter your password"
              ref={register}
            />
          </div>
          <p className="text-light"> {errors.password?.message} </p>
          <button
            type="submit"
            className="btn bg-transparent border border-dark font-weight-bold"
          >
            Submit
          </button>
        </form>
      ) : handler.loggedIn === false && registerMsg === true ? (
        <Navigate to="/register" />
      ) : (
        <Navigate to="/" />
      )}
    </div>
  )
}

export default LoginForm
