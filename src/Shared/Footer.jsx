import { Typography } from "@material-tailwind/react";
import logo from "../assets/others/Gemini_Generated_Image (3).jpg";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-black  w-full mt-24">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between  gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6">
            <img
              src={logo}
              className="h-40 flex my-8 rounded-full w-40"
              alt=""
            />
          </Typography>
          <div className="grid text-white grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul className="mt-8" key={title}>
                <Typography
                  variant="small"
                  color="white"
                  className="mb-3 text-white font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="white"
                      className="py-1.5 font-normal text-white transition-colors hover:text-gray-400"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
