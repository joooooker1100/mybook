import { useEffect, useState } from "react";
import App from "./App";
export default function Close() {
    const[close,setClose]=useState<any>();
    useEffect(()=>{
         setInterval(App,1000)
    },[]);
    return(
        <div>
            {}

        </div>

    )
}