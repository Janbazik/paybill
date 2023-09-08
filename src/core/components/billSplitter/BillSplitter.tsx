import { useUsersContext } from "../../../state";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const BillSplitter = () => {
  const { splits, addSplit, setSplitProperty, getUsers } = useUsersContext();
  return (
    <div className="pb-bill-splitter--container pb-row">
      <div className="pb-column">
        {splits.map(({ price, users }: any, index: number) => (
          <div className="pb-row" key={`pb-bill--split-${index}`}>
            <TextField
              label="Price"
              variant="outlined"
              value={price}
              type={"number"}
              onChange={({ target }: any) => {
                const { value } = target;
                setSplitProperty("price", value, index);
              }}
            />
            <Autocomplete
              multiple
              options={getUsers?.result ?? []}
              getOptionLabel={({ name }) => name}
              value={users}
              filterSelectedOptions              
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="People"
                  placeholder="Add people to bill split"
                />
              )}
              onChange={(event: any, value: any) => {
                setSplitProperty("users", value, index);
              }}
            />
          </div>
        ))}
        <div className="pb-row">
          <Button variant="contained" onClick={addSplit}>
            Add item
          </Button>
        </div>
      </div>
    </div>
  );
};
