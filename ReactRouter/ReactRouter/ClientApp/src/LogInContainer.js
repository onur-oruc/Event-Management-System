import React from "react"
import LogInComponent from "./LogInComponent"
import history from './history'

class LogInContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeClick = this.handleChangeClick.bind(this)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({
            [name]: value
        })
    }

    handleChangeClick() {
        history.push('/admin-events');
    }

    render() {
        return (
            <div className="center-page">
                <LogInComponent
                    handleChange={this.handleChange}
                    handleChangeClick={this.handleChangeClick}
                    data={this.state}
                />

            </div>
        )
    }
}
export default LogInContainer;