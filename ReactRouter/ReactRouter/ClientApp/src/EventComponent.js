import React from "react"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function EventComponent(probs) {
    const curDate = new Date();
    let year = curDate.getFullYear();
    let month = curDate.getMonth() + 1;
    let day = curDate.getDate();

    return (
        <div /*className="center-page"*/>
            <div className="lander-admin-events">

                <form
                    className="event-display"
                    id="form_login">
                    <br />
                    <br />
                    <input
                        className="text-size"
                        type="text"
                        name="eventName"
                        value={probs.data.eventName}
                        placeholder="event name"
                        onChange={probs.handleChange}
                    >
                    </input>
                    <br />

                    <textarea
                        className="text-size"
                        type="text"
                        name="address"
                        value={probs.data.address}
                        placeholder="address"
                        onChange={probs.handleChange}
                    >
                    </textarea>
                    <br />
                    <br />

                    <label> Start date: </label>
                    <br/>
                    <input
                        className="date"
                        type="date"
                        name="startDate"
                        value={probs.data.startDate}
                        placeholder="Start Date:"
                        onChange={probs.handleChange}
                        min={year + '-' + month + '-' + day} /* Çalışmıyor*/
                    >
                    </input>
                    <br />
                    <br />

                    <label> End date: </label>
                    <br />
                    <input
                        className="date"
                        type="date"
                        name="endDate"
                        value={probs.data.endDate}
                        placeholder="End Date:"
                        onChange={probs.handleChange}
                    >
                    </input>
                    <br />          
                    <br />

                    <Button
                        variant="btn btn-succcess"
                        className="button-event-components"
                        onClick={probs.saveChanges}

                    > Save Changes
                        </Button>
                    <br />

                    <Button
                        variant="btn btn-succcess"
                        className="button-event-components"
                        onClick={probs.listParticipants}

                    > List Participants
                        </Button>
                    <br />

                    <Button
                        variant="btn btn-succcess"
                        className="button-delete-event"
                        onClick={probs.deleteEvent}

                    > Delete Event
                        </Button>
                    <br />


                </form>
                <br />
            </div>
           
        </div>
    )
}
export default EventComponent;

// history.pushState({ id: 'admin-events' }, 'Events', 'https://localhost:44396/admin-events')