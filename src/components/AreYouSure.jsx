import { Link, useNavigate } from "react-router-dom";


export default function AreYouSurePage() {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Are you sure you want to use this avatar?</h1>
      <button onClick={handleYesClick}>Yes</button>
    </div>
  );
}
