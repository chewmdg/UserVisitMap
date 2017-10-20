import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import {RegionTable} from './regiontable.jsx'

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            cities: [],
            regions: [],
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
            this.setState(
                {
                    regions: data,
                }
            )
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label className="label">Cities</label>
                    <select>
                        {this.state.cities.map((x) => { return (<option key={x.name + x.latitude} value={x.name}>{x.name}</option>) })}
                    </select>
                </div>
                <div>
                    <label>Regions</label>
                    <select>
                        {this.state.regions.map((x) => { return (<option key={x._id} value={x.name}>{x.name}</option>) })}
                    </select>
                </div>
                <div>
                <RegionTable cities = {this.state.cities}/>
                </div>
            </div>
        )
    }
}
ReactDom.render(
    <Main />, document.getElementById('react-app')
);
