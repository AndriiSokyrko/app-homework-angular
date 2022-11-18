import { FilterDashboardPipe } from './filter-dashboard.pipe';
import {DashboardModel} from "../models/dashboard.model";
import {TestBed} from "@angular/core/testing";
import { StoreModule} from "@ngrx/store";
import {boardReducer} from "../reducers/board/board.reducer";
import {dashboardReducer} from "../reducers/dashboard/dashboard.reducer";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../reducers/app.state";
import {getBoards, getBoardsByDashboardId} from "../reducers/board/board.selectors";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {getDashboardById} from "../reducers/dashboard/dashboard.selectors";
import {useDashboards, useBoards} from "./mocks/boards";

describe('FilterDashboardPipe', () => {
  let mockStore: MockStore<AppState>
  // const pipe = new FilterDashboardPipe(mockStore);
  let dashboard:DashboardModel[] = [
    {
      "id": 1,
      "title": 'arhimed',
      "description": 'string',
      "date": '02.02.2022',
      "progress": true,
      "done": false,
      "archive": false
    },
    {
      "id": 2,
      "title": 'humid',
      "description": 'string',
      "date": '02.02.2022',
      "progress": true,
      "done": false,
      "archive": false
    }

  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({dashboard: dashboardReducer, board: boardReducer})
      ],
      providers:[provideMockStore(),
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});

  })

  it('create an instance', () => {
    const pipe = new FilterDashboardPipe(mockStore);

    expect(pipe).toBeTruthy();
  });

  it('transforms filtering dashboards"', () => {
    const pipe = new FilterDashboardPipe(mockStore);

    mockStore.overrideSelector(getBoards, useBoards);
    mockStore.overrideSelector(getDashboardById,useDashboards.filter(db=>db.id===2))
    mockStore.refreshState()
      expect(pipe.transform(useDashboards,'json1')).toEqual([useDashboards[0]])

  });
});
