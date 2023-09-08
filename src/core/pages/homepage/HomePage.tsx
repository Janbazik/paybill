import {
  BillSplitter,
  PaymentAmountByPersonTable,
  UserRegistrationInput,
} from "../../components";

export const HomePage = () => {
  return (
    <div className="pb-homepage-container">
      <div className="pb-homepage--header">
        <h1 className="pb-logo">PayBill</h1>
      </div>
      <div className="pb-column">
        <UserRegistrationInput />
        <hr />
        <BillSplitter />
        <hr />
        <PaymentAmountByPersonTable />
      </div>
    </div>
  );
};
