// App-wide color palette
export const COLORS = {
  primary: '#1A3A5C',      // Deep navy blue
  secondary: '#F4A300',    // Gold/amber accent
  background: '#F5F7FA',   // Light grey background
  white: '#FFFFFF',
  textDark: '#1C2B3A',
  textMid: '#4A5568',
  textLight: '#A0AEC0',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
  success: '#38A169',
  highlight: '#EBF4FF',
};

// Contact data used in Contacts screen
export const CONTACTS = [
  {
    id: '1',
    name: 'IT Helpdesk',
    role: 'Technical Support',
    phone: '+975-5-252525',
    email: 'ithelpdesk@cst.rub.edu.bt',
    icon: 'laptop',
  },
  {
    id: '2',
    name: 'Student Services',
    role: 'Student Affairs Office',
    phone: '+975-5-252526',
    email: 'studentservices@cst.rub.edu.bt',
    icon: 'people',
  },
  {
    id: '3',
    name: 'Library',
    role: 'CST Library',
    phone: '+975-5-252527',
    email: 'library@cst.rub.edu.bt',
    icon: 'book',
  },
  {
    id: '4',
    name: 'Health Center',
    role: 'Campus Medical Unit',
    phone: '+975-5-252528',
    email: 'health@cst.rub.edu.bt',
    icon: 'medkit',
  },
  {
    id: '5',
    name: 'Academic Office',
    role: 'Examinations & Records',
    phone: '+975-5-252529',
    email: 'academic@cst.rub.edu.bt',
    icon: 'school',
  },
  {
    id: '6',
    name: 'Security Office',
    role: 'Campus Security',
    phone: '+975-5-252530',
    email: 'security@cst.rub.edu.bt',
    icon: 'shield',
  },
];

// Weekly timetable data
export const TIMETABLE = [
  {
    day: 'Monday',
    classes: [
      { time: '08:00 - 09:00', subject: 'Cross Platform Dev', room: 'Lab 3', code: 'SWE201' },
      { time: '09:00 - 10:00', subject: 'Software Engineering', room: 'CR 101', code: 'SWE202' },
      { time: '11:00 - 12:00', subject: 'Database Systems', room: 'CR 202', code: 'CS301' },
      { time: '14:00 - 16:00', subject: 'Lab: Cross Platform', room: 'Lab 3', code: 'SWE201L' },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '08:00 - 09:00', subject: 'Software Engineering', room: 'CR 101', code: 'SWE202' },
      { time: '10:00 - 11:00', subject: 'Computer Networks', room: 'CR 105', code: 'CS401' },
      { time: '13:00 - 15:00', subject: 'Lab: Database', room: 'Lab 2', code: 'CS301L' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '09:00 - 10:00', subject: 'Cross Platform Dev', room: 'Lab 3', code: 'SWE201' },
      { time: '11:00 - 12:00', subject: 'Computer Networks', room: 'CR 105', code: 'CS401' },
      { time: '14:00 - 15:00', subject: 'Database Systems', room: 'CR 202', code: 'CS301' },
    ],
  },
  {
    day: 'Thursday',
    classes: [
      { time: '08:00 - 09:00', subject: 'Software Engineering', room: 'CR 101', code: 'SWE202' },
      { time: '10:00 - 12:00', subject: 'Lab: Networks', room: 'Lab 1', code: 'CS401L' },
      { time: '13:00 - 14:00', subject: 'Cross Platform Dev', room: 'Lab 3', code: 'SWE201' },
    ],
  },
  {
    day: 'Friday',
    classes: [
      { time: '09:00 - 10:00', subject: 'Database Systems', room: 'CR 202', code: 'CS301' },
      { time: '11:00 - 12:00', subject: 'Computer Networks', room: 'CR 105', code: 'CS401' },
    ],
  },
];

// Notices / announcements data
export const NOTICES = [
  {
    id: '1',
    title: 'Semester Examination Schedule',
    date: '15 Apr 2026',
    category: 'Exam',
    body:
      'The final semester examination timetable for Year 3 Semester 2 has been released. Please check VLE for the detailed schedule. All students are required to carry their student ID cards during examinations.',
    urgent: true,
  },
  {
    id: '2',
    title: 'Library Extended Hours',
    date: '12 Apr 2026',
    category: 'Facility',
    body:
      'The CST Library will remain open until 10:00 PM on weekdays during the exam preparation period (18 Apr – 2 May 2026). Weekend hours remain 9:00 AM – 6:00 PM.',
    urgent: false,
  },
  {
    id: '3',
    title: 'Programming Assignment-1 Deadline Reminder',
    date: '10 Apr 2026',
    category: 'Academic',
    body:
      'Reminder: Programming Assignment-1 for SWE201 (Cross Platform Development) is due on 10th April 2026. Submit the repository link and PDF report via VLE before midnight.',
    urgent: true,
  },
  {
    id: '4',
    title: 'Sports Day 2026',
    date: '08 Apr 2026',
    category: 'Event',
    body:
      'Annual Sports Day will be held on 25th April 2026. All students are encouraged to participate. Registration forms are available at the Student Services Office.',
    urgent: false,
  },
  {
    id: '5',
    title: 'Wi-Fi Maintenance Notice',
    date: '05 Apr 2026',
    category: 'IT',
    body:
      'Campus Wi-Fi maintenance is scheduled for 19th April 2026 from 2:00 AM to 6:00 AM. Internet access will be unavailable during this window. Please plan accordingly.',
    urgent: false,
  },
];

// Campus map links
export const MAP_LINKS = [
  { id: '1', label: 'Main Campus Overview', url: 'https://maps.google.com', icon: 'map' },
  { id: '2', label: 'Academic Block', url: 'https://maps.google.com', icon: 'school' },
  { id: '3', label: 'Hostel Block', url: 'https://maps.google.com', icon: 'home' },
  { id: '4', label: 'Sports Complex', url: 'https://maps.google.com', icon: 'football' },
  { id: '5', label: 'Cafeteria', url: 'https://maps.google.com', icon: 'restaurant' },
  { id: '6', label: 'Library', url: 'https://maps.google.com', icon: 'book' },
];
