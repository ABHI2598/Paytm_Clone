import axios from 'axios';
import { useEffect, useState } from 'react';


export const Balance = () => {
    const[value,setValue] = useState(0);

    useEffect(()=>{
        async function fetchBalance(){
            const {data} = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            setValue(data.balance);
        }
        fetchBalance();
    },[value]);
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}
