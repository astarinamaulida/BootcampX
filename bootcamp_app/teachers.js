const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = [process.argv[2] || 'JUL02'];
const values = [`%${cohortName}%`]

// Insert pool.query(queryString, values);
// $1 means input no. 1 which is the cohort name
pool.query(`
SELECT DISTINCT 
  teachers.name AS teacher,
  cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));