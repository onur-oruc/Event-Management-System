import React, { useEffect, useState} from 'react';
//import { Button } from 'react-bootstrap'
import history from './history'
import EventContainer from './EventContainer'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ReactDialog from "./components/Dialog/ReactDialog";
import EditEventCard from './components/EventInfo/EditEventCard';
import Button from "@material-ui/core/Button";
import EventChart from './components/Chart/EventChart';

function AdminEventsPage() {
    //admin events
    

    const [events, updateEvents] = useState([]);

    useEffect(() => {
        axios.get("/students")
            .then(response => {
                updateEvents(response.data
                    .map(task => <EditEventCard event={task} /> ))
            })
    }, [])



    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    const studentDialogFields = [
        { id: "studentNumber", label: "Event Name", type: "text" },
        { id: "startDate", type: "date", },
        { id: "endDate",  type: "date" },
        { id: "address", label: "Address", type: "email" },
        { id: "quota", label: "Quota", type: "long" },
        { id: "lat", label: "Lat of the address", type: "text" },
        { id: "lng", label: "Lng of the address", type: "text" },
    ]

    const [rows, updateRows] = useState([]);
    const [isAddStudentModalOpen, updateIsAddStudentModalOpen] = useState(false);

    const toggleAddStudentModal = () => {
        updateIsAddStudentModalOpen(!isAddStudentModalOpen);
    }

    const submitStudentAdd = (inputData) => {
        let today = new Date();
        today.setDate(today.getDate() - 1);
        let inputDate = new Date(inputData.startDate);
        let inputEndDate = new Date(inputData.endDate);
        
        if (inputDate.getTime() >= today.getTime()) {
            if (inputEndDate.getTime() < inputDate.getTime()) {
                alert("End date cannot be before start date")
            }
            else {
                axios.post("/students", inputData)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.messageType === "SUCCESS") {
                            toast.success(response.data.message, toastOptions);
                            updateRows([...rows, inputData]);
                        } else {
                            toast.error(response.data.message, toastOptions);
                        }
                    });
                toggleAddStudentModal();
            }
        }
        else {
            alert("You cannot choose a past date!")
        }
    }


    return (
        <div>
             <h2 style={{ color: "white" }}> Event Management Page </h2>
             <div className="center-page">
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ float: "right" }}
                    onClick={() => history.push('/')}
                > Log Out
                </Button>
                <Button variant="contained"
                    color="primary"
                    style={{ float: "right" }}
                    onClick={toggleAddStudentModal} >
                    Add Event
                </Button>

                <ReactDialog
                    fields={studentDialogFields}
                    title="Add Event"
                    isOpen={isAddStudentModalOpen}
                    onClose={toggleAddStudentModal}
                    onSubmit={submitStudentAdd}
                    buttonLabel="ADD" />

                <ToastContainer />
                <br />
                <br />
            </div>
            <div>
                {events}
            </div>
        </div>
    );
}
export default AdminEventsPage;
