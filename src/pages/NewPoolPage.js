import { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import "./NewPoolPage.css";

const NewPoolPage = ({ dispatch, id }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleChangeFirstOption = (e) => {
    const firstOption = e.target.value;
    setFirstOption(firstOption);
  };

  const handleChangeSecondOption = (e) => {
    const secondOption = e.target.value;
    setSecondOption(secondOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleSaveQuestion(firstOption, secondOption, id));

    setFirstOption("");
    setSecondOption("");
    navigate("/");
  };

  return (
    <div className="new-pool-page">
      <h1>Would you rather</h1>
      <h2>Create your own pool</h2>
      <form className="new-pool-form" onSubmit={handleSubmit}>
        <TextInput
          label="First option"
          placeholder="First option"
          value={firstOption}
          onChange={handleChangeFirstOption}
          testid="new-pool-first"
        />
        <TextInput
          label="Second option"
          placeholder="Second option"
          value={secondOption}
          onChange={handleChangeSecondOption}
          testid="new-pool-second"
        />
        <button
          type="submit"
          className="button"
          disabled={firstOption === "" || secondOption === ""}
          data-testid="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewPoolPage);
