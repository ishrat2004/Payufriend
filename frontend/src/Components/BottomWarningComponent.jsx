import { Link } from "react-router-dom";

export function BottomWarningComponent({ label,buttonText,to }) {
    return <div className="flex justify-center sm py-3 text-xl font-medium">
            <div> 
                {label}
            </div> 
            <Link to={to} className="cursor-pointer underline pl-2"> 
            {buttonText}
            </Link>
        </div>
   
}