import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 rounded-lg">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-white text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(signin.png)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-customBlue">
                  Welcome Back!!!
                </h1>
                <p className="text-[12px] text-gray-500">
                  Enter details to login
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />
                  <button
                    className="mt-3 tracking-wide font-semibold bg-customBlue text-gray-100 w-full py-4 rounded-lg hover:bg-customModBlue transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none uppercase"
                    disabled={loading}
                  >
                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">{loading ? 'Loading...' : 'Sign In'}</span>
                  </button>
                  <div>
                    <OAuth />
                    <p className="mt-4 text-xs text-gray-600 text-center">
                      Don't have an account?{' '}
                      <Link to="/sign-up">
                        <span className="text-blue-900 font-semibold">Sign up here</span>
                      </Link>
                    </p>
                  </div>
                  {error && <p className="text-red-500 mt-5">{error}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
