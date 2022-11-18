import {ComponentFixture,  TestBed} from '@angular/core/testing';

import { BoardCardEditComponent } from './board-card-edit.component';
import {BoardService} from "../../../../services/board/board.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {BoardModel} from "../../../../models/board.model";
import {of} from "rxjs";
import {Location} from "@angular/common";
import {useBoards, useSelectedColor} from "../mocks/boards";
import {BoardComponent} from "../board.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../reducers/app.state";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {getBoardById, getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('BoardCardEditComponent', () => {
  let component: BoardCardEditComponent;
  let fixture: ComponentFixture<BoardCardEditComponent>;
  let boardService: BoardService

  let router :Router
  let location: Location

  let useBoard = useBoards[0]

  let routes=[
    {path:'board/:id', component: BoardComponent}
  ]
  let mockStore: MockStore<AppState>
  let mockGetBoardById

  const boardServiceSpy = jasmine.createSpyObj('boardService',['editBoard'])

  beforeEach(  async () => {
    await TestBed.configureTestingModule({
      declarations:[BoardCardEditComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        provideMockStore(),
        {provide: BoardService, useValue: boardServiceSpy},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockGetBoardById  = mockStore.overrideSelector(getBoardById,useBoard)
    boardService =TestBed.inject(BoardService)

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router,'navigate')

    fixture = TestBed.createComponent(BoardCardEditComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    fixture.detectChanges()
    router.initialNavigation()
  });

  it('test service', ()=>{
      expect(component).toBeTruthy()
  })

  it('ngOnInit ', ()=>{
    // component.selectedColor=undefined
    spyOn(Object.getPrototypeOf(window.localStorage),'getItem').and.returnValue(null)
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.selectedColor).toEqual(useSelectedColor)
  })
  it('ngOnInit ', ()=>{
    // component.selectedColor=undefined
    spyOn(Object.getPrototypeOf(window.localStorage),'getItem').and.returnValue(JSON.stringify(['#1','#2','#3']))
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.selectedColor).toEqual(['#1','#2','#3'])
  })


  it('ngOnInit',()=>{
    component.id=5
    mockGetBoardById.setResult(useBoard)
    mockStore.refreshState()
    fixture.detectChanges()
    component.ngOnInit()
    mockStore.select(
      getBoardById, {id: 5}
    ).subscribe(dt => {
      expect(dt).toBeTruthy()

      component.formBoard.controls['title'].setValue(dt.title)
      fixture.detectChanges()
      const elTitle=fixture.debugElement.query(By.css('#title_id'))
      fixture.detectChanges()
      expect(elTitle.nativeElement.value).toBe(useBoard.title)

      component.formBoard.controls['description'].setValue(dt.description)
      fixture.detectChanges()
      const elDescription=fixture.debugElement.query(By.css('#description_id'))
      fixture.detectChanges()
      expect(elDescription.nativeElement.value).toBe(useBoard.description)

    })

  })

  it('changeBoard spec',()=>{
    component.formBoard.reset()
    fixture.detectChanges()
    component.id=5
    component.formBoard.controls['title'].setValue('test1')
    fixture.debugElement.query(By.css('#title_id')).nativeElement.value='test1'
    component.dashboardId=2
    component.formBoard.controls['description'].setValue('description1')
    fixture.debugElement.query(By.css('#description_id')).nativeElement.value='description1'
    component.formBoard.controls['status'].setValue('done')
    fixture.detectChanges()
    const board:BoardModel = {
      id:5,
      title: 'test1',
      description: 'description1',
      dashboardId: 2,
      date: new Date().toLocaleDateString(),
      status: {
        todo: false,
        progress:false,
        done:  true
      }
    }
    const changedBoard:BoardModel = component.changeBoard()
    expect(board).toEqual( component.changeBoard() )
  })

  it('onSubmit spec',()=>{
    component.formBoard.reset()
    fixture.detectChanges()
    component.id=5
    component.dashboardId=2
    component.formBoard.controls['title'].setValue('test1')
    component.formBoard.controls['description'].setValue('description1')
    component.formBoard.controls['status'].setValue('done')
    useBoard = {...useBoard, title:'test1', description:'description1', date:new Date().toLocaleDateString(),
    status:{
      todo:false,
      progress:false,
      done:true
    }}
    fixture.detectChanges()
    boardServiceSpy.editBoard.and.returnValue(of(useBoard))
    fixture.detectChanges()
    component.onSubmit()
    expect( boardService.editBoard).toHaveBeenCalledWith(useBoard)
    boardService.editBoard(useBoard).subscribe(dt=>{
      expect(dt).toEqual(useBoard)
    })
      expect(router.navigate).toHaveBeenCalledWith(['/board',2]);
  })

});
