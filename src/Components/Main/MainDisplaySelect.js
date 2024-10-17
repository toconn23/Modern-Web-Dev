//make fields array to allow mapping in order to allow map for DRY
const fields = [
  { name: "firstDowns", label: "First Downs" },
  { name: "totalYards", label: "Total Yards" },
  { name: "passingYards", label: "Passing Yards" },
  { name: "rushingYards", label: "Rushing Yards" },
  { name: "turnovers", label: "Turnovers" },
  { name: "interceptionsThrown", label: "Interceptions Thrown" },
  { name: "fumblesLost", label: "Fumbles Lost" },
  { name: "possession", label: "Possession" },
];

const MainDisplaySelect = ({ display, selectDisplay }) => {
  //function to update the state of the display dictionary
  const handleChange = (e) => {
    const { name, checked } = e.target;
    selectDisplay((prevDisplay) => ({
      ...prevDisplay,
      [name]: checked,
    }));
  };
  //map a checkbox for each field and set the check based on the state
  return (
    <fieldset>
      <legend>Display Options</legend>
      <ul>
        {fields.map(({ name, label }) => (
          <li style={{ listStyleType: "none" }} key={name}>
            <label>
              <input
                type="checkbox"
                name={name}
                checked={display[name]}
                onChange={handleChange}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default MainDisplaySelect;
