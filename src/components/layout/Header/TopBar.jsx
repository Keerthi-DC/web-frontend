import React from 'react';

const TopBar = () => {
  const links = [
    { label: 'Students', href: '/students' },
    { label: 'Staff', href: '/staff' },
    { label: 'Parents', href: '/parents' },
    { label: 'Visitors', href: '/visitors' },
    { label: 'Alumni', href: '/alumni' },
    { label: 'Career', href: '/career' },
  ];

  return (
    <div className="bg-[#001a4d] text-white text-sm flex items-center justify-end py-1 px-6">
      <div className="flex space-x-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-yellow-300 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
