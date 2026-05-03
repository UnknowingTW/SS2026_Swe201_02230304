// src/data/mockData.ts
// All static data used across the app — no backend needed

export interface Task {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  dueDate: string;
  dueTime: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  description: string;
  tags: string[];
  estimatedMinutes: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  taskCount: number;
  completedCount: number;
  nextClass: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  color: string;
}

export const SUBJECTS: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    color: '#6366F1',
    icon: 'calculator',
    taskCount: 5,
    completedCount: 3,
    nextClass: 'Mon 8:00 AM',
  },
  {
    id: '2',
    name: 'Science',
    color: '#10B981',
    icon: 'flask',
    taskCount: 4,
    completedCount: 2,
    nextClass: 'Tue 10:00 AM',
  },
  {
    id: '3',
    name: 'English',
    color: '#F59E0B',
    icon: 'book-open',
    taskCount: 6,
    completedCount: 5,
    nextClass: 'Wed 9:00 AM',
  },
  {
    id: '4',
    name: 'History',
    color: '#EF4444',
    icon: 'globe',
    taskCount: 3,
    completedCount: 1,
    nextClass: 'Thu 11:00 AM',
  },
  {
    id: '5',
    name: 'Art',
    color: '#8B5CF6',
    icon: 'color-palette',
    taskCount: 2,
    completedCount: 2,
    nextClass: 'Fri 2:00 PM',
  },
  {
    id: '6',
    name: 'Phys. Ed.',
    color: '#F97316',
    icon: 'fitness',
    taskCount: 1,
    completedCount: 0,
    nextClass: 'Mon 3:00 PM',
  },
];

export const TASKS: Task[] = [
  {
    id: '1',
    title: 'Calculus Problem Set 7',
    subject: 'Mathematics',
    subjectColor: '#6366F1',
    dueDate: 'Today',
    dueTime: '11:59 PM',
    priority: 'High',
    completed: false,
    description:
      'Complete all 20 problems from Chapter 7 on Integration by Parts. Show all working steps. Problems 15–20 are bonus.',
    tags: ['Calculus', 'Integration', 'Chapter 7'],
    estimatedMinutes: 90,
  },
  {
    id: '2',
    title: 'Lab Report: Osmosis',
    subject: 'Science',
    subjectColor: '#10B981',
    dueDate: 'Tomorrow',
    dueTime: '5:00 PM',
    priority: 'High',
    completed: false,
    description:
      'Write a full lab report for the osmosis experiment conducted in class. Include hypothesis, method, results, discussion, and conclusion.',
    tags: ['Biology', 'Lab', 'Report'],
    estimatedMinutes: 120,
  },
  {
    id: '3',
    title: 'Essay: The Great Gatsby',
    subject: 'English',
    subjectColor: '#F59E0B',
    dueDate: 'Thu 15 May',
    dueTime: '9:00 AM',
    priority: 'Medium',
    completed: false,
    description:
      'Write a 1200-word analytical essay on the theme of the American Dream in The Great Gatsby. Include at least 5 textual references.',
    tags: ['Essay', 'Literature', 'Analysis'],
    estimatedMinutes: 180,
  },
  {
    id: '4',
    title: 'WWII Timeline Poster',
    subject: 'History',
    subjectColor: '#EF4444',
    dueDate: 'Fri 16 May',
    dueTime: '3:00 PM',
    priority: 'Medium',
    completed: false,
    description:
      'Create an A3 poster showing the key events of World War II from 1939 to 1945. Include at least 10 events with dates.',
    tags: ['WWII', 'Poster', 'Timeline'],
    estimatedMinutes: 60,
  },
  {
    id: '5',
    title: 'Algebra Quiz Revision',
    subject: 'Mathematics',
    subjectColor: '#6366F1',
    dueDate: 'Today',
    dueTime: '3:00 PM',
    priority: 'High',
    completed: true,
    description:
      'Revise all algebra topics covered in Chapters 1–4 for the upcoming quiz on Friday.',
    tags: ['Algebra', 'Quiz', 'Revision'],
    estimatedMinutes: 45,
  },
  {
    id: '6',
    title: 'Watercolor Self-Portrait',
    subject: 'Art',
    subjectColor: '#8B5CF6',
    dueDate: 'Next Mon',
    dueTime: '8:00 AM',
    priority: 'Low',
    completed: false,
    description:
      'Create a watercolor self-portrait using the techniques covered in class. Minimum A4 size.',
    tags: ['Watercolor', 'Portrait', 'Studio'],
    estimatedMinutes: 150,
  },
  {
    id: '7',
    title: 'Read: Chapter 5 (English)',
    subject: 'English',
    subjectColor: '#F59E0B',
    dueDate: 'Today',
    dueTime: '11:59 PM',
    priority: 'Low',
    completed: true,
    description: 'Read Chapter 5 of The Great Gatsby and take notes on key symbols and quotes.',
    tags: ['Reading', 'Notes'],
    estimatedMinutes: 40,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Submit 3 tasks before the deadline',
    icon: 'sunny',
    earned: true,
    color: '#F59E0B',
  },
  {
    id: '2',
    title: 'Streak Master',
    description: 'Complete tasks 7 days in a row',
    icon: 'flame',
    earned: true,
    color: '#EF4444',
  },
  {
    id: '3',
    title: 'Perfect Week',
    description: 'Complete all tasks in a week',
    icon: 'star',
    earned: false,
    color: '#6366F1',
  },
  {
    id: '4',
    title: 'Study Guru',
    description: 'Log 50 hours of study time',
    icon: 'school',
    earned: false,
    color: '#10B981',
  },
];

export const TIMETABLE = [
  { day: 'Mon', slots: ['Math 8AM', 'Science 10AM', 'PE 3PM'] },
  { day: 'Tue', slots: ['English 9AM', 'Science 10AM', 'History 2PM'] },
  { day: 'Wed', slots: ['Math 8AM', 'English 9AM', 'Art 1PM'] },
  { day: 'Thu', slots: ['History 11AM', 'Math 2PM'] },
  { day: 'Fri', slots: ['English 9AM', 'Art 2PM', 'Science 3PM'] },
];
