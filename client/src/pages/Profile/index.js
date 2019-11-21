import React from "react";
import axios from "axios";
import UserProfile from "../UserProfile";

import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";

import avatar from "../../assets/imgs/faces/face-3.jpg";
import blue from "../../assets/imgs/blue.jpg";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import Modal from "../../components/Modal";
// import { Modal } from "@material-ui/core";

class Profile extends React.Component {

    constructor() {
        super()
        this.state = {
            loggedIn: false,
            id: null,
            firstname: '',
            lastname: '',
            dob: '',
            location: '',
            hobbies: '',
        }

        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount() {
        this.getUser()
    }

    updateUser(userObject) {
        this.setState(userObject)
    }

    getUser() {
        axios.get('/api/sessions', {
            withCredentials: true
        }).then(response => {
            // console.log('Get user response: ')
            // console.log(response.data);
            if (response.data.user) {
                this.setState({
                    loggedIn: true,
                    id: response.data.user._id
                });
                this.getUserProfile();
            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    id: null
                })
            }
        })
    };

    getUserProfile = () => {
        axios.get(`/api/profile/${this.state.id}`, {
            withCredentials: true
        }).then(response => {
            console.log(response.data);
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                dob: response.data.dob,
                location: response.data.location,
                hobbies: response.data.hobbies
            })
        }).catch(err => {
            console.log(err);
        });
    };


    render() {

        if (!this.state.loggedIn) {
            return (
                <div className="container">
                    <div className="alert alert-danger">
                        You must be logged in to view this page
              </div>
                </div>
            );
        } else {

            return (
                <React.Fragment>
                    <div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={1}></GridItem>
                            <GridItem xs={12} sm={12} md={10}>
                                <Card profile>
                                    <img
                                        // className={classes.cardImgTop}
                                        data-src="holder.js/100px180/"
                                        alt="100%x180"
                                        style={{ height: "180px", width: "100%", display: "block" }}
                                        src={blue}
                                        data-holder-rendered="true"
                                    />
                                    <CardAvatar profile>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img src={avatar} alt="..." />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        {/* <h6 className={classes.cardCategory}>OVO</h6> */}
                                        <h4>{this.state.firstname} {this.state.lastname}</h4>
                                        <p style={{}}>
                                            <strong>Dob:</strong> {this.state.dob}
                                            <strong> Lives in: </strong> {this.state.location}
                                        </p>
                                        <p><strong> Hobbies/Interest:</strong> {this.state.hobbies} </p>

                                        <Button color="success" round onClick={this.updateProfile}>
                                            Follow
                                </Button>
                                        <Modal />
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1}></GridItem>
                        </GridContainer>
                    </div>

                    <div>
                        <UserProfile />
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Profile;