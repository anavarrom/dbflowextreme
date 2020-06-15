export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'fas fa-home'
  },
  {
    text: 'Setup',
    icon: 'fas fa-tools',
    items: [
      {
        text: 'Periods',
        icon: 'fas fa-calendar',
        path: '/safeKeeping'
      }
    ]
  },
  {
    text: 'Calendar',
    icon: 'fas fa-calendar-alt',
    path: '/calendar'
  },
  {
    text: 'Notifications',
    icon: 'fas fa-bell',
    path: '/notifications'
  },
  {
    text: 'Chats',
    icon: 'fas fa-comments',
    path: '/chats'
  }
];
