import { SortBoardPipe } from './sort-board.pipe';
import {BoardModel} from "../models/board.model";

describe('SortBoardPipe', () => {
  let sortBoardPipe:SortBoardPipe
  let boards: BoardModel[]
  beforeEach(()=>{
    sortBoardPipe = new SortBoardPipe()
    boards = [
      {
        "id": 1,
        "title": 'string',
        "description":'string',
        "dashboardId": 1,
        "date": 'string',
        "status": {
          "todo": true,
          "progress": false,
          "done": false
        }
      },{
        "id": 2,
        "title": 'string',
        "description":'string',
        "dashboardId": 1,
        "date": 'string',
        "status": {
          "todo": false,
          "progress": true,
          "done": false
        }
      },
      {
        "id": 3,
        "title": 'string',
        "description":'string',
        "dashboardId": 2,
        "date": 'string',
        "status": {
          "todo": false,
          "progress": false,
          "done": true
        }
      }
    ]
  })
  it('create an instance', () => {
    expect(sortBoardPipe).toBeTruthy();
  });


  it('sort by date', () => {
    expect(sortBoardPipe.transform(boards,'asc','date')).toEqual(
      boards
        .filter(item => typeof item['date'] === 'string')
        .sort((a, b) => Number(a['date']) - Number(b['date'] ))
    );
  });
  it('sort by title', () => {
    expect(sortBoardPipe.transform(boards,'asc','title')).toEqual(
      boards
        .sort((a, b) => {
          if (a['title'] < b['title']) return -1;
          else if (a['title'] > b['title']) return 1;
          else return 0;
        })
    );
  });

  it('sort by id or title', () => {
    expect(sortBoardPipe.transform(boards,'asc','title')).toEqual(
      boards
        .sort((a, b) => {
          if (a['title'] < b['title']) return -1;
          else if (a['title'] > b['title']) return 1;
          else return 0;
        })
    );
  });

  it('sort by boolean', () => {
    expect(sortBoardPipe.transform(boards,'asc','id')).toEqual(
      boards
        .sort((a, b) => !(a['id'] !== b['id']) ? 0 : 1)
    )})


});
