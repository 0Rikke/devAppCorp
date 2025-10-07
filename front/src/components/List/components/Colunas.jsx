function Colunas({ colunas = [] }) {
  return (
    <thead>
      <tr>
        {colunas.map((col, index) => (
          <th key={index}>{col.name}</th>
        ))}
        <th> Edit </th>
      </tr>
    </thead>
  );
}

export default Colunas;
