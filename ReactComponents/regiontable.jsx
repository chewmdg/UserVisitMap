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
                width={600}
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
            </Table>
        )
    }
}

const HEADERCELL = (props) => <Cell>{props.name}</Cell>

const TEXTCELL = (props) => <Cell>{props.data[props.rowIndex][props.columnKey]}</Cell>