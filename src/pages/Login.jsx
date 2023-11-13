import { Link } from "react-router-dom"

export default function Login() {
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Login and manage your {''} <span className="text-slate-700">proyects</span> </h1>

        <form className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input id="email" type="email" placeholder="Registration Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
          </div>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input id="password" type="password" placeholder="Registration Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
          </div>
          <input type="submit" value="Login" className="bg-sky-700 w-full py-3 mt-5 mb-5 text-white uppercase font-bold rounded hover:bg-sky-800 hover:cursor-pointer" />
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/register">Don't have an account? Register here</Link>
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forgot-password">Forgot my password</Link>
        </nav>

    </>
    
  )
}
