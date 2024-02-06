const EditableDiv = ({
  divState,
  className,
  editable,
}: {
  divState: [string, () => void];
  editable: boolean;
  className: string;
}) => {
  const [value, setValue] = divState;
  if (editable)
    return (
      <input
        className={`${className} text-black`}
        value={value}
        onChange={() => setValue()}
      />
    );
  return <div className={className}>{value}</div>;
};

export default EditableDiv;
