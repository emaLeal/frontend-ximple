import LoginComponent from "@/components/login/LoginComponent";

export default async function LoginPage() {

  return (
    <div className="flex justify-content-center">
      <div className="form-demo">
        <div className="card">
          <span>Inicio de Sesion</span>
          <LoginComponent />
        </div>
      </div>
    </div>
  )
}