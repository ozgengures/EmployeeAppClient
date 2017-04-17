import React from 'react';

import Col from "react-bootstrap/lib/Col";
import Tabs from "react-bootstrap/lib/Tabs.js";
import Tab from "react-bootstrap/lib/Tab";
import Navbar from "react-bootstrap/lib/Navbar.js";
import Nav from "react-bootstrap/lib/Nav.js";
import NavItem from "react-bootstrap/lib/NavItem";
import Employee from "./pages/Employee.js";
import Department from "./pages/Department.js";
import Meeting from "./pages/Meeting.js";
import jajax from "robe-ajax";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeData: [],
            departmentData: [],
            meetingData: []
        };
    }

    render() {
        return (
            <Col>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="https://github.com/ozgengures">React-Bootstrap-SpringBoot Example</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="https://github.com/ozgengures">github.com/ozgengures</NavItem>
                    </Nav>
                </Navbar>
                <Col style={{paddingLeft: 100,paddingRight: 100}}>

                    <Tabs defaultActiveKey={2} onSelect={this.__onSelect} id="uncontrolled-tab-example">
                        <Tab eventKey={1} departmentData={this.state.departmentData} title="Employee">
                            <Employee />
                        </Tab>
                        <Tab eventKey={2} title="Department">
                            <Department departmentData={this.state.departmentData}
                                        meetingData={this.state.meetingData}/>
                        </Tab>
                        <Tab eventKey={3} title="Meeting">
                            <Meeting/>
                        </Tab>
                    </Tabs>
                </Col>
            </Col>);
    }

;

    __onSelect = (key) => {
        if (key === 2) {
            this.__getDepartmentDatas();
            this.__getMeetingDatas();
        }
        if (key === 1) {
            this.__getDepartmentDatas();
        }
    };

    __getDepartmentDatas() {
        jajax.ajax({
            url: "http://localhost:8080/department/findAll",
            method: "GET",
            dataType: "application/json",
            crossDomain: true
        }).always(function (xhr) {
            if (xhr.status === 200) {
                this.setState({departmentData: JSON.parse(xhr.responseText)});
            }
        }.bind(this));

    }

;

    __getMeetingDatas = () => {
        jajax.ajax({
            url: "http://localhost:8080/meeting/findAll",
            method: "GET",
            dataType: "application/json",
            crossDomain: true
        }).always(function (xhr) {
            if (xhr.status === 200) {
                this.setState({meetingData: JSON.parse(xhr.responseText)});
            }
        }.bind(this));
    };
}


