import { useEffect, useState } from "react";
import "./Donate.css";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { Input } from "../../components";

const Donate = () => {
    const [{ isPending, scriptError }] = usePayPalScriptReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isPending) {
            setLoading(false);
        }
    }, [isPending]);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "1.00",
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
            {loading && <div className="loading-spinner">Loading...</div>}
            {scriptError && <div className="error-message">Error loading PayPal script</div>}
            {!loading && !scriptError && (
                <>
                <Input className='paypal-btn'/>
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    className='paypal-btn'
                    disabled={isPending}
                />
                </>
            )}
        </div>
    );
};

export default Donate;
