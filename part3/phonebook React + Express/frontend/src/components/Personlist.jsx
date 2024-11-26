
const PersonList = ({ persons, handleDelete }) => (
  <>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </p>
    ))}
  </>
);

export default PersonList;
