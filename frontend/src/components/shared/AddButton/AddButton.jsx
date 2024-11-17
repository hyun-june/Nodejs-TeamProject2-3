import { MdAdd } from "react-icons/md";
import "./AddButton.css";

export const AddButton = ({ className='', ...props}) => {
    return <button className={`add-button ${className}`} {...props} >
        <MdAdd size={30}/>
    </button>
}