import { useState } from 'react';

const Form = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <form className="mt-5 mb-4 d-flex justify-content-center align-items-center gap-3">
      <input
        onChange={(e) => setIsChecked(e.target.checked)}
        id="terms"
        className="form-check-input"
        type="checkbox"
      />

      <div className="terms-wrapper">
        <label htmlFor="terms">I have read and agree to the terms.</label>
        <p
          style={{
            visibility: isHover ? 'visible' : 'hidden',
          }}
        >
          We will deliver your order as soon as possible.
        </p>
      </div>

      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        disabled={!isChecked}
        className="btn btn-primary"
      >
        Confirm Order
      </button>
    </form>
  );
};

export default Form;
