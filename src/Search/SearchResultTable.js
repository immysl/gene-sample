import React from 'react';

function SearchResultTable({ transcriptList }) {
  let transcriptRows = [];

  // create table rows for each transcript
  transcriptList.forEach((transcript) => {
    transcriptRows.push(
      <tr key={transcript.id}>
        <td><a href={`http://www.ensembl.org/id/${transcript.id}`}
          target="_blank"
          rel="noopener noreferrer">{transcript.id}</a></td>
        <td>{transcript.display_name}</td>
        <td>{transcript.assembly_name}</td>
        <td>{transcript.Parent}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Transcript ID</th>
          <th>Display Name</th>
          <th>Assembly Name</th>
          <th>Protein ID</th>
        </tr>
      </thead>

      {/* display all the transcript rows */}
      <tbody>{transcriptRows}</tbody>
    </table>
  );
}

export default SearchResultTable;
