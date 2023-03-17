function App() {
  return (
    <div>
      <h1>Hello from React</h1>
      <UserList />
    </div>
  );
}

function generateInitialState() {
  const inputFields = {};
  fields.primary.forEach((field) => {
    inputFields[field.name] = '';
  });
  return inputFields;
}

function UserList() {
  const [primaryFields, setPrimaryFields] = React.useState(
    generateInitialState()
  );

  function updateInput(e) {
    const { name, value } = e.currentTarget;
    setPrimaryFields({
      ...primaryFields,
      [name]: value,
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
      {fields.primary.map((field) => {
        return (
          <div key="">
            <label>{field.label}</label>
            <input
              name={field.name}
              onChange={updateInput}
              value={primaryFields[field.name]}
            />
          </div>
        );
      })}

      <button
        onClick={() => {
          setPrimaryFields({
            ...primaryFields,
            first: 'Joe',
            last: 'XYZ',
          });
        }}
      >
        fill fields
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
