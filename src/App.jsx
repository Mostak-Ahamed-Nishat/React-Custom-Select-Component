import { useState } from "react";
import Select from "./components/Select";

function App() {
  const Options = [
    { id: "4523", name: "Burger" },
    { id: "4613", name: "Chicken" },
    { id: "4663", name: "Salad" },
    { id: "4799", name: "Sandwich" },
    { id: "4213", name: "Bread" },
    { id: "4698", name: "Steak" },
    { id: "3254", name: "Tuna Steak and big test" },
    { id: "4987", name: "Fish" },
    { id: "4148", name: "Shrimp" },
    { id: "4636", name: "Rice" },
    { id: "4637", name: "Cake" },
    { id: "4793", name: "Sweets" },
  ];

  const [onMenuOpen, setOnMenuOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [isMulti, setIsMulti] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const onChangeHandler = (item) => {
    if (isMulti) {
      setValue((prevItems) =>
        prevItems.some((selectedItem) => selectedItem.id === item.id)
          ? prevItems
          : [...prevItems, item]
      );
    } else {
      setValue([item]);
    }
  };

  const clearHandler = (item = null) => {
    if (item) {
      const updateList = value.filter((option) => option.id !== item.id);
      setValue(updateList);
    } else {
      setValue([]);
    }
  };

  return (
    <>
      <Select
        Options={Options}
        onMenuOpen={(isOpen) => setOnMenuOpen(isOpen)}
        isOpen={onMenuOpen}
        Value={value}
        onChangeHandler={onChangeHandler}
        isSearchable
        isClearable
        clearHandler={clearHandler}
        Placeholder="Search Chicken .."
        isMulti={isMulti}
        isDisabled={isDisabled}
      />
    </>
  );
}

export default App;
