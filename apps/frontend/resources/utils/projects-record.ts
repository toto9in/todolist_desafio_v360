export const projectsRecord: Record<string, string> = {
  Inbox: 'Entrada',
  Studies: 'Estudos',
  Home: 'Casa',
  Work: 'Trabalho',
};

export function getProjectName(project: string) {
  return projectsRecord[project] || project;
}
