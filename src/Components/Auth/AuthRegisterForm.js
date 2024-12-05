import React from "react";

const AuthForm = ({ user, onChange, onSubmit }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={user.firstName}
            onChange={onChange}
            name="firstName"
            placeholder="First name"
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={user.lastName}
            onChange={onChange}
            name="lastName"
            placeholder="Last name"
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="Email"
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
            placeholder="Password"
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

export default AuthForm;
