import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { BoardCardComponent } from './board-card.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../../../services/board/board.service";
import { CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { Location } from '@angular/common';
import {RouterTestingModule} from "@angular/router/testing";
import {BoardCardEditComponent} from "../board-card-edit/board-card-edit.component";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {useDashboards} from "../../dashboard/mocks/dashboards";
import { useBoards, useSelectedColor} from "../mocks/boards";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {of} from "rxjs";
import {deleteBoard, editBoard} from "../../../../reducers/board/board.actions";
import {editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {AppState} from "../../../../reducers/app.state";
import {BoardComponent} from "../board.component";
import {getBoards, getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {boardReducer} from "../../../../reducers/board/board.reducer";
import {getDashboardById} from "../../../../reducers/dashboard/dashboard.selectors";
import {getColor} from "../../../../reducers/color/color.selector";


describe('BoardCardComponent', () => {
  let component: BoardCardComponent;
  let fixture: ComponentFixture<BoardCardComponent>;
  let boardService:  BoardService
  let dashboardService:DashboardService
  let router :Router
  let location: Location
  let useColor=useSelectedColor
  let routerAct: ActivatedRoute
  let useBoard = useBoards[0]
  let useDashboard=  useDashboards[0]
  let routes=[
    {path:'edit-board/:id', component: BoardCardEditComponent},
    {path:'board/:id', component: BoardComponent}
  ]
  let mockBoardsByDashboardId
  let mockStore: MockStore<AppState>
  let mockSelector
  const dashboardServiceSpy= jasmine.createSpyObj('dashboardService', ['editDashboard'])
  const boardServiceSpy = jasmine.createSpyObj('boardService',['removeBoard','editBoard'])

  beforeEach(async () => {
    let initialState= {...useBoards};
    await TestBed.configureTestingModule({
      declarations: [BoardCardComponent],
      imports:[
         HttpClientTestingModule,
         RouterTestingModule.withRoutes(routes),
       ],
      providers:[
        provideMockStore(),
        {provide: BoardService, useValue: boardServiceSpy},
        {provide:DashboardService, useValue: dashboardServiceSpy},
        {provide: ActivatedRoute, useValue: {url:'',path:''}}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockStore.overrideSelector(getColor,useSelectedColor)
     mockBoardsByDashboardId = mockStore.overrideSelector(getBoardsByDashboardId, useBoards)
    mockStore.refreshState()

    boardService =TestBed.inject(BoardService)
    dashboardService =TestBed.inject(DashboardService)

    router = TestBed.inject(Router)
    routerAct = TestBed.inject(ActivatedRoute)
    location= TestBed.inject(Location)
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(BoardCardComponent);
    component = fixture.componentInstance;
    component.selectedColor= useColor
    component.board=useBoard
    component.archiveBoard= useDashboard
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(boardService).toBeTruthy();
  });
  it('onEdit navigate to "edit-board/:id" ', () => {
    component.onEdit()
    expect(router.navigate).toHaveBeenCalledWith(['edit-board',5],{relativeTo:routerAct});
  });
  it('onDelete spec', () => {
    boardServiceSpy.removeBoard.and.returnValue(of(useBoard))
    fixture.detectChanges()
    component.onDelete()
    boardService.removeBoard(useBoard.id).subscribe(dt => {
      expect(dt).toEqual(useBoard)
      expect(mockStore.dispatch).toHaveBeenCalledWith(deleteBoard({id: useBoard.id}))

      expect(router.navigate).toHaveBeenCalledWith(['board', 2]);

    })
  })


  it('onArchive spec',()=>{
    mockStore.overrideSelector(getDashboardById,useDashboard)
    mockStore.refreshState()
    fixture.detectChanges()
    const event= spyOn(component.messageArchive, 'emit')
    component.archiveBoard=useDashboard
    dashboardServiceSpy.editDashboard.and.returnValue(of(useDashboard))
    fixture.detectChanges()
    component.onArchive();
    expect(dashboardService.editDashboard).toHaveBeenCalled()
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      editDashboard(useDashboard)
    )
      expect(event).toHaveBeenCalled()
  })
  it('shiftToNextColumn spec',()=>{
    //test suggest that now done=true so next column is todo true
    component.board=useBoard
    const updatedBoard = {...useBoard, status: {todo: true, progress: false, done: false}}
    boardServiceSpy.editBoard.and.returnValue(of(updatedBoard))
    fixture.detectChanges()
    component.shiftToNextColumn()
    expect(boardService.editBoard).toHaveBeenCalledWith(updatedBoard)
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      editBoard(updatedBoard)
    )
  })
  it('checkAddToArchiveAndUpdate spec', () => {
    component.board=useBoard
    mockBoardsByDashboardId.setResult(useBoards.filter(dt=>dt.dashboardId===2))//3 todo
    mockStore.refreshState()
    fixture.detectChanges()
    component.checkAddToArchiveAndUpdate(useBoard)
    expect(component.archive).toBe(true)
  })
  it('checkAddToArchiveAndUpdate spec if false', () => {
    component.board=useBoards[4]
    mockBoardsByDashboardId.setResult(useBoards.filter(dt=>dt.dashboardId===5))//2 records
    mockStore.refreshState()
    fixture.detectChanges()
    component.checkAddToArchiveAndUpdate(useBoards[4])
    expect(component.archive).toBe(false)
  })

});
