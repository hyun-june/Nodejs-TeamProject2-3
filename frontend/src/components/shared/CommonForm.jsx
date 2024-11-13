const CommonForm = ({ className, title, children, ...props }) => {
  return (
    <div className="common-form">
      <label className="common-form-title">{title}</label>
      <input {...props} className={`common-input ${className}`} />
      {children}
    </div>
  );
};
export default CommonForm;
