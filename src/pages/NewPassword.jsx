import { Link } from "react-router-dom"
export default function NewPassword() {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Register a new password and manage you {''}<span className="text-slate-700">proyects</span> </h1>

    <form className="my-10 bg-white shadow rounded-lg p-10">
      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">New Password</label>
        <input id="password" type="password" placeholder="Registration a new Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
      </div>
      <input type="submit" value="Save new password " className="bg-sky-700 w-full py-3 mt-5 mb-5 text-white uppercase font-bold rounded hover:bg-sky-800 hover:cursor-pointer" />
    </form>

</>
  )
}
