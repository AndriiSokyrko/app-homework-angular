import {DashboardModel} from "../../../../models/dashboard.model";

export const useSelectedColor: string[] = ['#111','#222','#333']

export const useDashboards: DashboardModel[]= [
  {
    "id": 1,
    "title": 'test title 1',
    "description": 'string',
    "date": '02.02.2022',
    "progress": true,
    "done": false,
    "archive": false
  },
  {
    "id": 2,
    "title": 'string',
    "description": 'string',
    "date": '02.02.2022',
    "progress": true,
    "done": false,
    "archive": false
  }, {
    "id": 3,
    "title": "json-server3",
    "description": "description board 3",
    "date": "23.10.2022",
    "progress": false,
    "done": false,
    "archive": true

  },
  {
    "id": 4,
    "title": "json-server4",
    "description": "description board 4",
    "date": "23.10.2022",
    "progress": false,
    "done": false,
    "archive": false

  },
  {
    "id": 5,
    "title": "json-server5",
    "description": "description board 5",
    "date": "23.10.2022",
    "progress": true,
    "done": false,
    "archive": false

  }
]
