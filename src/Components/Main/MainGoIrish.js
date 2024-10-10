const MainGoIrish = ({ message, setMessage }) => {
  const notreDameMessages = [
    "Victory for the Irish!",
    "We are ND!",
    "Here come the Irish!",
    "Play like a champion today!",
    "Go Irish, Fight Irish!",
    "Irish eyes are smiling!",
    "The Golden Dome shines today!",
    "Let’s go Irish, victory is ours!",
    "Raise your spirits, Notre Dame always prevails!",
    "Faith, strength, and courage—Notre Dame’s way!",
  ];
  const click = () => {
    setMessage(
      notreDameMessages[Math.floor(Math.random() * notreDameMessages.length)]
    );
  };
  return (
    <div>
      <button onClick={click}>Celebrate!</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MainGoIrish;
