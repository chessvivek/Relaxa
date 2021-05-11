import React, {Component} from 'react';
import { ReactMediaRecorder } from 'react-media-recorder'
import { useState, useRef, useEffect } from 'react';
import Login from './Login';
import PreviewImg from "./camera.png";
import '../index.css';
import Home from "./Home";
import {register} from "../constants/constants";
import {Link} from 'react-router-dom';

export default class page2 extends Component {
    constructor (props) {
        super (props);
    
        this.state = {
            id: '',
            name: '',
        };
    }
    
    render() {

        const { id, name } = this.props.location.state;

        // const { state } = this.props.location;
        console.log(id, name);

        return(
                <div className="container-5">
                    <br />
                    <br />
                    <h4 className="txt">
                        You are being recorded, {name}
                    </h4>
                    <br />
                    <br />
                    <div>
                        {(<Home userid={id} />)}
                    </div>
                    <br />
                    <br />
                    <div className="align-around-camera-2">
                        <div style={{ flexDirection: 'row' }}>
                            <Link to={{pathname: '/analysis', state: { "id": id }}}>
                                <button className= "btn-primary"> 
                                    Click here to see your analysis
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* <div className= "wrapper-1">
            <button className= "btn-primary">  </button>
        </div> */}
                </div>
            )

    }

}

