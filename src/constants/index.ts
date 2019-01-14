export const bussinessAreas = [
  'IT',
  'telekomunikacije',
  'gradjevina i arhitektura',
  'masinstvo',
  'kompjuterske nauke',
  'softversko inzenjerstvo',
];

export const contestTypes = [
  'internship',
  'employment',
]

export const jobFairScheduleTypes = [
  'workshop',
  'lesson',
  'presentation',
];

export enum UserRole {
  Admin = 'admin',
  Company = 'company',
  Student = 'student',
}

export enum JobFairApplicationStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Accepted = 'ACCEPTED',
}