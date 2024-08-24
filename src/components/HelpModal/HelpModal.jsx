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
        <p>
          Hue is measured in degrees on a color wheel, from red (0°) to green
          (120°) to blue (240°) back to red (360°). Saturation and Lightness are
          measured in percentages and indicate color intensity and brightness
          respectively.
        </p>
        <p>
          You will have 5 tries to correctly guess the hsl code of the target
          color. After each guess, your last guess will be displayed in the
          guess box.
        </p>
        <p>
          There will be symbols that pop up in the guesses section that indicate
          the closeness of your guess. Use these to gauge your next guess!
        </p>
        <div className="hint">
          <HintIcon />
          <p>
            <b>Hint: </b> In this game the h,s,l values are always multiple of
            10
          </p>
        </div>
      </div>
    </Modal>
  );
};

export { HelpModal };
