export interface DashboardModel{
  "id"?: number,
  "title": string,
  "description": string ,
  "date": string,
  "progress": boolean,
  "done": boolean,
  "archive"?:boolean
}
