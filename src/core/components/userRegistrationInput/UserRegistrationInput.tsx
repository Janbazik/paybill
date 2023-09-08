import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUsersContext } from "../../../state";

export const UserRegistrationInput = () => {
  const { addUser, setNewPersonQuery, newPersonQuery } = useUsersContext();
  return (
    <div className="pb-user-registration--container pb-row">
      <TextField
        onChange={({ target }: any) => {
          const { value } = target;
          setNewPersonQuery(value);
        }}
        value={newPersonQuery}
        label="Add Person"
        variant="outlined"
        name="name"
      />
      <Button
        variant="contained"
        onClick={() => {
          addUser.execute();
        }}
      >
        Add
      </Button>
    </div>
  );
};
