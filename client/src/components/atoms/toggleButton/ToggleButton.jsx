import './ToggleButton.scss';

const ToggleButton = ({ isCardView, toggleView }) => {
  return (
    <div className="toggle">
      <input
        type="checkbox"
        className="toggle__input"
        id="toggleCheckbox"
        checked={isCardView}
        onChange={toggleView}
      />
      <label className="toggle__label" htmlFor="toggleCheckbox">
        <span className="toggle__slider" />
        <span className="toggle__option toggle__option--card">Card</span>
        <span className="toggle__option toggle__option--table">Table</span>
      </label>
    </div>
  );
};

export default ToggleButton;
