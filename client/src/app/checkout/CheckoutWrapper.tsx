import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { setBasket } from "../../features/basket/basketSlice";
import agent from "../api/agent";
import LoadingComponent from "../layout/LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(
  "pk_test_51LClzbBtpGQWdcJkkxNZaVu9vjEbGtA4NzIiUy6QJT9CRMXvtewEiBl46GwszKFzwNA0bZk5VnIdwtX8y8lt6Upf00r4QHxovj"
);

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message="loading checkout..." />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
