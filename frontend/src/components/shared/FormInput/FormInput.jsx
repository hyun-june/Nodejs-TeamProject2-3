import "./FormInput.css";

const pattern = {
    email: { 
        required: "이메일은 필수입니다",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "유효한 이메일 주소를 입력해주세요"
        }
    },
    password: { 
        required: "비밀번호는 필수입니다",
        minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상이어야 합니다"
        }
    },
};

export const FormInput = ({ name, type='text', title, register, errMsg, ...props}) => {
    
    return <div className="form-input">
        {title && <label htmlFor={name}>{title}</label>}
        <input 
            id={name} 
            type={type}  
            { ...register(name, { pattern: pattern[type] })} 
            {...props}
        />
        {errMsg && <span>{errMsg}</span>}
    </div>
}


