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
            selectedRegion: "",
        };
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
            data.unshift({"_id": "0000000" })
            this.setState(
                {
                    users: data,
                }
            )
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
                    <RegionTable cities={this.state.cities} />
                </div>
            </div>
        )
    }
}
ReactDom.render(
    <Main />, document.getElementById('react-app')
);
