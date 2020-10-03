//import React, { useState } from 'react';
//import Dialog from "@material-ui/core/Dialog";
//import DialogTitle from "@material-ui/core/DialogTitle";
//import DialogContent from "@material-ui/core/DialogContent";
//import TextField from "@material-ui/core/TextField";
//import DialogActions from "@material-ui/core/DialogActions";
//import Button from "@material-ui/core/Button";

//export default function ParticipantsInfo(props) {

//    return (
//        <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
//            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
//            <DialogContent>
//                {props.participants.fullname}
//            </DialogContent>
//            <DialogActions>
//                <Button onClick={props.onClose} color="primary">
//                    Close
//                </Button>
//            </DialogActions>
//        </Dialog>
//    );

//}
///*
// *  sa
//                <ul>
//                    {props.participantName.map(participant => (
//                    <li>
//                        {participant}
//                    </li>
//                )
//                )}
//                </ul>
// */

import React, { useEffect, useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PaginationTable from '../ParticipantTable/PaginationTable';
import axios from "axios";

export default function ParticipantsInfo(props) {

    const participantTableColumns = [
        { id: 'fullname', label: 'Full Name', minWidth: 200, align: 'left', },
        { id: 'email', label: 'E-mail', minWidth: 200, align: 'left', },
        { id: 'tcKimlikNo', label: 'National ID', minWidth: 200, align: 'left', },
        { id: 'registrationDate', label: 'Ragistration Date', minWidth: 200, align: 'left', },
    ];

    const [rows, updateRows] = useState([]);

    useEffect(() => {
        axios.get("/students/" + props.studentNumber + "/books")
            .then(response => {
                updateRows(response.data)
            })
    }, [])

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="form-dialog-title"
            style={{ fullWidth:true }}
        >
            <DialogTitle id="form-dialog-title">Participants of "{props.title}"</DialogTitle>
            <DialogContent>

                <PaginationTable rows={rows} columns={participantTableColumns} />

            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog >
    );

}