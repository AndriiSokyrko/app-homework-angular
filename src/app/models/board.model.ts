export interface BoardModel {
 "id"?: number,
  "title": string,
  "description":string,
  "dashboardId": number,
  "date"?: string,
  "status": {
    "todo": boolean,
    "progress": boolean,
    "done": boolean
  }
}
