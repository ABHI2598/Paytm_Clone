import { Link } from "react-router-dom"
import {string} from 'prop-types';

export function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}

BottomWarning.propTypes={
    label:string,
    buttonText:string,
    to:string
};