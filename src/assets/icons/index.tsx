import info from "./info.png";
import search from "./search.png";
import tag from "./tag.png";

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

export const TagIcon = <PROPS extends object>({
  ...props
}: PROPS): JSX.Element => {
  return <img src={tag} alt="tag" {...props} />;
};
