const EditableDiv = ({
  divState,
  className,
  editable,
}: {
  divState: [string, (val: string) => void];
  editable: boolean;
  className: string;
}) => {
  const [value, setValue] = divState;
  if (editable)
    return (
      <input
        className={className}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  return <div className={className}></div>;
};

export default EditableDiv;
