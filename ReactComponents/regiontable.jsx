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
                rowsCount={(this.props.cities == null || this.props.cities == undefined)?0 : this.props.cities.length}
                width={900}
                height={400}
                headerHeight={75}
            >
                <Column
                    columnKey="name"
                    width={200}
                    header={<HEADERCELL name="City" />}
                    cell={<TEXTCELL data={this.props.cities}/>}
                />
                <Column
                    columnKey="region"
                    width={200}
                    header={<HEADERCELL name="Region" />}
                    cell={<TEXTCELL data={this.props.cities}/>}
                />
                <Column
                    columnKey="latitude"
                    width={200}
                    header={<HEADERCELL name="Latitude" />}
                    cell={<TEXTCELL data={this.props.cities}/>}
                />
                <Column
                    columnKey="longitude"
                    width={200}
                    header={<HEADERCELL name="Longitude" />}
                    cell={<TEXTCELL data={this.props.cities}/>}
                />
                <Column
                    columnKey="visited"
                    width={100}
                    header={<HEADERCELL name="Visited" />}
                    cell={<CheckBoxCell/>}
                />
            </Table>
        )
    }
}

class CheckBoxCell extends React.Component {
    render(){
    return(
        <Cell><label className="form-check-label"><input onChange={(e)=>this.handleCheckboxChange} type="checkbox" className="form-check-input"></input></label></Cell>
    )
}
}

const HEADERCELL = (props) => <Cell>{props.name}</Cell>

const TEXTCELL = (props) => <Cell>{props.data[props.rowIndex][props.columnKey]}</Cell>