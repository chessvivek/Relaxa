import React, {Component} from 'react';
import { ReactMediaRecorder } from 'react-media-recorder'
import { useState, useRef, useEffect } from 'react';
import Login from './Login';
import PreviewImg from "./camera.png";
import '../index.css';
import Home from "./Home";
import {register} from "../constants/constants";
import {Link} from 'react-router-dom';
import axios from 'axios';

import LineGraph from './LineGraph';

const Graph = (props) => {
    const [stressLevel, setStressLevel] = useState([]);
    // const [id, setId] = useState("");
    const { id } = props.location.state;

    console.log(id);

    // useEffect(() => {
    //     const timer = setTimeout(fetchStressData, 100000);
    // }, []);

    const fetchStressData = async () => {

        var session = null;

        // Make an API call to the backend with image_base64
        var url = "http://localhost:5000/api/user/stress_level";
        console.log(url);

        var response;
        var data = {"user_id": id};
        await axios.post(url, data)
        .then(function(res) {
            response = res;
            console.log(response);
            var data = [];
            var stress_level = response.data.stress_level;
            for (var i = 0; i < stress_level.length; i++) {
                data.push({'x': i * 15, 'y': stress_level[i] * 100});
            }
            setStressLevel(data);

        });
        // fetch(url)
        // .then((response) => response.json())
        // .then((response_json) => {
        //     console.log(response_json);
        //     session = response_json;
        // }).then(() => {
        //     console.log(session);
    }

    return (
        <div className="container-5">
            <br />
            <br />
            <h4 className="txt">
                Here is your stress level analysis.
            </h4>
            <br />
            <br />
            <div>
                <LineGraph data={stressLevel} />
            </div>
            <br />
            <br />
            <div className="align-around-camera-2">
                <div style={{ flexDirection: 'row' }}>
                    <button className= "btn-primary" onClick={fetchStressData}>Click to refresh</button>
                </div>
            </div>
        </div>
    )
}

export default Graph;