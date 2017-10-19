import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'


class Main extends React.Component {

    render() {
        return (<div>Hello</div>)
    }
}
ReactDom.render(
    <Main />, document.getElementById('react-app')
);
