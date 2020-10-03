import React, { Component } from 'react';
import PaginationTable from "./components/table/PaginationTable";
import Button from "@material-ui/core/Button";
import PlusIcon from '@material-ui/icons/Add';
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ReactDialog from "./components/common/ReactDialog";
import TableDialog from "./components/common/TableDialog";
import ChartDialog from "./components/common/ChartDialog";
import ShowChart from '@material-ui/icons/ShowChart';
import moment from 'moment';

class AdminPage extends Component {

    state = {
        rows: [],
        curPeople: [],
        chartInfo: [],
        curActivityNumber: "",
        addActivityModalOpen: false,
        updateActivityModalOpen: false,
        displayPeopleModalOpen: false,
        displayChartModalOpen: false,
        snackbarProperties: {
            isOpen: false,
            message: "",
            severity: ""
        }
    }

    componentDidMount() {
        axios.get("/activities")
            .then(response => {
                this.setState({ rows: response.data })
            })
    }

    onDisplayChart = () => {
        let newChartInfo = [];
        let myRows = this.state.rows;
        for (let i = 0; i < myRows.length; i++) {
            axios.get("/activities/" + myRows[i].activityNumber + "/personno")
                .then(response => {
                    newChartInfo[i] = { title: myRows[i].title, peopleSize: response.data }
                    if (i === myRows.length - 1) {
                        this.setState({
                            chartInfo: newChartInfo
                        }, () => {
                            this.toggleDisplayChartModal();
                        });
                    }
                })
        }
    }


    render() {

        return (
            <div className="App">
                <h2> WELCOME TO ADMIN PAGE </h2>
                <Button variant="contained"
                    color="primary"
                    style={{ float: "right" }}
                    onClick={this.onDisplayChart}
                    startIcon={<ShowChart />}>
                    Display chart
        </Button>
                <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                        {this.state.snackbarProperties.message}
                    </Alert>
                </Snackbar>
                <ReactDialog fields={this.addActivityDialogFields} title="Add Activity" isOpen={this.state.addActivityModalOpen} onClose={this.toggleAddActivityModal}
                    onSubmit={this.submitActivityAdd} />
                <ReactDialog fields={this.updateActivityDialogFields} title="Update Activity" isOpen={this.state.updateActivityModalOpen} onClose={this.toggleUpdateActivityModal}
                    onSubmit={this.submitActivityUpdate} />
                <TableDialog title="Participants" isOpen={this.state.displayPeopleModalOpen} onClose={this.toggleDisplayPeopleModal} rows={this.state.curPeople} />




                <ChartDialog title="Participant Number Chart" isOpen={this.state.displayChartModalOpen} onClose={this.toggleDisplayChartModal} rows={this.state.chartInfo} />




                <PaginationTable rows={this.state.rows} onUpdate={this.onActivityUpdate} onDelete={this.onActivityDelete} onDisplay={this.onDisplayPeople} />
                <Button variant="contained"
                    color="primary"
                    style={{ float: "right" }}
                    onClick={this.toggleAddActivityModal}
                    startIcon={<PlusIcon />}>
                    Add activity
                </Button>
            </div>

        );
    }
}

export default AdminPage;