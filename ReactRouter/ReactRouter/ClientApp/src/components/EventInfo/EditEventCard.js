import Card from 'react-bootstrap/Card'
import React, { useState, useEffect } from 'react';
import ReactDialog from "../Dialog/ReactDialog";
//import { Button } from 'react-bootstrap'
import Button from "@material-ui/core/Button";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ParticipantsInfo from '../Dialog/ParticipantsInfo';
import EditDialog from '../Dialog/EditDialog';

export default function EditEventCard(props) {
    //update event
    const eventDialogFields = [
        { id: "studentNumber", label: "Event Name", type: "text" },
        { id: "startDate", type: "date" }, 
        { id: "endDate", type: "date" },
        { id: "address", label: "Address", type: "email" },
        { id: "quota", label: "Quota", type: "long" },
        { id: "lat", label: "Lat of the address", type: "text" },
        { id: "lng", label: "Lng of the address", type: "text" },
    ]
    const [isUpdateEventModalOpen, updateIsUpdateEventModalOpen] = useState(false);

    const togglUpdateEventModal = () => {
        updateIsUpdateEventModalOpen(!isUpdateEventModalOpen);
    }

    const onEventUpdate = (inputData) => {
        let today = new Date();
        today.setDate(today.getDate() - 1);
        let inputDate = new Date(inputData.startDate);
        let inputEndDate = new Date(inputData.endDate);

        if (inputDate.getTime() >= today.getTime()) {
            if (inputEndDate.getTime() < inputDate.getTime()) {
                alert("End date cannot be before start date")
            }
            else {
                axios.put("/students/" + props.event.studentNumber, inputData)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.messageType === "SUCCESS") {
                            toast.success(response.data.message, toastOptions);
                            updateRows([...rows, inputData]);
                        } else {
                            toast.error(response.data.message, toastOptions);
                        }
                    });
                alert("Updated carefully")
                togglUpdateEventModal();
            }
        }
        else {
            alert("You cannot choose a past date!")
        }

    }


    // get participants
    const [participants, updateParticipants] = useState([]);

    useEffect(() => {
        axios.get("/students/" + props.event.studentNumber+ "/books")
            .then(response => {
                updateParticipants(response.data)
            })
    }, [])

    // list participants
    const [isListParticipantsModalOpen, updateIsAddStudentModalOpen] = useState(false);

    const toggleListParticipantsModal = () => {
        updateIsAddStudentModalOpen(!isListParticipantsModalOpen);
    }
    const [rows, updateRows] = useState([]);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    // methods
    const saveChanges = (inputData) => {
        togglUpdateEventModal()
    }

    const listParticipants = () => {
        toggleListParticipantsModal()
    }

    let studentNumber = props.event.studentNumber;
    const deleteEvent = () => {
        console.log(studentNumber);
        axios.delete("/students/" + studentNumber)
            .then(response => {
                if (response.data.messageType === "SUCCESS") {
                    updateRows(rows.filter((student) => student.studentNumber !== studentNumber));
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            })
    }

    return (
        <div className="center-page">
            <Card style={{ width: '18rem' }}>
                <div style={{ backgroundColor: "#F2E5F3" }}>
                    <h6>----------------</h6>
                    <Card.Body>
                        <Card.Title>
                            <h3 style={{ color: "orangered" }}>{props.event.studentNumber}</h3>
                        </Card.Title>

                        <Card.Text>
                            <div>
                                <h4 style={{ fontStyle: "italic" }}> Address </h4>
                                {props.event.address}
                                <h4 style={{ fontStyle: "italic" }}> Date </h4>
                                {props.event.startDate} - {props.event.endDate}
                                <h4 style={{ fontStyle: "italic" }}> Quota: {props.event.quota} </h4>
                            </div>
                        </Card.Text>

                        <br />
                        <div className="center-page">
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={saveChanges}
                                > Edit
                                </Button>

                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={listParticipants}
                                > List Participant
                                </Button>

                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={deleteEvent}
                                > Delete
                                </Button>
                            </div>
                        </div>
                        <ParticipantsInfo
                            studentNumber={studentNumber}
                            title={studentNumber}
                            isOpen={isListParticipantsModalOpen}
                            onClose={toggleListParticipantsModal}
                        />

                        <EditDialog
                            event={props.event}
                            title={ props.event.studentNumber}
                            isOpen={isUpdateEventModalOpen}
                            onClose={togglUpdateEventModal}
                            onSubmit={onEventUpdate}
                        />

                    </Card.Body>
                    <br />
                    
                </div>
            </Card>
         </div>
    )
}