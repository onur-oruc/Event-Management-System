import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button';
import Button from "@material-ui/core/Button";
import { WrappedMap } from '../GoogleMaps/Map'
import RegistrationForm from '../registrationform/RegistrationForm'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactDialog from "../Dialog/ReactDialog";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapAddressToCoordinates from '../GoogleMaps/MapAddressToCoordinates'


 

export default function EventCard(props) {

    const enrollParticipantDialogFields = [
        { id: "fullname", label: "Full Name", type: "text" },
        { id: "email", label: "E-Mail", type: "email" },
        { id: "tcKimlikNo", label: "National ID", type: "text" },
    ]

    const [rows, updateRows] = useState([]);
    const [latlng, updateLatLng] = useState([]);

    const [isEnrollParticipantModalOpen, updateisEnrollParticipantModalOpen] = useState(false);

    const toggleEnrollParticipantModal = () => {
        updateisEnrollParticipantModalOpen(!isEnrollParticipantModalOpen);
    }

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    /*const geocode = () => {
        var location = props.event.address;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyBWay14rjaenxM_YmVEP1pTXYME-ir9CLg'
            }
        }).then(response => {
            console.log(response.data.results[0].geometry.location)
            updateLatLng(response.data.results[0].geometry.location)
        })
    }*/

    useEffect(() => { // componentDidMount gibi düşün
        axios.get("/students")
            .then(response => {
                updateRows(response.data)
            })
 
    }, [])

    // check the id is valid
    const isTcKimlikNoValid = (tcKimlikNo) => {
        if (tcKimlikNo.length != 11) {
            return false;
        }
        let sumAllNumbers = 0;
        let sumOdd = 0;
        let sumEven = 0;

        let numbers = new Array(11);
        for (let i = 0; i < 11; ++i)
            numbers[i] = parseInt(tcKimlikNo.substring(i, i + 1));

        for (let j = 0; j < 9; j++) {
            sumAllNumbers += numbers[j];
            if (j % 2 != 0)
                sumEven += numbers[j];
            else
                sumOdd = sumOdd + numbers[j];
        }

        if ((sumAllNumbers + numbers[9]) % 10 != numbers[10]) 
            return false;
        
        if ((sumOdd * 7 + sumEven * 9) % 10 != numbers[9]) 
            return false;
        

        if (((sumOdd) * 8) % 10 != numbers[10]) 
            return false;
        
        return true;
    }

    // enroll for the event
    let eventName = props.event.studentNumber
    const enrollParticipant = (inputData) => {
        let tc = inputData.tcKimlikNo

        if (isTcKimlikNoValid(tc)) {
            // date the user enrolled for the event
            let today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            inputData.registrationDate = today;

            if (props.event.quota === props.event.numParticipants) {
                alert("No quota for this event!")
                toggleEnrollParticipantModal();
            }
            if (inputData.tcKimlikNo != null
                && inputData.email != null
                && inputData.fullname != null) {
                axios.post("/students/" + eventName + "/books", inputData)
                    .then(response => {
                        if (response.data.messageType === "SUCCESS") {
                            toast.success(response.data.message, toastOptions);
                            updateRows([...rows, inputData]);
                            console.log(rows);
                        } else {
                            toast.error(response.data.message, toastOptions);
                        }
                    });
                toggleEnrollParticipantModal();
            }
            else {
                alert("All of the fields should be filled!");
            }
        }
        else {
            alert ( "National ID is not valid")
        }
    }

    let title = "Enroll for the event: " + props.event.studentNumber;
    return (
        <div className="center-page">
            <Card  style={{ width: '18rem' }}>
                <div style={{ backgroundColor: "#F2E5F3" }}>
                    <h6>---------------</h6>
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
                            </div>
                        </Card.Text>


                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={toggleEnrollParticipantModal}
                        > Enroll
                        </Button>

                        <ReactDialog
                            fields={enrollParticipantDialogFields}
                            title={title}
                            isOpen={isEnrollParticipantModalOpen}
                            onClose={toggleEnrollParticipantModal}
                            onSubmit={enrollParticipant}
                            buttonLabel="ENROLL"/>


                    </Card.Body>
                    <br />
                    <h4 style={{ fontStyle: "italic" }}> Remaining Quota: {props.event.quota - props.event.numParticipants} </h4> 
                    <div style={{ width: '35vw', height: '44vh' }}>
                        <WrappedMap
                            lat={props.event.lat}
                            lng={props.event.lng}
                            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBWay14rjaenxM_YmVEP1pTXYME-ir9CLg'}
                            loadingElement={<div style={{ height: '100%' }} />}
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '100%' }} />}
                        />
                    </div>
                </div>
            </Card>
            
        </div>
   )
}

