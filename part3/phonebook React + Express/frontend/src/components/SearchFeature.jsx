

const SearchFeature = ({ search, handleChange }) => (
  <>
    <label htmlFor="search">Search User</label>
    <br />
    <input onChange={handleChange} type="text" value={search} name="search" id="search"/>
  </>
);

export default SearchFeature;
