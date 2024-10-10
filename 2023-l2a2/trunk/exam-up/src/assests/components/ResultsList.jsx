import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { base_url } from "../../baseURL";

const ResultsList = () =>{
    const [results, setResults] = useState([]);
    const { id,id_examen } = useParams();

    const getResults = async () => {
        try{
        const response = await fetch(`${base_url}liste_notes/${id}/${id_examen}`);
        if (!response.ok) {
            throw new Error("La réponse du réseau n'était pas ok");
          }
          const jsonData = await response.json();
          setResults(jsonData);
        }catch(err){
          console.error(err.message);
        }
    };
    useEffect(() => {
        getResults();
    },[id_examen])

    const tableStyle = {
        width: '100%',
        textAlign: 'center',
    };

    const table ={
        width: '100%',
    };

    const rowStyle = {
        width: '100%',
        borderBottom: '2px solid #023047',
        textAlign: 'center',
        height: '50px',
        padding: '10px',
    };

    return(
        <div style={table}>
            <table style={tableStyle}> 

            <thead>
         <tr style={rowStyle}>
            <th>Id étudiant</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Note</th>                      
         </tr>
            </thead>

            <tbody>
          {results.map((result) =>(
          <tr key={result.id} style={rowStyle}>
            <td>{result.id}</td>
            <td>{result.nom}</td>
            <td>{result.prenom}</td>
            <td>{result.note}</td>
          </tr>
          ))}
            </tbody>
            </table>
        </div>

    );
};

export default ResultsList;