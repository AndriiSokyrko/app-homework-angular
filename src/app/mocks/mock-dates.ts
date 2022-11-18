import {BoardModel} from "../models/board.model";
import {UserModel} from "../models/user.model";
import {CommentModel} from "../models/comment.model";
import {DashboardModel} from "../models/dashboard.model";
export const useSelectedColor: string[] = ['#111','#222','#333']

  export const dashboards:DashboardModel[] = [
  {
    "id": 1,
    "title": "Json1",
    "description": "Description1",
    "date": "26.10.2022",
    "progress": true,
    "done": false,
    "archive": false
  },
  {
    "id": 2,
    "title": "Json2",
    "description": "Description2",
    "date": "26.10.2022",
    "progress": false,
    "done": true,
    "archive": false,
  },
  {
    "id": 4,
    "title": "Json3 ",
    "description": "Description3",
    "date": "26.10.2022",
    "progress": true,
    "done": false,
    "archive": false,

  },
  {
    "id": 5,
    "title": "Json4",
    "description": "Description4",
    "date": "26.10.2022",
    "progress": true,
    "done": false,
    "archive": false
  },
  {
    "id": 6,
    "title": "Json5",
    "description": "Description5",
    "date": "26.10.2022",
    "progress": false,
    "done": true,
    "archive": true,

  },
  {
    "id": 7,
    "title": "arhimed",
    "description": "descr 6",
    "date": "26.10.2022",
    "progress": true,
    "done": false,
    "archive": false
  },
  {
    "id": 8,
    "title": "json7",
    "description": "descr 7",
    "date": "26.10.2022",
    "progress": true,
    "done": false,
    "archive": false
  },
  {
    "id": 10,
    "title": "Json8",
    "description": "description12",
    "date": "26.10.2022",
    "progress": true,
    "done": false,
    "archive": false
  },
  {
    "id": 13,
    "title": "json9",
    "description": "descr 9",
    "date": "28.10.2022",
    "progress": false,
    "done": true,
    "archive": false
  },
  {
    "title": "Dashbord55",
    "description": "Description55",
    "date": "07.11.2022",
    "progress": false,
    "done": true,
    "archive": true,
    "id": 14,

  }
]
 export const boards: BoardModel[] = [
  {
    "id": 1,
    "title": "reqwest",
    "description": "111111111111",
    "dashboardId": 1,
    "date": "04.11.2022",
    "status": {
      "todo": false,
      "progress": true,
      "done": false
    },
      },
  {
    "id": 2,
    "title": "arhimed",
    "description": "111111111111",
    "dashboardId": 1,
    "date": "02.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    }
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 2,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 3,
      },
  {
    "id": 4,
    "title": "222222222221",
    "description": "2222222222222",
    "dashboardId": 2,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    }
  },
  {
    "id": 5,
    "title": "33333333332",
    "description": "33333333333333",
    "dashboardId": 2,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    }
  },
  {
    "id": 8,
    "title": "arhimed",
    "description": "11111111111111",
    "dashboardId": 4,
    "date": "02.11.2022",
    "status": {
      "todo": false,
      "progress": true,
      "done": false
    },
      },
  {
    "title": "22222222222",
    "description": "2222222222222",
    "dashboardId": 4,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 9,

  },
  {
    "title": "3333333333",
    "description": "33333333333",
    "dashboardId": 4,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 10
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 5,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": true,
      "done": false
    },
    "id": 11,
      },
  {
    "title": "22222222222",
    "description": "2222222222222",
    "dashboardId": 5,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 12,
      },
  {
    "id": 13,
    "title": "arhimed777",
    "description": "111111111111",
    "dashboardId": 6,
    "date": "07.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
      },
  {
    "id": 14,
    "title": "arhimed",
    "description": "2222222222222",
    "dashboardId": 6,
    "date": "02.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    }
  },
  {
    "title": "3333333333",
    "description": "33333333333333",
    "dashboardId": 6,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 15
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 4,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 16
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 4,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 17
  },
  {
    "title": "22222222222",
    "description": "2222222222222",
    "dashboardId": 4,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 18
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 4,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 19,

  },
  {
    "id": 20,
    "title": "json6 bord11",
    "description": "description json6 bord1",
    "dashboardId": 7,
    "date": "02.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
      },
  {
    "id": 21,
    "title": "json6 bord2",
    "description": "descr json6 bord2",
    "dashboardId": 7,
    "date": "02.11.2022",
    "status": {
      "todo": true,
      "progress": false,
      "done": false
    }
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 7,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": true,
      "done": false
    },
    "id": 22
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 10,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": true,
      "done": false
    },
    "id": 26
  },
  {
    "title": "22222222222",
    "description": "2222222222222",
    "dashboardId": 10,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 27
  },
  {
    "title": "22222222222",
    "description": "111111111111",
    "dashboardId": 10,
    "date": "26.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 28
  },
  {
    "id": 31,
    "title": "json-server1",
    "description": "description1",
    "dashboardId": 13,
    "date": "29.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
      },
  {
    "id": 32,
    "title": "ser12345",
    "description": "111111111111",
    "dashboardId": 13,
    "date": "31.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    }
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 13,
    "date": "31.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 33,

  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 13,
    "date": "31.10.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 34
  },
  {
    "id": 35,
    "title": "arhimed",
    "description": "2222222222222",
    "dashboardId": 13,
    "date": "02.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    }
  },
  {
    "title": "arhimed",
    "description": "111111111111",
    "dashboardId": 8,
    "date": "02.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 36
  },
  {
    "title": "11111111111",
    "description": "111111111111",
    "dashboardId": 8,
    "date": "03.11.2022",
    "status": {
      "todo": false,
      "progress": true,
      "done": false
    },
    "id": 37,
      },
  {
    "id": 38,
    "title": "bord11",
    "description": "desrc11",
    "dashboardId": 14,
    "date": "07.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
      },
  {
    "title": "Borad2",
    "description": "Descr2",
    "dashboardId": 14,
    "date": "07.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 39,

  },
  {
    "title": "Board3",
    "description": "Descr3",
    "dashboardId": 14,
    "date": "07.11.2022",
    "status": {
      "todo": false,
      "progress": false,
      "done": true
    },
    "id": 40
  }
]
  export const  comments:CommentModel[] = [
  {
    "boardId": 8,
    "dashboardId": 4,
    "text": "comments 11 for board1",
    "userId": 1,
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
  },
  {
    "boardId": 32,
    "dashboardId": 13,
    "text": "comments 11 for board1",
    "userId": 1,
    "date": "29.10.2022",
    "id": 7
  },
  {
    "id": 8,
    "boardId": 31,
    "dashboardId": 13,
    "text": "31 json1",
    "userId": 1,
    "date": "31.10.2022"
  },
  {
    "id": 9,
    "boardId": 32,
    "dashboardId": 13,
    "text": "comments 12 for board12345",
    "userId": 1,
    "date": "31.10.2022"
  },
  {
    "boardId": 31,
    "dashboardId": 13,
    "text": "comments 12 for board123444",
    "userId": 1,
    "date": "31.10.2022",
    "id": 10
  },
  {
    "boardId": 32,
    "dashboardId": 13,
    "text": "comments 1 for board1",
    "userId": 1,
    "date": "31.10.2022",
    "id": 11
  },
  {
    "boardId": 32,
    "dashboardId": 13,
    "text": "comments 12 for board12",
    "userId": 1,
    "date": "31.10.2022",
    "id": 12
  },
  {
    "boardId": 32,
    "dashboardId": 13,
    "text": "comments 1234 for board1234",
    "userId": 1,
    "date": "31.10.2022",
    "id": 13
  },
  {
    "id": 14,
    "boardId": 33,
    "dashboardId": 13,
    "text": "test 3 111111",
    "userId": 1,
    "date": "31.10.2022"
  },
  {
    "id": 15,
    "boardId": 34,
    "dashboardId": 13,
    "text": "tests 10000",
    "userId": 1,
    "date": "31.10.2022"
  },
  {
    "boardId": 34,
    "dashboardId": 13,
    "text": "comments 12 for board1",
    "userId": 1,
    "date": "31.10.2022",
    "id": 16
  },
  {
    "id": 17,
    "boardId": 35,
    "dashboardId": 13,
    "text": "comments 12 for board100",
    "userId": 1,
    "date": "31.10.2022"
  },
  {
    "id": 18,
    "boardId": 22,
    "dashboardId": 7,
    "text": "comments 12 for board100",
    "userId": 1,
    "date": "02.11.2022"
  },
  {
    "boardId": 39,
    "dashboardId": 14,
    "text": "comments 2 for board2",
    "userId": 4,
    "date": "07.11.2022",
    "id": 19
  }
]
  export const users:UserModel[] = [
  {
    "id": 1,
    "name": "name1",
    "email": "email@org.ua",
    "password": "name1"
  },
  {
    "name": "name2",
    "email": "name2@ukr.net",
    "password": "name2",
    "id": 2
  },
  {
    "name": "name55",
    "email": "name55@ukr.net",
    "password": "name55",
    "id": 3
  },
  {
    "name": "name77",
    "email": "name77@ukr.net",
    "password": "name77",
    "id": 4
  }
]
