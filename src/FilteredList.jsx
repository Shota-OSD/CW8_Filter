import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';
import './FilteredList.css'; 

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selectedType: "all" // Default selected type is "all"
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  onTypeSelect = (selectedType) => {
    this.setState({ selectedType });
  }

  filterItem = (item) => {
    // Check if the current search term is contained in this item
    const isSearchMatch = item.name.toLowerCase().search(this.state.search) !== -1;

    // Check if the item type matches the selected type
    const isTypeMatch = this.state.selectedType === "all" || item.type.toLowerCase() === this.state.selectedType;

    return isSearchMatch && isTypeMatch;
  }

  render() {
    return (
      <div className="filter-list">
        {/* DropdownButton for filtering by type */}
        <DropdownButton id="typeDropdown" title={"Filter by Type"} onSelect={this.onTypeSelect}>
          <Dropdown.Item eventKey="all">All</Dropdown.Item><br />
          <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item><br />
          <Dropdown.Item eventKey="vegetable">Vegetable</Dropdown.Item>
        </DropdownButton>
        <br />
        
        {/* Search input */}
        <input type="text" placeholder="Search" onChange={this.onSearch} />

        {/* List component with filtered items */}
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
