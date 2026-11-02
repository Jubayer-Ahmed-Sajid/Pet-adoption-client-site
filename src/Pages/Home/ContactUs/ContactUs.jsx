import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";
import MotionReveal from "../../../Components/MotionReveal";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error("Please provide both your email and message.");
      return;
    }

    setSending(true);
    try {
      const res = await axiosPublic.post("/contact-messages", formData);
      if (res.data?.success || res.data?.insertedId) {
        toast.success("Message delivered! Our coordinator will respond within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Could not send message. Please reach us at support@pawsandhearts.org");
      }
    } catch (err) {
      toast.error("Could not send message: " + (err.response?.data?.error || err.message));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacts" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <MotionReveal direction="up" distance={24}>
        <div className="bg-card rounded-card border border-rule p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-wider font-semibold text-accent-deep">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink mt-1">
              Questions about adoption or donation campaigns?
            </h2>
            <p className="text-sm text-ink-2 mt-2">
              Our volunteer coordinators and veterinary liaisons are here to assist with application screening, foster inquiries, or campaign sponsorships.
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
                  <p className="text-sm font-medium text-ink mt-0.5">support@pawsandhearts.org</p>
                  <p className="text-xs text-muted">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-stock bg-paper-2 border border-rule">
                <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-mint-deep shrink-0 text-base">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted">Sanctuary line</p>
                  <p className="text-sm font-medium text-ink mt-0.5">+1 (415) 890-7297</p>
                  <p className="text-xs text-muted">Monday to Saturday: 9am to 6pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-stock bg-paper-2 border border-rule">
                <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink shrink-0 text-base">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted">Adoption center</p>
                  <p className="text-sm font-medium text-ink mt-0.5">142 Rescue Way, Suite 8, San Francisco, CA 94103</p>
                  <p className="text-xs text-muted">Open daily for scheduled meet-and-greets</p>
                </div>
              </div>
            </div>

            {/* Direct Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-ink-2 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-ink-2 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-ink-2 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Adoption inquiry, medical sponsorship, or shelter partnership"
                    className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-ink-2 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the companion you'd like to meet or the question you have…"
                    className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="px-8 py-3 rounded-pill bg-accent hover:bg-accent-deep text-accent-ink font-semibold text-xs transition-colors hover-lift press-down shadow-xs disabled:opacity-50"
                >
                  {sending ? "Delivering Message…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
};

export default ContactUs;
