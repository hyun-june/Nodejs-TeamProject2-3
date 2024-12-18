import "./Button.css";

const buttonOption = {
  round: {
    sm: "8px",
    full: "999px",
  },
  thema: {
    none: "",
    warn: "var(--warn-color)",
    point: "var(--point-color)",
  },
};

export const Button = ({
  children,
  thema,
  round,
  className,
  style = {},
  ...props
}) => {
  return (
    <button
      className={`button ${className}`}
      style={{
        borderRadius: buttonOption.round[round],
        backgroundColor: buttonOption.thema[thema],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
