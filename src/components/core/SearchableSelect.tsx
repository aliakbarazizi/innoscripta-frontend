import Select, { GroupBase, Props } from "react-select";

export default function SearchableSelect<
  Option,
  Group extends GroupBase<Option>,
>(props: Props<Option, true, Group>) {
  return (
    <Select
      isMulti
      isSearchable
      isClearable
      hideSelectedOptions={false}
      filterOption={null}
      {...props}
    />
  );
}
