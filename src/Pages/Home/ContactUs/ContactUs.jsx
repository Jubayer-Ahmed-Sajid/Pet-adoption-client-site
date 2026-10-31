import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";

const ContactUs = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_lzgtoes",
        "template_ipthqvd",
        form.current,
        "5UJTYFKudy-2MtPvP"
      )
      .then(
        () => {
          setSending(false);
          toast.success("Message delivered. We will get back to you shortly.");
          if (form.current) form.current.reset();
        },
        () => {
          setSending(false);
          toast.error("Could not send message. Please contact us directly via email.");
        }
      );
  };

  return (
    <section id="contacts" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-card rounded-card border border-rule p-8 sm:p-12 shadow-sm">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink">
            Questions about adoption or donation campaigns?
          </h2>
          <p className="text-sm text-ink-2 mt-2">
            Our volunteer coordinator team is here to answer your adoption screening, foster, or campaign queries.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-stock bg-paper-2 border border-rule">
              <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-accent-3 shrink-0 text-base">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted">Email support</p>
                <p className="text-sm font-medium text-ink mt-0.5">contact@pawsandhearts.org</p>
                <p className="text-xs text-muted">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-stock bg-paper-2 border border-rule">
              <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-mint-deep shrink-0 text-base">
                <FaWhatsapp />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted">Phone helpline</p>
                <p className="text-sm font-medium text-ink mt-0.5">+1 (555) 234-7387</p>
                <p className="text-xs text-muted">Monday to Saturday: 9am to 6pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-stock bg-paper-2 border border-rule">
              <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink shrink-0 text-base">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted">Adoption center</p>
                <p className="text-sm font-medium text-ink mt-0.5">142 Rescue Way, Suite 8</p>
                <p className="text-xs text-muted">Open to scheduled visitors</p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="lg:col-span-7 bg-paper-2 p-6 sm:p-8 rounded-card border border-rule space-y-4"
          >
            <div>
              <label htmlFor="user_name" className="block text-xs font-semibold text-ink-2 mb-1.5">
                Your full name
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-input bg-paper border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="user_email" className="block text-xs font-semibold text-ink-2 mb-1.5">
                Email address
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full px-4 py-3 rounded-input bg-paper border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-ink-2 mb-1.5">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Tell us about the pet or question you have..."
                className="w-full px-4 py-3 rounded-input bg-paper border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors disabled:opacity-60"
            >
              {sending ? "Sending message…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
