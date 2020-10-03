import React, { useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import { WrappedMap } from './Map'
import axios from "axios";

export default function MapAddressToCoordinates(props) {

    const [maps, updateMaps] = useState([]);

    useEffect(() => {
        var location = props.address;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyBWay14rjaenxM_YmVEP1pTXYME-ir9CLg'
            }
        }).then(response => {
            updateMaps(
                <div style={{ width: '35vw', height: '44vh' }} >
                    <WrappedMap
                        lat={response.data.results[0].geometry.location.lat}
                        lng={response.data.results[0].geometry.location.lng}
                        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBWay14rjaenxM_YmVEP1pTXYME-ir9CLg'}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                </div> )
            })
     },[])

    return (
        {maps}
    )  
   
}

/*const geocode = () => {
    var location = probs.event.address;
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