import React from "react"
import EventComponent from "./EventComponent"
import history from './history'

class EventContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            eventName: "",
            startDate: "",
            endDate: "",
            address:""
        }
        this.listParticipants = this.listParticipants.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({
            [name]: value
        })
    }

    saveChanges() {
        // state'teki bilgileri database e yollayacak kodu yaz.
    }

    listParticipants() {

    }

    deleteEvent() {

    }


    render() {
        return (
            <div className="center-page">
                <EventComponent
                    handleChange={this.handleChange}
                    listParticipants={this.listParticipants}
                    deleteEvent={this.deleteEvent}
                    data={this.state}
                /> 
             </div>
            )
    }
}
export default EventContainer;