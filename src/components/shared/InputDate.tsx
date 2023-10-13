import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface InputDate {
  onChange: (text: string) => void;
  days: string[];
}

const InputDate = ({ onChange, days }: InputDate) => {
  const changeDate = (e: React.SyntheticEvent<Element, Event>) => {
    onChange((e.target as HTMLElement).innerHTML);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={days}
      sx={{ width: 100 }}
      renderInput={params => <TextField {...params} label="Date" />}
      onChange={changeDate}
    />
  );
};

export { InputDate };
