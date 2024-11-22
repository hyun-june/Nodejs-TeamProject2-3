import "./Textarea.css";

export const Textarea = ({ name, title, register, errMsg, ...props }) => {
    return <div className="form-input">
        { title && <label htmlFor={name}>{title}</label> }
        <textarea id={name} {...register(name)} {...props}></textarea>
    </div>
}