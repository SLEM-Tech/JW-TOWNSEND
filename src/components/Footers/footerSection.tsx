import { BiPhone } from "react-icons/bi";
import { FiMail } from "react-icons/fi";

const footerData = {
  contact: {
    title: "Contact Us",
    items: [
      {
        icon: BiPhone,
        label: "WhatsApp",
        detail: "+1 202-918-2132",
      },
      {
        icon: FiMail,
        label: "Call Us",
        detail: "+1 202-918-2132",
      },
    ],
  },
  categories: {
    title: "Most Popular Categories",
    items: [
      "Phones",
      "Phones Accessories",
      "Laptop",
      "Speakers",
      "Electronics",
      "Modems",
      "Monitors",
    ],
  },
  services: {
    title: "Customer Services",
    items: [
      "About Us",
      "Terms & Conditions",
      "FAQ",
      "Privacy Policy",
      "E-waste Policy",
      "Cancellation & Return Policy",
    ],
  },
};

export default function FooterSection() {
  return (
    <footer className="bg-blue-600 text-white overflow-hidden relative">
      <div className="container  mx-auto px-4 py-12 max-w-[1256px] relative z-10">
        <div className="flex  flex-col md:flex-row  justify-between items-start gap-8">
          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {footerData.contact.title}
            </h3>
            <div className="space-y-3 text-sm">
              {footerData.contact.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <div>
                    <p>{item.label}</p>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Popular Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              <div className="underline" />
              {footerData.categories.title}
            </h3>
            <ul className="space-y-2 text-sm disc">
              {footerData.categories.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {footerData.services.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {footerData.services.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-4 text-center text-sm">
          <p>
            © 2022 All rights reserved | JOHN & SONS INNOVATION TECHNOLOGY
            SERVICES COMPANY LIMITED
          </p>
        </div>
      </div>
      {/* Circular background element */}
      <div className="absolute top-0  right-0 w-64 h-64 bg-blue-400 rounded-full opacity-50 z-10 transform translate-x-1/2 -translate-y-0.5"></div>
    </footer>
  );
}
