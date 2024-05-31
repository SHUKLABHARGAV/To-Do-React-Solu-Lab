 import PropTypes from 'prop-types';

const SearchBox = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = () => {
    handleSearch();
  };

  return (
    <div>
      <input
      style={{width:"66%"}}
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

SearchBox.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBox;
