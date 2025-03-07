import { BottomWarning } from "./ButtonWarning"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { SubHeading } from "./SubHeading"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Sigin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = async()=>{
        const {data} = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username,password
        });
        localStorage.setItem('token', data.token);
        navigate('/dashboard?name='+username);
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={e=> setUsername(e.target.value)} />
        <InputBox placeholder="123456" label={"Password"} onChange={e=> setPassword(e.target.value)} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={signIn} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Sigin;