import React from 'react';
import ReactDom from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPlace: {}
        }
    }

    getLocations() {
        console.log("getLocations")
        console.log(this.props.visited)
        if (this.props.visited) {
            console.log("getLocationsVisited=True")
            return (
                this.props.visited.map((x) => {
                    return (
                        <Marker key={x._id} name={x.name} position={{ lat: x.latitude, lng: x.longitude }} />
                    )
                }))
        }
    }

    render() {
        return (
            <Map google={this.props.google} style={{width:'47%', height:'47%', position: 'relative'}} zoom={4} initialCenter={{
                lat: 39.8283,
                lng: -98.5795
            }}>
                {this.getLocations()}
                {/* <InfoWindow onClose={this.onInfoWindowClose}>)
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow> */}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCOzCJ80zYlUN8By0xxZH6aSU_p_QbylwQ",

})(MapContainer)