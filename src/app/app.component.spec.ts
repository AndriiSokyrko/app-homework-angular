import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {Router, RouterModule} from "@angular/router";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "./reducers/app.state";
import {getColor} from "./reducers/color/color.selector";
import {useSelectedColor, useUsers} from "./components/feature/login/mocks/users";
import {getUsers} from "./reducers/user/user.selectors";
import {AuthService} from "./services/auth/auth.service";
import {Location} from "@angular/common";
import {RegistrationComponent} from "./components/feature/registration/registration.component";
import {DashboardService} from "./services/dashboard/dashboard.service";
import {BoardService} from "./services/board/board.service";
import {CommentService} from "./services/comment/comment.service";
import {changeColor} from "./reducers/color/color.action";
import {of} from "rxjs";
import {useDashboards} from "./components/feature/dashboard/mocks/dashboards";
import {useBoards} from "./pipes/mocks/boards";
import {useComments} from "./components/feature/comment/mocks/comments";
import {initDashboard} from "./reducers/dashboard/dashboard.actions";
import {initBoard} from "./reducers/board/board.actions";
import {initComment} from "./reducers/comment/comment.actions";
import {initUsers} from "./reducers/user/user.actions";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: AuthService
  let dashboardService: DashboardService
  let boardService: BoardService
  let commentService: CommentService
  let mockStore:MockStore<AppState>
  let mockSelectorColor
  let router:Router
  let location: Location

  const dashboardServiceSpy = jasmine.createSpyObj('dashboardService',['initDashboard'])
  const boardServiceSpy = jasmine.createSpyObj('boardService',['initBoard'])
  const commentServiceSpy = jasmine.createSpyObj('commentService',['initComment'])
  const userServiceSpy = jasmine.createSpyObj('authService',['getUsers'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterModule
      ],
      providers:[
        provideMockStore(),
        {provide: DashboardService,useValue: dashboardServiceSpy},
        {provide: BoardService,useValue: boardServiceSpy},
        {provide: CommentService,useValue: commentServiceSpy},
        {provide: AuthService,useValue: userServiceSpy},
      ]
    }).compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockStore.overrideSelector(getColor,useSelectedColor)
    mockSelectorColor = mockStore.overrideSelector(getColor,['#1','#2','#3'])

    userService= TestBed.inject(AuthService)
    dashboardService= TestBed.inject(DashboardService)
    boardService= TestBed.inject(BoardService)
    commentService= TestBed.inject(CommentService)

    userServiceSpy.getUsers.and.returnValue(of(useUsers))
    dashboardServiceSpy.initDashboard.and.returnValue(of(useDashboards))
    boardServiceSpy.initBoard.and.returnValue(of(useBoards))
    commentServiceSpy.initComment.and.returnValue(of(useComments))

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router,'navigate')

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.selectedColor = ['#1','#2','#3']
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('selectedColor localstorage', () => {
    spyOn(localStorage, 'getItem')
      .and.callFake(()=>JSON.stringify(['#1','#2','#3']));
    fixture.detectChanges()
    component.ngOnInit()
    expect(mockStore.dispatch).toHaveBeenCalledWith( changeColor({color:['#1','#2','#3']}))
  });
  it('selector SelectorColor',()=>{
    mockSelectorColor.setResult(['#1','#2','#3'])
    mockStore.refreshState()
    expect(component.selectedColor).toEqual(['#1','#2','#3'])
  })

  it('selectedColor localstorage is null', () => {
    spyOn(localStorage, 'getItem')
      .and.callFake(()=>null);
    fixture.detectChanges()
    component.ngOnInit()
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(changeColor({color:['#1','#2','#3']}))
  });

  it('initDashboard',()=>{
    component.ngOnInit()
    expect(mockStore.dispatch).toHaveBeenCalledWith(initDashboard({dashboards: useDashboards}))
  })

  it('initBoard',()=>{
    component.ngOnInit()
    expect(mockStore.dispatch).toHaveBeenCalledWith(initBoard({boards: useBoards}))
  })

  it('initComment',()=>{
    component.ngOnInit()
    expect(mockStore.dispatch).toHaveBeenCalledWith(initComment({comments: useComments}))
  })
  it('initUsers',()=>{
    component.ngOnInit()
    expect(mockStore.dispatch).toHaveBeenCalledWith(initUsers({users: useUsers}))
  })
});
