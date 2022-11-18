import {TestBed} from "@angular/core/testing";
import {StoreModule} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";
import {BoardModel} from "../models/board.model";
import {FilterBoardPipe} from "./filter-board.pipe";

describe('FilterBoardPipe', () => {
  let store: StoreModule
  const pipe = new FilterBoardPipe();
  let  board:BoardModel[] = [
    {
      "title": "11111111111",
      "description": "111111111111",
      "dashboardId": 1,
      "date": "26.10.2022",
      "status": {
        "todo": true,
        "progress": false,
        "done": false
      },
      "id": 1
    },
    {
      "id": 2,
      "title": "arhimed",
      "description": "111111111111",
      "dashboardId": 1,
      "date": "02.11.2022",
      "status": {
        "todo": false,
        "progress": true,
        "done": false
      }
    },

  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // StoreModule.forRoot({dashboard: dashboardReducer, board: boardReducer})
      ],
      providers:[provideMockStore()]
    })
      .compileComponents();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms filtering dashboards"', () => {
    let filter = '.?arhimed.?'
    let regx:RegExp = new RegExp(filter)
    expect(pipe.transform( board,'arhimed')).toEqual( [board[1]]);
  });
});
