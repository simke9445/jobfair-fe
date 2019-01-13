import {
  differenceInCalendarDays,
  parse,
  differenceInHours,
  addHours,
  addDays,
  format,
} from 'date-fns';
import { JobFairApplicationStatus } from 'src/constants';

export interface JobFairJSON {
  Fairs: Array<{
    Fair: string,
    StartDate: Date,
    EndDate: Date,
    StartTime: string,
    EndTime: string,
    Place: string,
    About: string,
  }>;
  Locations: Array<{
    Place: string,
    Location: Array<{
      Name: string,
    }>,
  }>;
}

export interface JobFairPackageJSON {
  Packages: Array<{
    Title: string,
    Content: string[],
    VideoPromotion: number,
    NoLessons: number,
    NoWorkchops: number,
    NoPresentation: number,
    Price: number,
    MaxCompanies: number | string,
  }>;
  Additional: Array<{
    Title: string,
    Price: number,
  }>;
}

export interface JobFairApplication {
  _id?: string;
  company?: string,
  fair?: string,
  package: string,
  services?: string[],
  schedule?: JobFairSchedule,
  status: JobFairApplicationStatus,
  comment: string,
}

export interface JobFair {
  _id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  logoImage?: string;
  images?: string[];
  startTime: string;
  endTime: string;
  place: string;
  description: string;
  areas: string[];
  schedules: JobFairSchedule[];
  applications?: JobFairApplication[];
  services?: JobFairService[];
  packages?: JobFairPackage[];
}

export interface JobFairSchedule {
  _id?: string;
  from: string;
  to: string;
  type: string;
  area: string;
  application?: JobFairApplication;
}

export interface JobFairPackage {
  _id?: string;
  title: string;
  videoPromotion: number;
  numOfLessons: number;
  numOfWorkshops: number;
  numOfPresentations: number;
  totalNumOfCompanies: number;
  content: string[];
  price: number;
}

export interface JobFairService {
  _id?: string;
  price: number;
  description: string;
}

const schedulesFromJSON = (json: JobFairJSON): JobFairSchedule[] => {
  const placeholderDate = '2014-02-11T';
  const endTimeDate = parse(`${placeholderDate}${json.Fairs[0].EndTime}`);
  const startTimeDate = parse(`${placeholderDate}${json.Fairs[0].StartTime}`);
  const midnightTimeDate = parse(`${placeholderDate}00:00:00`);

  const hoursInBetween = differenceInHours(endTimeDate, startTimeDate);
  const hoursFromStart = differenceInHours(startTimeDate, midnightTimeDate);
  const hoursFromEnd = differenceInHours(endTimeDate, midnightTimeDate);
  
  const endDate = addHours(json.Fairs[0].EndDate, hoursFromEnd);
  const startDate = addHours(json.Fairs[0].StartDate, hoursFromStart);

  const daysInBetween = differenceInCalendarDays(endDate, startDate);
  
  let schedules: JobFairSchedule[] = [];
  for (let day = 0; day < daysInBetween; day++) {
    for (let hour = 0; hour < hoursInBetween; hour++) {
      const from = addHours(addDays(startDate, day), hour);
     
      schedules.push({
        from: format(from, 'HH:mm:ss'),
        to: format(addHours(from, 1), 'HH:mm:ss'),
        type: '',
        area: '',
        application: null,
      });
    }
  }

  return schedules;
}

export const jobFairFromJSON = (json: JobFairJSON): JobFair => ({
  name: json.Fairs[0].Fair,
  startDate: json.Fairs[0].StartDate,
  endDate: json.Fairs[0].EndDate,
  startTime: json.Fairs[0].StartTime,
  endTime: json.Fairs[0].EndTime,
  place: json.Locations[0].Place,
  description: json.Fairs[0].About,
  areas: json.Locations[0].Location.map(x => x.Name),
  schedules: schedulesFromJSON(json),
});

export const jobFairPackagesFromJSON = (json: JobFairPackageJSON): JobFairPackage[] => json.Packages.map(p => ({
  title: p.Title,
  videoPromotion: p.VideoPromotion,
  numOfLessons: p.NoLessons,
  numOfWorkshops: p.NoWorkchops,
  numOfPresentations: p.NoPresentation,
  totalNumOfCompanies: typeof p.MaxCompanies === 'string' ? null : p.MaxCompanies,
  content: p.Content,
  price: p.Price,
}));

export const jobFairServicesFromJSON = (json: JobFairPackageJSON): JobFairService[] => json.Additional.map(service => ({
  price: service.Price,
  description: service.Title,
}));