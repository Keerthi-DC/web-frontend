import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/footer.json")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  const { logo, address, sections, bottomLinks, copyright } = data;

  return (
    <footer
      className="text-white relative"
      style={{
  
        backgroundImage: 'url(/images/footer-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <div className="bg-black bg-opacity-50" style={{ backdropFilter: 'blur(4px)' }}>
        <div className="max-w-7xl mx-auto py-12 px-6 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left side – logo & address */}
          <div className="md:col-span-1 flex flex-col space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Website Logo" className="h-12" />
            </Link>
            <p className="text-sm">{address}</p>
          </div>

          {/* Right side – sections */}
          {sections.map((sec, idx) => (
            <div key={idx} className="grid gap-2">
              <h4 className="text-lg font-semibold mb-2">{sec.title}</h4>
              <ul className="space-y-1">
                {sec.links.map((link, li) => (
                  <li key={li}>
                    <Link
                      to={link.url}
                      className="text-sm hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t bg-blue-950 py-4 text-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between px-6 md:px-8">
            <p>{copyright}</p>
            <div className="flex space-x-4">
              {bottomLinks.map((bl, i) => (
                <Link
                  key={i}
                  to={bl.url}
                  className="hover:underline"
                >
                  {bl.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
