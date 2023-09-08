import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUsersContext } from "../../../state";

const createData = (name: string, pay: string, iban: string) => ({
  name,
  pay,
  iban,
});

export const PaymentAmountByPersonTable = () => {
  const { splits, getUsers } = useUsersContext();
  const [bills, setBills] = useState<any>({});
  useEffect(() => {
    let newBills: any = {};

    splits?.forEach(({ users, price }: any) => {
      const share = price / (users?.length || 1);

      users?.forEach((user: any) => {
        const userDetail = getUsers?.result?.find(
          (value: any) => value?.id === user?.id,
        );

        if (userDetail) {
          if (!newBills[user?.id]) {
            newBills[user?.id] = {
              ...userDetail,
              pay: share,
            };
          } else {
            newBills[user?.id].pay += share;
          }
        }
      });
    });

    setBills(newBills);
  }, [splits, getUsers]);

  const rows = Object.values(bills).map((bill: any) =>
    createData(bill?.name, `$ ${parseFloat((bill?.pay) ?? 0).toFixed(2)}`, bill?.iban),
  );
  return (
    <div className="pb-payment-amout-table--container pb-row">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="Payment Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Pay</TableCell>
              <TableCell align="right">IBAN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`payment-table-row-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.pay}</TableCell>
                <TableCell align="right">{row.iban}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
