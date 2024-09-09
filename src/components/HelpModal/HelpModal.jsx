import { HintIcon } from "../../assets/icons";
import { Modal } from "../../templates";

const HelpModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="help-modal">
        <h2>How to Play</h2>
        <p>
          HSL is an intuitive color model based on Hue, Saturation and
          Lightness.
        </p>
        <p>Your guess should include 3 numbers separated with spaces:</p>
        <p>
          Hue - basic color in degrees from 0 to 360 <br />
          Saturation - color intensity in percentages from 0 to 100 <br />
          Lightness - color brightness in percentages from 0 to 100 <br />
        </p>
        <div className="hue-scale-helper">
          <p>
            <span>0°</span>
            <span>120°</span>
            <span>240°</span>
            <span>360°</span>
          </p>
          <div className="color-scale"></div>
        </div>
        <p>
          You will have 5 tries to correctly guess the hsl code of the target
          color. After each guess, there will be symbols that pop up in the
          guesses section that indicate the closeness of your guess. Use these
          to gauge your next guess!
        </p>
        <div className="hint">
          <HintIcon />
          <p>In this game the h,s,l values are always multiple of 10</p>
        </div>
      </div>
    </Modal>
  );
};

export { HelpModal };
