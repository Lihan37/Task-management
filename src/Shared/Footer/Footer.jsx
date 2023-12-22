import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer flex flex-col p-10 bg-neutral text-neutral-content">
      <div className='flex w-full justify-between px-14'>
        <aside>
          <p>Task Management<br />Efficiently manage your tasks with our platform</p>
        </aside>
        <nav>
          <header className="footer-title">Connect with Us</header>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.linkedin.com/in/eanurlihan/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/Lihan37" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.facebook.com/eanur.rahman.9" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
          </div>
        </nav>
      </div>
      <div className='flex w-full justify-center items-center text-center'>
        <aside className='text-center'>
          <p className='text-center'>Copyright © 2023 - All rights reserved by Task Manager Ltd</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
