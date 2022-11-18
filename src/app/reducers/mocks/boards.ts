import {CommentModel} from "../../models/comment.model";
import {DashboardModel} from "../../models/dashboard.model";
import {BoardModel} from "../../models/board.model";

export const useSelectedColor: string[] = ['#111','#222','#333']

export const useDashboards: DashboardModel[]=[
  {
    "id": 2,
    "title": "Json1",
    "description": "Description1",
    "date": "26.10.2022",
    "progress": false,
    "done": false,
    "archive": false
  },
  {
    "id": 5,
    "title": "Json1",
    "description": "Description1",
    "date": "26.10.2022",
    "progress": false,
    "done": false,
    "archive": false
  },
]
export const useBoards:BoardModel[]=[
    {
      "title": "22222222222",
      "description": "2222222222222",
      "dashboardId": 5,
      "date": "05.10.2022",
      "status": {
        "todo": true,
        "progress": false,
        "done": false
      },
      "id": 5,
    },
    {
      "title": "22222222222",
      "description": "2222222222222",
      "dashboardId": 5,
      "date": "05.10.2022",
      "status": {
        "todo": false,
        "progress": true,
        "done": false
      },
      "id": 6,
    },
    {
      "title": "22222222222",
      "description": "2222222222222",
      "dashboardId": 2,
      "date": "05.10.2022",
      "status": {
        "todo": false,
        "progress": false,
        "done": true
      },
      "id": 7,
    },
    {
      "title": "11111111111",
      "description": "111111111111",
      "dashboardId": 2,
      "date": "05.10.2022",
      "status": {
        "todo": false,
        "progress": false,
        "done": true
      },
      "id": 8
    },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 2,
    "date": "05.10.2022",
    "status": {
      "todo": true,
      "progress": false,
      "done": true
    },
    "id": 9
  }
]
export  const useComments:CommentModel[] = [
{
  "userId": 1,
  "boardId": 8,
  "dashboardId": 4,
  "text": "comments 11 for board1",
  "date": "26.10.2022",
  "id": 1
},
{
  "id": 2,
  "boardId": 13,
  "dashboardId": 6,
  "text": "some text1",
  "userId": 1,
  "date": "26.10.2022"
},
{
  "id": 3,
  "boardId": 13,
  "dashboardId": 6,
  "text": "some txt",
  "userId": 1,
  "date": "26.10.2022"
}]
