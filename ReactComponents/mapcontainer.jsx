import React from 'react';
import ReactDom from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: {},
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    onMarkerClick(props, marker, e){
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }

      onMapClicked(){
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      }

    getLocations() {
        if (this.props.visited) {
            return (
                this.props.visited.map((x) => {
                    return (
                        <Marker key={x._id} name={x.city} position={{ lat: x.latitude, lng: x.longitude }} onClick={(props,marker, e)=>this.onMarkerClick(props, marker, e)} 
                        icon={{
                            //url: "/icon/flag.png",        //custom icon
                            scaledSize: new google.maps.Size(40,40)
                          }}/>
                    )
                }))
        }
    }

    render() {
        return (
            <Map clickableIcons={false} onClick={()=>this.onMapClicked()} google={this.props.google} style={{ width: '47%', height: '47%', position: 'relative' }} center={{
                lat: this.props.mapCenter.Latitude,
                lng: this.props.mapCenter.Longitude
            }} zoom={this.props.mapZoom} initialCenter={{
                lat: this.props.mapCenter.Latitude,
                lng: this.props.mapCenter.Longitude
            }}>
                {this.getLocations()}
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCOzCJ80zYlUN8By0xxZH6aSU_p_QbylwQ",

})(MapContainer)