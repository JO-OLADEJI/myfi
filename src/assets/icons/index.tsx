import React from "react";
import info from "./info.png";
import search from "./search.png";

export const InfoIcon = <PROPS extends object>({
  ...props
}: PROPS): JSX.Element => {
  return <img src={info} alt="info" {...props} />;
};

export const SearchIcon = <PROPS extends object>({
  ...props
}: PROPS): JSX.Element => {
  return <img src={search} alt="search" {...props} />;
};
