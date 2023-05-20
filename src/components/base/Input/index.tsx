const Input = ({
  onChange,
  placeholder,
}: {
  onChange: (e: string) => void;
  placeholder: string;
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };
  return <input placeholder={placeholder} onChange={handleChange} />;
};
export default Input;
