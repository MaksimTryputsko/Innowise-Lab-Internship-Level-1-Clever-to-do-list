import React, { ChangeEventHandler, SyntheticEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";

interface InputDate {
  setDate:
    | ((
        event: any,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined,
      ) => void)
    | undefined;
  days: string[];
}

const InputDate = ({ setDate, days }: InputDate) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={days}
      sx={{ width: 100 }}
      renderInput={params => <TextField {...params} label="Date" />}
      onChange={setDate}
    />
  );
};

export { InputDate };
