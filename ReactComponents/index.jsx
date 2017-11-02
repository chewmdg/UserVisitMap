import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import { RegionTable } from './regiontable.jsx'

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
        };
    }

    componentWillMount() {
        let isAuthenticated
        $.getJSON('../api/Account/IsAuthenticated', data => {
            isAuthenticated = data
            console.log(data)
            if (isAuthenticated == false) {
                window.location.href = './auth/login.html';
            }else{
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

        $.getJSON('../api/UserVisit', data => {
            this.setState(
                {
                    userVisits: data,
                }
            )
            console.log(this.state.userVisits)
        })


    }

    handleRegionChange(e) {
        this.setState({
            selectedRegion: e.target.value
        },
            this.updateCities(e.target.value)
        )
    }

    handleUserChange(e) {
        this.setState({
            selectedUser: e.target.value
        }
        )
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
                    <div>
                        <label>User</label>
                        <select onChange={(e) => { this.handleUserChange(e) }}>
                            {this.state.users.map((x) => { return (<option key={x._id} value={x._id}>{x._id}</option>) })}
                        </select>
                    </div>
                    <div>
                        <label>Region</label>
                        <select onChange={(e) => { this.handleRegionChange(e) }}>
                            {this.state.regions.map((x) => { return (<option key={x._id} value={x.name}>{x.name}</option>) })}
                        </select>
                    </div>
                    <div>
                        <RegionTable cities={this.state.cities}  visited={this.state.userVisits}/>
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
