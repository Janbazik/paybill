import React, { useEffect } from "react";

import "./App.css";
import { HomePage } from "./core";
import { useUsersContext } from "./state";

function PayBillMainApp() {
  const { getUsers } = useUsersContext();
  useEffect(() => {
    getUsers?.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-main-container">
      <HomePage />
    </div>
  );
}

export default PayBillMainApp;
