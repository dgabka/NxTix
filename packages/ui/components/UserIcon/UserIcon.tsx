import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import userIcon from '../../public/static/user.svg';

const UserIcon = () => {
  return (
    <Link href={'/auth'}>
      <Image src={userIcon} alt="user" />
    </Link>
  );
};

export default UserIcon;
