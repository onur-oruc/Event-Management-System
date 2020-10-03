import React, {useEffect, useState} from 'react';
import PaginationTable from "./components/table/PaginationtTable";
import axios from "axios";

function App() {

    const tableColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'surname', label: 'Surname', minWidth: 100 },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'tcKimlikNo',
            label: 'TC Kimlik No',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'studentNumber',
            label: 'Student Number',
            minWidth: 170,
            align: 'right',
        },
    ];

    const [tableRows, updateTableRows] = useState([]);

    useEffect(() => {
        axios.get("/students")
            .then(response => {
                console.log(response);
                updateTableRows(response.data);
            })
    },[])

    return (
        <div className="App">
            <PaginationTable columns={tableColumns} rows={tableRows}/>
        </div>
    );
}

export default App;
