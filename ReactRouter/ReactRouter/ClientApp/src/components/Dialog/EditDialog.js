import React, { useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function ReactDialog(props) {

    const [inputData, updateInputData] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        let newInputData = { ...inputData };
        newInputData[event.target.id] = event.target.value;
        updateInputData(newInputData);
    }

    return (
        <Dialog open={props.isOpen} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Event "{props.title}" </DialogTitle>
            <DialogContent>

                <TextField
                    defaultValue={props.event.studentNumber} required="true" margin="dense" id="studentNumber" key="studentNumber"
                    helperText="Event Name" type="text" fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    defaultValue={props.event.startDate} required="true" margin="dense" id="startDate" key="startDate"
                    helperText="Start Date" type="date" fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    defaultValue={props.event.endDate} required="true" margin="dense" id="endDate" key="endDate"
                    helperText="End Date" type="date" fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    defaultValue={props.event.address} required="true" margin="dense" id="address" key="address"
                    helperText="Address" type="text" fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    defaultValue={props.event.quota} required="true" margin="dense" id="quota" key="quota"
                    helperText="Quota" type="long" fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    defaultValue={props.event.lat} required="true" margin="dense" id="lat" key="lat"
                    helperText="Coordinates: Lat" type="text" fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    defaultValue={props.event.lng} required="true" margin="dense" id="lng" key="lng"
                    helperText="Coordinates: Lng" type="text" fullWidth
                    onChange={handleInputChange}
                />


            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => { props.onSubmit(inputData) }} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );

}