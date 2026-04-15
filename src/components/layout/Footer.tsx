import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="grid-bg bg-zinc-700/30 text-white">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <Link href="#" className="flex items-center gap-2">
                <Image
                  className="w-30 h-30"
                  src="/crevoicon.png"
                  alt="Brand Logo"
                  height={100}
                  width={100}
                  loading="lazy"
                />
                <div>
                  <h1 className=" text-3xl font-heading uppercase">Crevosys</h1>
                  <p>A digital IT solution</p>
                </div>
              </Link>

              <div className="flex mt-6 -mx-2">
                <a
                href="https://www.linkedin.com/company/crevosys-official/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 text-white transition-colors duration-300 hover:text-blue-500 flex items-center justify-center w-5 h-5"
                aria-label="LinkedIn">
                <svg
                  className="fill-current w-full h-full"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.94 8.5H3.56V19h3.38V8.5ZM5.25 7.06c1.08 0 1.75-.72 1.75-1.62-.02-.92-.67-1.62-1.73-1.62S3.5 4.52 3.5 5.44c0 .9.69 1.62 1.73 1.62h.02ZM20.5 13.08c0-3.37-1.8-4.94-4.2-4.94-1.94 0-2.8 1.07-3.28 1.82V8.5H9.64c.04.96 0 10.5 0 10.5h3.38v-5.86c0-.31.02-.63.11-.85.25-.62.82-1.26 1.78-1.26 1.26 0 1.76.95 1.76 2.35V19h3.38v-5.92Z"/>
                </svg>
              </a>
                <a
                  href="https://www.facebook.com/CrevoSys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-white transition-colors duration-300 hover:text-blue-500"
                  aria-label="Facebook">
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/crevosys-official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-white transition-colors duration-300 hover:text-blue-500"
                  aria-label="Github">
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-10 lg:flex-1 text-white">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-white uppercase">About</h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:underline">
                  Company
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:underline">
                  Mission & Vision
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:underline">
                  Team
                </a>
              </div>
              <div className=" hidden md:inline">
                <h3 className="text-white uppercase">Blog</h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:underline">
                  Tech
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:underline">
                  AI
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-white hover:underline">
                  Design
                </a>
              </div>
              <div className="hidden md:inline">
                <h3 className="text-white uppercase">Services</h3>
                <Link
                  href="/services/development"
                  className="block mt-2 text-sm text-white hover:underline">
                  Development
                </Link>
                <Link
                  href="/services/marketing"
                  className="block mt-2 text-sm text-white hover:underline">
                  Marketing
                </Link>
                <Link
                  href="/services/design"
                  className="block mt-2 text-sm text-white hover:underline">
                  Design
                </Link>
                <Link
                  href="/services/automation"
                  className="block mt-2 text-sm text-white hover:underline">
                  Automation
                </Link>
              </div>
              <div>
                <h3 className="text-white uppercase">Contact</h3>
                <span className="block mt-2 text-sm text-white hover:underline">
                  +88 01855245281
                </span>
                <span className="block mt-2 text-sm text-white hover:underline">
                  crevosysofficial@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px my-6 bg-gray-200/10 border-none" />
        <div>
          <p className="text-center text-gray-400">
            © Crevosys 2025-2026 - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
