import React from 'react';


export default class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state= {
            name: "",
            surname: "",
            email: "",
            nationalID: "" 
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form action="">
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    name="name"
                    onChange={ this.handleChange}
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={this.state.surname}
                    name="surname"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="E-Mail"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="National ID Number"
                    value={this.state.nationalID}
                    name="nationalID"
                    onChange={this.handleChange}
                />
            </form>
            )
    }
}


/*
class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}
export default class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        return (
            <div className='app'>
                <h1>hihi</h1>
                <button onClick={this.togglePopup.bind(this)}>show popup</button>
                <button onClick={() => { alert('woooooooot?'); }}>try me when popup is open</button>
                <p>Ganz viel inhalt.<br />Ganz viel inhalt.</p>
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
};*/


/*export default function RegistrationForm() {

    return (
        <div className="bg-modal">
            <div className="modal-content">
                <div className="close">+</div>
                <form action="">
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="Surname"/>
                    <input type="text" placeholder="E-Mail" />
                    <input type="text" placeholder="National ID Number" />
                    <button> Submit     </button>
                </form>
            </div>
        </div>
    )
}*/
