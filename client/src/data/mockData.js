export const users = [
  {
    id: 1,
    role: 'student',
    name: 'Filan Fisteku',
    email: 'filan.fisteku@example.com',
    class: 'Math',
    progress: [
      {
        contentId: 1,
        status: 'completed',
      },
      {
        contentId: 2,
        status: 'in-progress',
      },
    ],
  },
  {
    id: 2,
    role: 'parent',
    name: 'Syl Fisteku',
    email: 'syla.fisteku@example.com',
    children: [1],
  },
];

export const classContent = [
  {
    id: 1,
    class: 'Matematike',
    type: 'text',
    title: 'Hyrje në Algjeber',
    content: 'Algebra eshte nje nga pjeset e gjera te matematikes...',
  },
  {
    id: 2,
    class: 'Matematike',
    type: 'pdf',
    title: 'Bazat e algjebres',
    url: 'path/to/algebra-basics.pdf',
  },
  {
    id: 3,
    class: 'Matematike',
    type: 'image',
    title: 'Formulat algjeber',
    url: 'path/to/algebra-formulas.png',
  },
];

export const videos = [
  {
    id: 1,
    class: 'Matematik',
    title: 'Hyrje ne algjeber',
    url: 'path/to/introduction-to-algebra.mp4',
  },
  {
    id: 2,
    class: 'Math',
    title: 'Advanced Algebra',
    url: 'path/to/advanced-algebra.mp4',
  },
];

export const quizzes = [
  {
    id: 1,
    class: 'Matematike',
    title: 'Kuizi i Bazave te Algjebres',
    questions: [
      {
        question: 'Sa eshte rezultati? 2 + 2 = ?',
        options: ['1', '2', '3', '4'],
        answer: '4',
      },
      {
        question: 'Thjeshtoni: 2(x + 3) = ?',
        options: ['2x + 6', '2x + 3', 'x + 6', 'x + 3'],
        answer: '2x + 6',
      },
    ],
  },
];

export const progressReports = [
  {
    studentId: 1,
    reports: [
      {
        date: '2024-05-01',
        activity: 'Kuzi i plotesuar per bazat e algjebres',
        result: '80%',
      },
      {
        date: '2024-05-02',
        activity: 'Shikuar Video Hyrje ne Algjeber',
        result: 'Perfunduar',
      },
    ],
  },
];
