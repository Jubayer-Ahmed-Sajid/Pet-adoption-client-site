import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Title from "../../../Components/Title/Title";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lzgtoes",
        "template_ipthqvd",
        form.current,
        "5UJTYFKudy-2MtPvP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="mb-20">
      <Title title={"Contact us"} />
      <div id="contacts" className=" mt-12">
        <div className="bg-white shadow-lg mx-4 py-8 rounded-xl lg:flex items-center justify-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex gap-2">
              <FaWhatsapp className="text-2xl text-blue-500" />
              +880122343
              </div>
              <div className="flex gap-2">
              <IoMailOpenOutline className="text-2xl text-blue-500"/>
              sajid661aca@gmail.com
              </div>
              <div className="flex gap-2">
              <CiLocationOn className="text-2xl text-blue-500"/>
              2 Dhaka,1236
              </div>
            </div>
          <form className="space-y-4 lg:w-1/2 lg:mx-4" ref={form} onSubmit={sendEmail}>
            <div>
              <label>Name</label>
              <br />
              <Input
                size="lg"
                type="text"
                required
                name="user_name"
                placeholder="Type your Name "
                className="text-black bg-white/70 input mb-2 input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Email</label>
              <br />
              <Input
                size="lg"
                type="email"
                required
                name="user_email"
                placeholder="Enter your Email"
                className="input mb-2 text-black bg-white/70 input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Message</label>
              <Textarea
                size="lg"
                name="message"
                required
                placeholder="Enter your Message"
                className="textarea mb-2 text-black bg-white/70 border-accent  w-full"
              />
              <br />
            </div>
            <Button
              className="btn bg-secondary px-4 py-3 rounded-lg w-full"
              value="send"
              type="submit"
            >
              {" "}
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
