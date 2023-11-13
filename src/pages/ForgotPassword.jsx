import { Link } from "react-router-dom"
export default function ForgotPassword() {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Recober your access and manage you {''}<span className="text-slate-700">proyects</span> </h1>

    <form className="my-10 bg-white shadow rounded-lg p-10">

      <div className="my-5">
        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
        <input id="email" type="email" placeholder="Send instructions" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
      </div>
    </form>

    <nav className="lg:flex lg:justify-between">
       <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/register">Don't have an account? Register here</Link>
       <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forgot-password">Forgot my password</Link>
    </nav>

</>
  )
}
