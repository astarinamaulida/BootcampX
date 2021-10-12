SELECT name, email, phone
FROM students
WHERE end_date IS NULL
ORDER BY cohort_id;