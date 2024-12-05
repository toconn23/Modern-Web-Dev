import React from "react";

const AuthLoginForm = ({ user, onChange, onSubmit }) => {
  return (
    <div className="max-w-md mx-auto p-12 bg-white shadow-lg rounded-lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="Enter your email"
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="Enter your password"
            min="0"
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthLoginForm;
