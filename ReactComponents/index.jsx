import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import { RegionTable } from './regiontable.jsx';
import MapContainer from './mapcontainer.jsx';
import RegionCenter from './regionCenter.js';

const DEFAULTLATITUDE = 39.8283;
const DEFAULTLONGITUDE = -98.5795;
const DEFAULTZOOM = 4;

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            cities: [],
            regions: [],
            users: [],
            vmCities: [],
            userVisits: [],
            selectedRegion: "",
            isAuthenticated: false,
            mapCenter:{
                Latitude:DEFAULTLATITUDE,
                Longitude:DEFAULTLONGITUDE
            },
            mapZoom:DEFAULTZOOM
        };
    }

    componentWillMount() {
        let isAuthenticated

        $.getJSON('../api/Account/IsAuthenticated', data => {
            isAuthenticated = data
            if (isAuthenticated == false) {
                window.location.href = './auth/login.html';
            } else {
                this.setState(
                    {
                        isAuthenticated: true,
                    }
                )
            }
        })
    }


    componentDidMount() {

        $.getJSON('../api/City', data => {
            this.setState(
                {
                    cities: data,
                }
            )
        })

        $.getJSON('../api/Region', data => {
            data.unshift({ "name": "All Regions", "_id": "0000000" })
            this.setState(
                {
                    regions: data,
                }
            )
        })

        $.getJSON('../api/User', data => {
            data.unshift({ "_id": "0000000" })
            this.setState(
                {
                    users: data,
                }
            )
        })

        this.handleGetUserVisits();

    }

    handleGetUserVisits() {
        $.getJSON('../api/UserVisit', data => {
            this.setState(
                {
                    userVisits: data,
                }
            )
        })
    }

    handleRegionChange(e) {
        let center=new RegionCenter();
        let selectedCenter= center.region.filter((x)=>{return(x.RegionName == e.target.value)})[0]
        if(selectedCenter)
        {
        this.Latitude=selectedCenter.Latitude
        this.Longitude=selectedCenter.Longitude
        this.Zoom=selectedCenter.Zoom
        }else{
            this.Latitude= DEFAULTLATITUDE;
            this.Longitude= DEFAULTLONGITUDE;
            this.Zoom= DEFAULTZOOM;
        }
        this.setState({
            selectedRegion: e.target.value,
            mapCenter: {Latitude: this.Latitude, Longitude: this.Longitude},
            mapZoom:(e.target.value == "All Regions")?DEFAULTZOOM:this.Zoom
        },
            this.updateCities(e.target.value)
        )
    }

    handleUserChange(e) {
        this.setState({
            selectedUser: e.target.value
        }, () => $.ajax({
            type: "POST",
            url: '../api/UserVisit',
            data: JSON.stringify({ value: "Test" }),
            dataType: "JSON",
            contentType: "application/JSON"
        }))
    }

    handleSignOutClick(){
        $.getJSON('../api/Account/Logout', data => {
            location.reload();
        })
    }

    updateCities(region) {
        $.getJSON('../api/City?regionName=' + region, data => {
            this.setState({
                cities: data
            })
        })
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <div>
                    {/* <div>
                    <label className="label">City</label>
                    <select>
                        {this.state.cities.map((x) => { return (<option key={x.name + x.latitude} value={x.name}>{x.name}</option>) })}
                    </select>
                </div> */}
                    {/* <div>
                        <label>User</label>
                        <select onChange={(e) => { this.handleUserChange(e) }}>
                            {this.state.users.map((x) => { return (<option key={x._id} value={x._id}>{x._id}</option>) })}
                        </select>
                    </div> */}
                    <div>
                        <label>Region</label>
                        <select onChange={(e) => { this.handleRegionChange(e) }}>
                            {this.state.regions.map((x) => { return (<option key={x._id} value={x.name}>{x.name}</option>) })}
                        </select>
                    </div>
                    <div>
                        <button onClick={() => {this.handleSignOutClick()}}>Logout</button>
                    </div>
                    <div>
                        <RegionTable cities={this.state.cities} visited={this.state.userVisits} handleChange={() => this.handleGetUserVisits()} />
                    </div>
                    <div>
                        <MapContainer visited={this.state.userVisits} mapCenter={this.state.mapCenter} mapZoom={this.state.mapZoom}/>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}
ReactDom.render(
    <Main />, document.getElementById('react-app')
);
