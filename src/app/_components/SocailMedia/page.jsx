import Link from 'next/link';
import React from 'react';

export default function SocialMedia() {
  const socialIcons = [
    { icon: 'fa-twitter', link: 'https://instagram.com' },
    { icon: 'fa-facebook-f', link: 'https://facebook.com' },
    { icon: 'fa-instagram', link: 'https://wa.me/201234567890' },
    { icon: 'fa-github', link: 'https://linkedin.com' },
  ];

  return (
    <div className="flex gap-x-10">
      {socialIcons.map((social, index) => (
        <Link
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-30 h-30 flex items-center justify-center rounded-full bg-white text-black border border-opacity-20 border-black hover:bg-black hover:text-white hover:duration-300"
        >
          <i className={`fab ${social.icon} text-14`} />
        </Link>
      ))}
    </div>
  );
}
