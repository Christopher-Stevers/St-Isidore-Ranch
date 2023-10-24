import { useState } from "react";
import StyledInput from "~/components/base/StyledInput";

import LayoutShared from "~/components/shared/LayoutShared";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";

export const ContactForm = ({
  title,
  toggleOpen,
}: {
  title?: string;
  toggleOpen?: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutate: emailMe } =
    api.email.emailMe.useMutation();
  const handleSend = () => {
    setName("");
    setEmail("");
    setMessage("");
    emailMe({
      name,
      email,
      message,
    });
  };
  const handleClick = () => {
    if (toggleOpen) {
      toggleOpen();
    }
  };
  return (
    <div onClick={handleClick} className="grow">
      {!toggleOpen && (
        <h3 className="text-3xl font-semibold ">
          {title ?? "Contact me"}
        </h3>
      )}
      <div className="grid grid-cols-2 gap-8 py-4">
        <StyledInput
          value={name}
          setValue={setName}
          title="Name"
          field="name"
        />

        <StyledInput
          value={email}
          setValue={setEmail}
          title="Email"
          field="email"
        />
        <div className="col-span-2">
          <div className="text-input pb-1 text-sm text-form">
            Message
          </div>
          <textarea
            value={message}
            className=" block h-60 w-full rounded-md border  p-3 text-sm text-form outline-none focus-visible:ring-transparent"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          onClick={handleSend}
          className="flex w-40 content-center items-center justify-between gap-2 rounded-lg bg-primary-700 p-4 py-2 text-lg text-white"
        >
          Send <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <LayoutShared title={"Contact"}>
      <div className="flex w-full flex-wrap justify-center px-4 lg:px-32">
        <ContactForm />
      </div>
    </LayoutShared>
  );
};

export default Contact;
