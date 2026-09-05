/**
 * Courses Module (courses.js)
 * Course: WDD 231 - Web Frontend Development I
 * Student: Erick Scala
 * Handles rendering, array filtering, and credit calculations with reduce().
 */

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true // Completed by Erick Scala
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
    technology: ['HTML', 'CSS'],
    completed: true // Completed by Erick Scala
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.',
    technology: ['Python'],
    completed: true // Completed by Erick Scala
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: true // Completed by Erick Scala
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const courseContainer = document.getElementById('courseContainer');
  const totalCreditsEl = document.getElementById('totalCredits');
  const allBtn = document.getElementById('allCourses');
  const cseBtn = document.getElementById('cseCourses');
  const wddBtn = document.getElementById('wddCourses');
  const filterButtons = [allBtn, cseBtn, wddBtn];

  /**
   * Render course list into DOM
   * @param {Array} courseList
   */
  function displayCourses(courseList) {
    if (!courseContainer) return;
    courseContainer.innerHTML = '';

    courseList.forEach((course) => {
      const card = document.createElement('div');
      card.className = `course-pill ${course.completed ? 'completed' : 'incomplete'}`;
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', `${course.subject} ${course.number} ${course.title}`);

      const statusIcon = course.completed ? '&#10003;' : '&#9675;';
      const statusText = course.completed ? 'Completed' : 'In Progress / Planned';

      card.innerHTML = `
        <div class="course-code">
          <span>${course.subject} ${course.number}</span>
          <span class="status-badge" aria-hidden="true">${statusIcon}</span>
        </div>
        <div class="course-title">${course.title} &bull; ${course.credits} cr</div>
      `;

      courseContainer.appendChild(card);
    });

    // Calculate total credits using Array.prototype.reduce()
    calculateTotalCredits(courseList);
  }

  /**
   * Calculate and display total credits using Array.prototype.reduce()
   * @param {Array} courseList
   */
  function calculateTotalCredits(courseList) {
    if (!totalCreditsEl) return;
    const totalCredits = courseList.reduce((accumulator, currentCourse) => {
      return accumulator + currentCourse.credits;
    }, 0);

    totalCreditsEl.textContent = `The total credits for course listed above is ${totalCredits}`;
  }

  /**
   * Set active button visual state
   * @param {HTMLButtonElement} activeButton
   */
  function setActiveButton(activeButton) {
    filterButtons.forEach((btn) => {
      if (btn) btn.classList.remove('active');
    });
    if (activeButton) activeButton.classList.add('active');
  }

  // Event Listeners for Filters using Array.prototype.filter()
  if (allBtn) {
    allBtn.addEventListener('click', () => {
      setActiveButton(allBtn);
      displayCourses(courses);
    });
  }

  if (cseBtn) {
    cseBtn.addEventListener('click', () => {
      setActiveButton(cseBtn);
      const cseList = courses.filter((course) => course.subject === 'CSE');
      displayCourses(cseList);
    });
  }

  if (wddBtn) {
    wddBtn.addEventListener('click', () => {
      setActiveButton(wddBtn);
      const wddList = courses.filter((course) => course.subject === 'WDD');
      displayCourses(wddList);
    });
  }

  // Initial render: Display all courses
  displayCourses(courses);
});
