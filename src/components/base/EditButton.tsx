import {
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const EditButton = ({
  editableState,
}: {
  editableState: [boolean, (val: boolean) => void];
}) => {
  const [editable, setEditable] = editableState;
  return (
    <button
      onClick={() => setEditable(!editable)}
      className="h-min"
    >
      {editable ? (
        <CheckIcon className="h-5 w-5 fill-white" />
      ) : (
        <PencilIcon className="h-5 w-5 fill-white" />
      )}
    </button>
  );
};

export default EditButton;
