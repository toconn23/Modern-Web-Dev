import React from "react";

const CreateGameForm = ({
  email,
  setEmail,
  handleFormSubmit,
  selectedColor,
  setSelectedColor,
  setShowForm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          Enter Your Opponent's Email
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inline-flex">
            <input
              type="radio"
              id="color-red"
              name="color"
              value="r"
              className="hidden"
              checked={selectedColor === "r"}
              onChange={() => setSelectedColor("r")}
            />
            <label
              htmlFor="color-red"
              className={`px-4 py-2 rounded cursor-pointer ${
                selectedColor === "r"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Red
            </label>

            <input
              type="radio"
              id="color-black"
              name="color"
              value="b"
              className="hidden"
              checked={selectedColor === "b"}
              onChange={() => setSelectedColor("b")}
            />
            <label
              htmlFor="color-black"
              className={`px-4 py-2 rounded cursor-pointer ${
                selectedColor === "b"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Black
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setShowForm(false);
                setEmail("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateGameForm;
