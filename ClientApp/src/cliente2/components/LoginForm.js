import React from "react";
import "./LoginForm.scss";
import { useForm } from "react-hook-form";

function LoginForm(props) {
  const { register, handleSubmit } = useForm();

  const handleLogin = (data) => {
    console.log(`Loggin: ${data["correoSI"]},${data["claveSI"]}`);
  };

  const handleSignup = (data) => {
    console.log(
      `Signing: ${data["nombreSU"]}, ${data["correoSU"]},${data["claveSU"]}`
    );
  };

  const container = React.createRef();
  const onSignUp = () => {
    container.current.classList.add("right-panel-active");
  };
  const onSignIn = () => {
    container.current.classList.remove("right-panel-active");
  };

  const registro = props.registro;

  const Input = ({ label, name, type, register }) => (
    <input type={type} name={name} placeholder={label} {...register(name)} />
  );

  return (
    <div className="mainContainer">
      <div
        className={
          registro === false ? "container" : "container right-panel-active"
        }
        id="container"
        ref={container}
      >
        <div className="form-container sign-up-container">
          <form
            className="d-flex align-items-center justify-content-center flex-column h-100"
            onSubmit={handleSubmit(handleSignup)}
          >
            <h1>Registro</h1>
            <Input
              label="Nombre"
              name="nombreSU"
              type="text"
              register={register}
            />
            <Input
              label="Correo"
              name="correoSU"
              type="email"
              register={register}
            />
            <Input
              label="Clave"
              name="claveSU"
              type="password"
              register={register}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSignUp}
            >
              Registrarse
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            className="d-flex align-items-center justify-content-center flex-column h-100"
            onSubmit={handleSubmit(handleLogin)}
          >
            <h1>Ingresar</h1>
            <Input
              label="Correo"
              name="correoSI"
              type="email"
              register={register}
            />
            <Input
              label="Clave"
              name="claveSI"
              type="password"
              register={register}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSignIn}
            >
              Ingresar
            </button>
          </form>
        </div>
        <div className="overlay-container d-none d-md-inline">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenid@</h1>
              <p>Si ya tienes cuenta, puedes ingresar tus credenciales</p>
              <button
                type="button"
                className="ghost"
                id="signIn"
                onClick={onSignIn}
              >
                Ingresar
              </button>
            </div>
            <div className="overlay-panel overlay-right d-none d-md-flex">
              <h1>¡Hola!</h1>
              <p>Si aún no tienes cuenta, puedes registrarte</p>
              <button
                type="button"
                className="ghost"
                id="signUp"
                onClick={onSignUp}
              >
                Registrarte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
