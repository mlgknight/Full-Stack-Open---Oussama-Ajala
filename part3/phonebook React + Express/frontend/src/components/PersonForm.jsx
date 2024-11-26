

const PersonForm = ({ onSubmit, newName, handleChange, number }) => (
  <form onSubmit={onSubmit}>
    <div>
      Name: <input onChange={handleChange} value={newName} name="newName" />
      <br />
      Number: <input onChange={handleChange} value={number} name="number" />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default PersonForm;
