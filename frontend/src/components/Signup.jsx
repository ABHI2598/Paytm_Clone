import { BottomWarning } from "./ButtonWarning"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { SubHeading } from "./SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [username, SetUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const navigate = useNavigate();
    
    const signUp = async ()=>{
        
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username,password,firstName,lastName
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard?name="+ username);


    }

    return(
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChange={e=> setFirstName(e.target.value)}/>
        <InputBox placeholder="Doe" label={"Last Name"} onChange={e=> setLastName(e.target.value)} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={e=> SetUsername(e.target.value)} />
        <InputBox placeholder="123456" label={"Password"} onChange={e=> setPassword(e.target.value)} />
        <div className="pt-4">
          <Button label={"Sign up"} onClick={signUp}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/sigin"} />
      </div>
    </div>
  </div>
    )
}

export default Signup;