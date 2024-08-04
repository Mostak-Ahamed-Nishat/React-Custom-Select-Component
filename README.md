# Custom Select Component

## Overview

The `Select` component is a customizable dropdown selector that supports single and multi-select modes. It also includes features for search functionality and option clearing. This component is built using React and SCSS for styling.

   [**✅Live Demo**](https://task-shopping-cart.onrender.com/)        ✅ [**Author**](https://github.com/Mostak-Ahamed-Nishat)  ✅ [**Report Issues**](https://github.com/Mostak-Ahamed-Nishat/task_shopping_cart/issues)


## Features

- **Searchable**: Supports searching through options.
- **Clearable**: Allows clearing selected options.
- **Multi-select**: Supports selecting multiple options.
- **Disabled state**: Can be disabled to prevent interactions.
- **Customizable**: Easily customizable through props.

## Installation

Ensure you have `react` and `react-dom` installed in your project. Install the `Select` component via npm or yarn:

### Clone the project
```
git clone https://github.com/Mostak-Ahamed-Nishat/React-Custom-Select-Component.git
```

```bash
npm install
```
### or
```bash
yarn add
```

### Run at local server
```bash
npm run dev
```

## Props
| Props             | Type                                                                |Default                | Descriptions |
| ----------------- | ------------------------------------------------------------------ |---------|-------------------------------------|
| isClearable | boolean | false |If true, displays a clear button to clear all selected items.
| isSearchable | boolean | false |If true, enables search functionality in the dropdown.
| isDisabled | boolean | false |If true, disables the select component and its interactions.
| options | array | [] |Array of options to display in the dropdown. Each option should have id and name properties.
| value | array | [] |Array of selected options.
| placeholder | string | "Search Item" |Placeholder text for the search input.
| isGrouped | boolean | false |If true, the options array should include groups.
| isMulti | boolean | true |If true, allows selecting multiple options.
| onChangeHandler | function |  |Callback function when an option is selected. Receives the selected item as an argument.
| onMenuOpen | function |  |Callback function when the menu opens or closes. Receives the menu state as an argument.
| onSearchHandler | function |  |	Optional callback function for handling search input. Receives the search query as an argument.
| isOpen | boolean |  false|	Controls whether the dropdown menu is open.
| clearHandler | function |  |		Callback function to handle clearing of selected items. Optionally receives the item to clear.

## Styling
The component uses SCSS for styling. The styles are imported from Select.module.scss. Customize the styles as needed to fit your design.

## Contributing
Feel free to submit issues or pull requests to improve the component.
