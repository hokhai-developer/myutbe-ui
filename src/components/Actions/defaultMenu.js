import { v4 as uuidv4 } from 'uuid';
import {
  LiveIcon,
  UpVideoIcon,
  Feedback,
  LanguageIcon,
  NextIcon,
  ThemIcon,
  ProfileIcon,
  LogOutIcon,
} from '~/components/Icons';

export const MENU_CATEGORY = [
  {
    iconLeft: <UpVideoIcon />,
    title: 'Movies',
    id: uuidv4(),
    to: '/movies',
    choose: null,
    action: null,
  },

  {
    iconLeft: <LiveIcon />,
    title: 'TV Series',
    id: uuidv4(),
    to: '/live',
    choose: null,
    action: null,
  },
];

export const MENU_NOT_USER = [
  {
    iconLeft: <LanguageIcon />,
    iconRight: <NextIcon />,
    title: 'English',
    id: uuidv4(),
    children: {
      id: uuidv4(),
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
          id: uuidv4(),
          choose: true,
          to: null,
          action: null,
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
          id: uuidv4(),
          choose: true,
          to: null,
          action: null,
        },
      ],
    },
  },
  {
    iconLeft: <ThemIcon />,
    iconRight: <NextIcon />,
    title: 'Device Theme',
    id: uuidv4(),
    children: {
      id: uuidv4(),
      title: 'Appearance Them',
      data: [
        {
          type: 'theme',
          code: '1',
          title: 'Dark Theme',
          id: uuidv4(),
          choose: true,
          to: null,
          action: null,
        },
        {
          type: 'theme',
          code: '2',
          title: 'White Theme',
          id: uuidv4(),
          choose: true,
          to: null,
          action: null,
        },
      ],
    },
  },
  {
    iconLeft: <Feedback />,
    title: 'Send Feedback',
    id: uuidv4(),
    to: '/feedback',
    choose: null,
    action: null,
  },
];

export const MENU_HAS_USER = [
  {
    iconLeft: <ProfileIcon />,
    title: 'Your Channel',
    id: uuidv4(),
    to: '/profile',
    choose: null,
    action: null,
  },
  ...MENU_NOT_USER,
  {
    iconLeft: <LogOutIcon />,
    title: 'Log Out',
    id: uuidv4(),
    action: 'logout',
    choose: null,
    to: null,
  },
];
