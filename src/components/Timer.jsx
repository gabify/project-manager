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
            <div className="max-w-xs sm:mx-auto mx-10 p-5 flex flex-col items-center gap-4 border border-gray-200 shadow-sm bg-gray-50 rounded-xl my-10 text-gray-800">
                <div className="text-4xl">
                    <p>{formatTime(time)}</p>
                </div>
                <div className="flex justify-evenly gap-2">
                    <button 
                        onClick={handleStart}
                        className="bg-amber-300 px-4 py-2 rounded-xl font-medium hover:bg-amber-400 cursor-pointer transition delay-100 ease-in-out"
                    >
                        {hasStarted ? 'Stop' : 'Start'}
                    </button>
                    <button 
                        onClick={handleReset}
                        className="bg-amber-300 px-4 py-2 rounded-xl font-medium hover:bg-amber-400 cursor-pointer transition delay-100 ease-in-out"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>

     );
}
 
export default Timer;