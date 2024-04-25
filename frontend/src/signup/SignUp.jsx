
const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
			</h1>

      <form>
        <div>
          <label className="label p-2">
            <span className="label-text text-base">Full Name</span>
          </label>
          <input type="text" placeholder="Jhon Doe" className="w-full input input-bordered"/>
        </div>

        <div>
          <label className="label p-2">
            <span className="label-text text-base">Username</span>
          </label>
          <input type="text" placeholder="Jhondoe" className="w-full input input-bordered"/>
        </div>

        <div>
          <label className="label p-2">
            <span className="label-text text-base">Password</span>
          </label>
          <input type="password" placeholder="Enter password" className="w-full input input-bordered"/>
        </div>

        <div>
          <label className="label p-2">
            <span className="label-text text-base">Confirm Password</span>
          </label>
          <input type="password" placeholder="Confirm password" className="w-full input input-bordered"/>
        </div>

        {/* gender checkbox */}

        <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
          Already have an account
        </a>
        <button className="btn btn-block btn-sm mt-2 border border-slate-700">Sign Up</button>
      </form>

      </div>
    </div>
  )
}

export default SignUp