import React from 'react';
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import Panel from "react-bootstrap/lib/Panel";
import Col from "react-bootstrap/lib/Col";
import jajax from "robe-ajax";
import Toast from "robe-react-ui/lib/toast/Toast";
import Table from "react-bootstrap/lib/Table";
import Button from "react-bootstrap/lib/Button";
import Modal from 'react-awesome-modal';

export default class Meeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingData: [],
            departmentData: [],
            department: "",
            id: undefined,
            name: "",
            description: "",
            update: false,
            buttonName: "Add New ",
            visible: false
        };
    }

    render() {
        return (

            <Panel header={"Meeting"} bsStyle="success">

                <Modal
                    visible={this.state.visible}
                    width="500"
                    height="350"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                    >

                    <Col style={{padding: 10}}>
                        <TextInput
                            label="Name"
                            name="name"
                            validationDisplay="overlay"
                            value={this.state.name}
                            onChange={this.__handleChange}
                            validations={{
                        required: true

                    }}/>

                        <TextInput
                            label="Description"
                            name="description"
                            validationDisplay="overlay"
                            value={this.state.description}
                            onChange={this.__handleChange}
                            validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
                    }}/>
                        {this.__closePopupButton()}
                        <Button className="pull-right" bsStyle="success" style={{marginTop: 15}}
                                onClick={this.__saveDepartment}>{this.state.buttonName} Meeting</Button>
                    </Col>
                </Modal>
                {this.__renderTable()}

                <Button className="pull-right" bsStyle="success" style={{marginBottom: 15}}
                        onClick={() => this.openModal()}> Add New Meeting</Button>
            </Panel>
        );
    }


    __handleChange = (e) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    };

    __closePopupButton = () => {
        return <Button className="pull-left" bsStyle="success" style={{marginTop: 15}}
                       onClick={() => this.closeModal()}> Cancel</Button>;
    };

    __renderTable = () => {
        return <Table responsive style={{marginTop: 60}}>
            <thead>
            <tr>
                <th>Meeting Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {this.__renderTableRows()}

            </tbody>
        </Table>;
    };

    __renderTableRows = () => {
        let arr = [];
        let datas = this.state.meetingData;
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            arr.push(
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>
                        <Button style={{margin: 5}}
                                onClick={this.__fillAreasWithSelectedMeeting.bind(undefined, data)}>
                            Update
                        </Button>
                        <Button style={{margin: 5}}
                                onClick={this.__onDelete.bind(undefined, data)}>
                            Delete
                        </Button>
                    </td>
                </tr>);
        }
        return arr;
    };


    __fillAreasWithSelectedMeeting = (data) => {
        this.openModal();
        this.setState({
            id: data.id,
            name: data.name,
            description: data.description,
            buttonName: "Update ",
            update: true
        });
    };


    __clearForm() {
        this.setState({
            id: undefined,
            name: "",
            description: "",
            department: "",
            buttonName: "Add New ",
            update: false
        });
    };

    openModal = () => {
        this.setState({
            visible: true
        });
    };

    closeModal = () => {
        this.__clearForm();
        this.setState({
            visible: false
        });
    };


    componentDidMount() {

        this.__getMeetingDatas();
        this.__getDepartmentDatasForMeeting();

    }

    __getDepartmentDatasForMeeting = ()=> {
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
    };
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
    __saveDepartment = (e) => {

        let data = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        };
        let url = "http://localhost:8080/meeting/save/";
        let method = "POST";

        if (this.state.update) {
            url = "http://localhost:8080/meeting/update/";
            method = "PUT";
        }
        jajax.ajax({
            url: url,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: method,
            data: JSON.stringify(data),
            dataType: "application/json",
            crossDomain: true
        }).always(function (xhr) {
            if (xhr.status === 200) {
                Toast.success("Meeting saved successfully...");
                this.__getMeetingDatas();
                this.__clearForm()

            }
        }.bind(this));

        this.closeModal();

    };
    __onDelete = (data) => {
        jajax.ajax({
            url: "http://localhost:8080/meeting/delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "DELETE",
            data: JSON.stringify(data),
            dataType: "application/json",
            crossDomain: true
        }).always(function (xhr) {
            if (xhr.status === 200) {
                this.__getMeetingDatas();
            }
        }.bind(this));
    };


}
