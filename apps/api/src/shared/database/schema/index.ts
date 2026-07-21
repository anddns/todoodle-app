import { projectsTable } from '@/api/shared/database/schema/projects.table'
import { tasksTable } from '@/api/shared/database/schema/tasks.table'
import { usersTable } from '@/api/shared/database/schema/users.table'

export const schema = {
  users: usersTable,
  tasks: tasksTable,
  projects: projectsTable,
}
