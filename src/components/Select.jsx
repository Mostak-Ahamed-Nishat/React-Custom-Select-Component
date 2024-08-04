import React, { useState, useEffect, useRef } from "react";
import Styles from "./Select.module.scss";

function Select({
  isClearable,
  isSearchable,
  isDisabled,
  Options,
  Value,
  Placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
  isOpen,
  clearHandler,
}) {
  //Search text
  const [searchValue, setSearchValue] = useState("");
  //Store the api data based on search
  const [searchData, setSearchData] = useState([]);
  //OnFocus Reference
  const searchInputRef = useRef(null);

  //If there is any search text get the data from api
  useEffect(() => {
    if (isSearchable && searchValue.trim() !== "") {
      if (onSearchHandler) {
        onSearchHandler(searchValue);
      } else {
        fetch(`https://dummyjson.com/recipes/search?q=${searchValue}`)
          .then((response) => response.json())
          .then((data) => setSearchData(data.recipes))
          .catch((err) => console.log(err));
      }
    } else {
      setSearchData([]);
    }
  }, [searchValue, onSearchHandler, isSearchable]);

  //If the isDisable is true
  useEffect(() => {
    if (isDisabled) {
      setSearchValue("");
      setSearchData([]);
    }
  }, [isDisabled]);

  //Focus on input if menu is open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    // Root Div
    <div className={Styles["select-container"]}>
      {/* Dropdown Box Container  */}
      <div
        className={Styles["select-container__box"]}
        onClick={(e) => {
          e.stopPropagation();
          onMenuOpen(!isOpen);
        }}
      >
        {/* Selected Value items  */}
        <div className={Styles["select-container__selected-items"]}>
          {Value.map((item) => (
            <span
              key={item.id}
              className={Styles["select-container__item"]}
              onClick={(e) => {
                e.stopPropagation();
                clearHandler(item);
              }}
            >
              {item.name}
              <span className={Styles["select-container__remove"]}>
                &times;
              </span>
            </span>
          ))}
          {isSearchable && (isMulti || Value.length === 0) && (
            <input
              type="text"
              ref={searchInputRef}
              className={Styles["select-container__search"]}
              placeholder={Placeholder || "Search Item"}
              disabled={isDisabled}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
        </div>

        {/* Search box */}
        <div className={Styles["select-container__controls"]}>
          {/* clear button  */}
          {/* if isClearable true then show the clear button*/}
          {isClearable && (
            <div
              className={Styles["select-container__clear-button"]}
              onClick={(e) => {
                e.stopPropagation();
                setSearchValue("");
                clearHandler();
              }}
            >
              &times;
            </div>
          )}

          {/* arrow button */}
          <div
            className={`${Styles["select-container__arrow-button"]} ${
              isOpen ? Styles["select-container__arrow-button--rotated"] : ""
            }`}
            onClick={() => onMenuOpen(!isOpen)}
            disabled={isDisabled}
          >
            &#129139;
          </div>
        </div>

        {/* DropDown items */}
        {/* If the Div box clicked or arrow clicked  */}
        {isOpen && (
          // If isOpen true visible menu
          <ul
            className={Styles["select-container__options"]}
            onClick={(e) => e.stopPropagation()}
          >
            {
              // if there is any search value then show the api data
              (searchValue && searchData.length > 0 ? searchData : Options).map(
                (option) => {
                  // Store the selected value
                  const isSelected = Value.some(
                    (selectedItem) => selectedItem.id === option.id
                  );

                  //if isGrouped then show the list
                  if (isGrouped && option.group) {
                    return (
                      <li
                        key={option.group}
                        className={Styles["select-container__group"]}
                      >
                        <div
                          className={Styles["select-container__group-label"]}
                        >
                          {option.group}
                        </div>
                        <ul>
                          {option.items.map((subOption) => {
                            const isSubOptionSelected = Value.some(
                              (selectedItem) => selectedItem.id === subOption.id
                            );
                            return (
                              <li
                                key={subOption.id}
                                className={Styles["select-container__option"]}
                                style={{
                                  backgroundColor: isSubOptionSelected
                                    ? "#f0f0f0"
                                    : "inherit",
                                  cursor: isSubOptionSelected
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                                onClick={() => {
                                  if (!isSubOptionSelected)
                                    onChangeHandler(subOption);
                                }}
                              >
                                {subOption.name}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={option.id}
                      className={`${
                        !isSelected ? Styles["select-container__option-bg"] : ""
                      } ${Styles["select-container__option"]} ${
                        isSelected
                          ? Styles["select-container__option--selected"]
                          : ""
                      }`}
                      onClick={() => {
                        if (!isSelected) onChangeHandler(option);
                      }}
                    >
                      {option.name}
                    </li>
                  );
                }
              )
            }
          </ul>
        )}
      </div>
    </div>
  );
}

export default Select;
