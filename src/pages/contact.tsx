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
          {title ?? "Email me"}
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
    <LayoutShared title={"Contact Me"}>
      <div className="flex w-full justify-center px-32">
        <div className="grow">
          <h3 className="text-3xl font-semibold ">
            Contact Info
          </h3>
          <div className="py-4">
            <div className="font-semibold">Phone</div>
            <div>519-703-3780</div>
          </div>
          <div className="py-4">
            <div className="font-semibold">Address</div>
            <div>5146 Perth line 44</div>
            <div>Gadshill, ON N0K 1J0</div>
          </div>
          <div className="py-4">
            <div className="font-semibold">Email</div>
            <div>christopher.stevers1@gmail.com</div>
          </div>
        </div>

        <ContactForm />
      </div>
    </LayoutShared>
  );
};

export default Contact;
