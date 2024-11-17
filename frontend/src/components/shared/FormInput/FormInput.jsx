import "./FormInput.css";

export const FormInput = ({ id, title, ...props}) => {
    return <div className="form-input">
        <label htmlFor={id}>{title}</label>
        <input id={id} {...props}/>
    </div>
}