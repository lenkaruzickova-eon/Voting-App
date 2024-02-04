const TextInput = ({
  label,
  name,
  id,
  placeholder,
  type,
  onChange,
  value,
  testid,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        data-testid={testid}
      />
    </>
  );
};
export default TextInput;
