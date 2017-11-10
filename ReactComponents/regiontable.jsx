import React from 'react';
import $ from 'jquery';
import { Table, Column, Cell } from 'fixed-data-table-2';

require('../ReactComponents/node_modules/fixed-data-table-2/dist/fixed-data-table.css');

export class RegionTable extends React.Component {


    render() {
        return (
            <Table
                id='regionTable'
                rowHeight={50}
                rowsCount={(this.props.cities == null || this.props.cities == undefined) ? 0 : this.props.cities.length}
                width={900}
                height={400}
                headerHeight={75}
            >
                <Column
                    columnKey="name"
                    width={200}
                    header={<HEADERCELL name="City" />}
                    cell={<TEXTCELL data={this.props.cities} />}
                />
                <Column
                    columnKey="region"
                    width={200}
                    header={<HEADERCELL name="Region" />}
                    cell={<TEXTCELL data={this.props.cities} />}
                />
                <Column
                    columnKey="latitude"
                    width={200}
                    header={<HEADERCELL name="Latitude" />}
                    cell={<TEXTCELL data={this.props.cities} />}
                />
                <Column
                    columnKey="longitude"
                    width={200}
                    header={<HEADERCELL name="Longitude" />}
                    cell={<TEXTCELL data={this.props.cities} />}
                />
                <Column
                    columnKey="visited"
                    width={100}
                    header={<HEADERCELL name="Visited" />}
                    cell={<CheckBoxCell visited={this.props.visited} data={this.props.cities} 
                    handleCheckboxChange={()=>this.props.handleChange()}/>}
                />
            </Table>
        )
    }
}

class CheckBoxCell extends React.Component {
    constructor() {
        super();
        this.state = {
            filteredCities: []
        }
    }
    componentDidMount() {
        this.filteredCities = {}
        if (this.props.data) {
            this.filteredCities = this.props.visited.filter((x) => {
                return (x.latitude == this.props.data[this.props.rowIndex].latitude && x.longitude == this.props.data[this.props.rowIndex].longitude)
            })
            this.setState({
                visited: this.filteredCities.length > 0,
                filteredCities: this.filteredCities
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.filteredCities = {}
            if (nextProps.data) {
                this.filteredCities = nextProps.visited.filter((x) => {
                    return (x.latitude == nextProps.data[nextProps.rowIndex].latitude && x.longitude == nextProps.data[nextProps.rowIndex].longitude)
                })
                this.setState({
                    visited: this.filteredCities.length > 0,
                    filteredCities: this.filteredCities
                })
            }
        }
    }


    handleCheckboxChange() {
        if (this.state.filteredCities.length == 0) {
            this.visitToUpdate = {
                _id:"",
                user_id:"",
                City:this.props.data[this.props.rowIndex].name,
                Region:this.props.data[this.props.rowIndex].region,
                Latitude:this.props.data[this.props.rowIndex].latitude,
                Longitude:this.props.data[this.props.rowIndex].longitude,
            }

            $.ajax({
                type: "POST",
                url: '../api/UserVisit',
                data: JSON.stringify(this.visitToUpdate),
                dataType: "JSON",
                contentType: "application/JSON, charset=utf-8",
                success: () => {this.props.handleCheckboxChange()}
            })
        } else {
            $.ajax({
                type: "DELETE",
                url: '../api/UserVisit/' + this.state.filteredCities[0]._id,
                success: () => {this.props.handleCheckboxChange()}
            })
        }
    }


    render() {
        return (
            <Cell><label className="form-check-label"><input onChange={() => this.handleCheckboxChange()} checked={this.state.visited} type="checkbox" className="form-check-input"></input></label></Cell>
        )
    }
}

const HEADERCELL = (props) => <Cell>{props.name}</Cell>

const TEXTCELL = (props) => <Cell>{props.data[props.rowIndex][props.columnKey]}</Cell>