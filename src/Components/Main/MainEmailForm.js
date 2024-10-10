//email form. currently does not have a state, but when submission is possible will update
const MainEmailForm = () => {
  return (
    <div>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default MainEmailForm;
