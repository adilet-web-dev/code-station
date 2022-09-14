import "./styles/TimeManagement.css";
import { Button } from "@nextui-org/react";

import { useState, useEffect, useRef } from "react";


export default function () {
    const min = 10;

    const [delay, setDelay] = useState(min);
    const [angle, setAngle] = useState(360);
    const [start, setStart] = useState(false);

    const minutes = Math.floor(delay / 60);
    const seconds = Math.floor(delay % 60);



    useEffect(() => {
        let timer = null;
        if (start) {
            timer = setInterval(() => {
            let computedAngle = ((minutes * 60 + seconds) / min) * 360;
            setAngle(computedAngle - 360 / min);
            setDelay(delay - 1);

            }, 1000);            
        }
    
        if (delay === 0 || !start) {
          clearInterval(timer);
        }
    
        return () => {
          clearInterval(timer);
        };
    });


    return (
        <div className="flex flex-col flex-grow items-center">
            <h3>Time Management</h3>


            <div className="flex flex-col items-center">
                <div className="timer-wrapper" style={{
                        background: `conic-gradient(rgb(2, 2, 2) ${angle}deg, rgb(255, 255, 255) 0deg)`}}>
                    <div className="timer">
                        <h1>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
                    </div>

                    
                </div>

                {start ? 
                    <Button bordered className="mt-6 max-w-[100px]" onClick={() => setStart(false)}>Stop</Button>
                    :
                    <Button className="mt-6 max-w-[100px]" onClick={() => setStart(true)}>Start</Button>
                }
                
            </div>

        </div>
    )
}
