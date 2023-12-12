import info from "./info.png";
import search from "./search.png";

export const InfoIcon = <PROPS extends {}>({
  ...props
}: PROPS): JSX.Element => {
  return <img src={info} alt="info" {...props} />;
};

export const SearchIcon = <PROPS extends {}>({
  ...props
}: PROPS): JSX.Element => {
  return <img src={search} alt="search" {...props} />;
};
