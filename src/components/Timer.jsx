import { useEffect, useState } from "react";

const Timer = ({hasStarted, stopTimer, startTimer, time, setTime}) => {

    const handleReset = () =>{
        setTime(slectedTime)
        stopTimer()
    }
    
    const handleStart = () => {
        if(time > 0 && !hasStarted){
            startTimer()
        }else{
            stopTimer()
        }
    }

    const updateTime = (newTime) =>{
        setTime(newTime)
    }
    
    const formatTime = (seconds) => {
        const hour = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
    }

    useEffect(() =>{
        let countDownInterval

        if(hasStarted && time > 0){
          countDownInterval = setInterval(() =>{
            updateTime((current) =>{
              if(current <= 1){
                clearInterval(countDownInterval)
                stopTimer()
                return 0
              }
              return current - 1
            })
          }, 1000)
        }
    
        return () => clearInterval(countDownInterval)
    }, [hasStarted, time])

    return ( 
        <>
            <div className="h-60 w-60 mx-auto flex flex-col justify-center items-center gap-4 border border-gray-800 shadow-sm bg-gray-800 rounded-full my-10 text-gray-500">
                <div className="text-4xl">
                    <p>{formatTime(time)}</p>
                </div>
                <div className="flex justify-evenly gap-2">
                    <button 
                        onClick={handleStart}
                    >
                        {hasStarted ? 'Stop' : 'Start'}
                    </button>
                    <button 
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>

     );
}
 
export default Timer;