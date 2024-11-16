import "./Textarea.css";

export const Textarea = ({ id, title, ...props }) => {
    return <div className="form-input">
        { title && <label htmlFor={id}>{title}</label> }
        <textarea id={id} {...props}></textarea>
    </div>
}