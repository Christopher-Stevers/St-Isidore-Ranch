type ToggleItemType = {
  name: string;
};

const TogglePlusMinus = ({
  items,
  wrapperClass = "",
  btnClass = "",
  toggleState,
}: {
  items: ToggleItemType[];
  wrapperClass?: string;
  btnClass?: string;
  toggleState: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ];
}) => {
  const [toggle, setToggle] = toggleState;
  return (
    <div className={`flex gap-2 ${wrapperClass}`}>
      {items.map((item) => (
        <button
          onClick={() => setToggle(item.name)}
          className={`${
            toggle === item.name
              ? "bg-white text-black"
              : ""
          } ${btnClass}`}
          key={item.name}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default TogglePlusMinus;
