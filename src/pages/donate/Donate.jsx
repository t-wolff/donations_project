import { useEffect, useState } from "react";
import "./Donate.css";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { Input } from "../../components";

const Donate = () => {
  const [{ isPending, scriptError }] = usePayPalScriptReducer();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [name, setName] = useState(0);

  useEffect(() => {
    if (!isPending) {
      setLoading(false);
    }
  }, [isPending]);

  useEffect(() => {
    console.log("Amount:", amount);
    console.log("Name:", name);
  }, [amount, name]);
  

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert("Transaction completed by " + details.payer.name.given_name);
    });
  };

  const onError = (err) => {
    console.error("PayPal Error:", err);
  };

  return (
    <div className="donate-container">
      <aside>
        <h2>Donate Now</h2>
        <h4>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia est
          ullam alias modi! Eligendi ratione nostrum tempore perferendis
          asperiores quidem.
        </h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia est
          ullam alias modi! Eligendi ratione nostrum tempore perferendis
          asperiores quidem.
        </p>
      </aside>
      <div className="payment-container">
        {loading && <div className="loading-spinner">Loading...</div>}
        {scriptError && (
          <div className="error-message">Error loading PayPal script</div>
        )}
        {!loading && !scriptError && (
          <>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
            <h2 htmlFor="amount">My Generous Donation Of:</h2>
            <div className="btn-amount-container">
            <button onClick={() => setAmount(50)}>50$</button>
            <button onClick={() => setAmount(100)}>100$</button>
            <button onClick={() => setAmount(300)}>300$</button>
            </div>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              className="paypal-btn"
              disabled={isPending}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Donate;
