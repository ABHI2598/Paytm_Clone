import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import { useSearchParams } from "react-router-dom";


const Dashboard = ()=>{
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");

    return(
        <>
          <Appbar name={name} />
          <Balance />
          <Users/>

        </>
    )
}

export default Dashboard;