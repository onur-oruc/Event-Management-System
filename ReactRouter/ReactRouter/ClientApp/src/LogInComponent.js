import React from "react"
//import { Button } from 'react-bootstrap'
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

function LogInComponent(probs) {

    return (
        <div className="center-page">
            <div className="lander" >
                <form
                    style={{ backgroundColor: "#F2E5F3" }}
                    id="form_login">
                    <br />
                    <br />
                    <input
                        className="text-size"
                        type="text"
                        name="username"
                        value={probs.data.username}
                        placeholder="username"
                        onChange={probs.handleChange}
                    >
                    </input>
                    <br />
                    <input
                        className="text-size"
                        type="password"
                        name="password"
                        value={probs.data.password}
                        placeholder="password"
                        onChange={probs.handleChange}
                    >
                    </input>
                    <br />
                    <br />
                    <div className="center-page">
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size = "small"
                                style={{ float: "right" }}
                                onClick={probs.handleChangeClick}

                            > Log In
                                </Button>
                            </div>
                        </div>
                    <br />

                </form>
            </div>
        </div>
    )
}
export default LogInComponent;

// history.pushState({ id: 'admin-events' }, 'Events', 'https://localhost:44396/admin-events')