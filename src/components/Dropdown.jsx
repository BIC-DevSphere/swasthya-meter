import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Dropdown = ({ dropdownData }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {dropdownData.map((item) => (
          <SelectItem value="light">{item.children}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
