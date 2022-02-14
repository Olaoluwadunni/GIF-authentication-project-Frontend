/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */

import router from 'next/router';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { MdViewList } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoIosPersonAdd } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';

const Dropdown = ({ admin }) => {
  const logOut = () => {
    localStorage.clear();
    router.push('/');
  };
  console.log('$$$$$', admin);
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<FaUserCircle />}>
          Hi,
          {' '}
          {admin}
        </MenuButton>
        <MenuList>
          {(admin === 'super-admin' || admin === 'admin')
            ? (
              <Link href="/view-users">
                <MenuItem>
                  View All Users
                  {' '}
                  <MdViewList className="ms-2" />
                </MenuItem>
              </Link>
            ) : null}
          {(admin === 'super-admin')
            && (
              <>
                <Link href="/register-admin">
                  <MenuItem>
                    Register an admin
                    {' '}
                    <IoIosPersonAdd className="ms-2" />
                  </MenuItem>
                </Link>
                <Link href="/view-admins">
                  <MenuItem>
                    View All Admins
                    {' '}
                    <MdViewList className="ms-2" />
                  </MenuItem>
                </Link>
              </>
            ) }
          <Link href="/change-password">
            <MenuItem>
              Change Password
              {' '}
              <BiEdit className="ms-2" />
            </MenuItem>
          </Link>
          <MenuItem>
            Edit Profile
            {' '}
            <BiEdit className="ms-2" />
          </MenuItem>
          <MenuItem onClick={logOut}>
            Sign out
            {' '}
            <AiOutlineLogout className="ms-2" />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Dropdown;
