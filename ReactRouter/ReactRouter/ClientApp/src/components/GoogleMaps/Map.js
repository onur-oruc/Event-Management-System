import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import mapStyles from './mapStyles'


function Map(props) {
    var parsedLat = parseFloat(props.lat);
    var parsedLng = parseFloat(props.lng);

    return (
        <div>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: parsedLat, lng: parsedLng  }}
                defaultOptions={{ styles: mapStyles }}
            >
                <Marker
                    key="1"
                    position={{ lat: parsedLat, lng: parsedLng }}
                    icon={{
                        url: '/eventIcon.png',
                        scaledSize: new window.google.maps.Size(30, 30)
                    }}
                />

            </GoogleMap>
        </div>
    )
}
export const WrappedMap = withScriptjs(withGoogleMap(Map))
export default Map
