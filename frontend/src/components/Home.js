 import React, { component } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { useState, useRef, useEffect } from 'react';

const Home = (props) => {

    const video = useRef(null);

    const VideoPreview = ({ stream }) => {
        console.log(stream);
        console.log(video.current);

        useEffect(() => {
            if (video.current && stream) {
                video.current.srcObject = stream;
            }
        }, [stream]);

        if (!stream) {
            return null;
        }

        var new_video = <video ref={video} width={400} height={300} autoPlay controls />;
        return new_video;
    };

    useEffect(() => {
        const timer = setTimeout(updateImage, 15000);
        return () => clearTimeout(timer);
    }, []);

    const updateImage = (event) => {
        console.log(video.current)

        var canvas = document.createElement("canvas");
        console.log(canvas);
        canvas.width = 100;
        canvas.height = 100;
        var context = canvas.getContext('2d');
        context.drawImage(video.current, 0, 0, 100, 100);
        var image_base64 = canvas.toDataURL('image/png');
        let i = 0;
        console.log(image_base64);
        console.log('Good\n');


        // // Make an API call to the backend with image_base64
        fetch('http://localhost:5000/api/frame', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },

            body: JSON.stringify({
                 image: image_base64,
                 user_id: props.userid,
             })
         }).then((response) => response.json())
            .then((response_json) => {
                console.log(response_json);
             }).catch((error) => {
             console.error(error);
         });
    }

    return (
        <div>
            <ReactMediaRecorder
                video
                render={({ previewStream }) => (
                    <div>
                        <VideoPreview stream={previewStream} />
                    </div>
                )}
            />
        </div>
    );
};

export default Home;
