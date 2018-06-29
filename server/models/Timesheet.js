const db = require('../db');
const moment = require('moment');

const Timesheet = {};

Timesheet.create = (timesheet, id) => (
  db.one(
    `INSERT INTO timesheets (user_id, date, project_id, time_in, time_out, totalhours, 
      created_user, updated_user, task) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING 1`,
    [
      timesheet.userId,
      timesheet.date,
      timesheet.projectId,
      timesheet.timeIn,
      timesheet.timeOut,
      timesheet.totalhours,
      id,
      id,
      timesheet.task
    ]
  )
);

Timesheet.update = (timesheet, id) => (
  db.one(
    'UPDATE timesheets SET project_id = $1, time_in = $2, time_out = $3, totalhours = $4, updated_user = $5, updated_date = $6, task = $8 WHERE id = $7',
    [
      timesheet.projectId,
      timesheet.timeIn,
      timesheet.timeOut,
      timesheet.totalhours,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      timesheet.task,
      timesheet.id,
    ]
  )
);

Timesheet.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM timesheets WHERE user_id = $1', [userId])
);

Timesheet.findTimesheetInProject = (year, month, projectId, userId) => (
  db.manyOrNone('SELECT * FROM timesheets WHERE extract(year from date) = $1 AND extract(month from date) = $2 AND project_id = $3 AND user_id = $4', [year, month, projectId, userId])
);

Timesheet.findSummaryTimesheet = year => (
  db.manyOrNone(`SELECT users.id, CONCAT(employee_info.first_name, ' ', employee_info.last_name) as name, 
  timesheets.project_id, EXTRACT(MONTH FROM timesheets.date) as month, SUM(timesheets.totalhours) / $1 as hours
  FROM users INNER JOIN timesheets ON users.id = timesheets.user_id INNER JOIN employee_info 
  ON users.id = employee_info.user_id
  WHERE EXTRACT(year from timesheets.date) = $2
  GROUP BY users.id, timesheets.project_id, month, name
  ORDER BY users.id, timesheets.project_id, month`, [8, year])
);

Timesheet.findByMonthAndYear = (month, year, userId) => (
  db.manyOrNone(`SELECT timesheets.project_id, projects.name, timesheets.date, 
  timesheets.time_in, timesheets.time_out, timesheets.task, timesheets.description
  FROM timesheets INNER JOIN projects ON timesheets.project_id = projects.id 
  WHERE EXTRACT(month from timesheets.date) = $1 AND EXTRACT(year from timesheets.date) = $2 
  AND timesheets.user_id = $3`, [month, year, userId])
);

Timesheet.delete = id => (
  db.one('DELETE FROM timesheets WHERE id = $1', [id])
);

module.exports = Timesheet;
