import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardCardAddComponent } from './board-card-add.component';
import {BoardService} from "../../../../services/board/board.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {useBoards, useSelectedColor} from "../mocks/boards";
import {BoardCardEditComponent} from "../board-card-edit/board-card-edit.component";
import {BoardComponent} from "../board.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../reducers/app.state";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BoardModel} from "../../../../models/board.model";
import {of} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('BoardCardAddComponent', () => {
  let component: BoardCardAddComponent;
  let fixture: ComponentFixture<BoardCardAddComponent>;
  let boardService:  BoardService

  let router :Router
  let location: Location

  let useBoard = useBoards[0]

  let routes=[
    {path:'edit-board/:id', component: BoardCardEditComponent},
    {path:'board/:id', component: BoardComponent}
  ]
  let mockStore: MockStore<AppState>

  const boardServiceSpy = jasmine.createSpyObj('boardService',['removeBoard','editBoard','addBoard'])

  beforeEach(  async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardCardAddComponent],
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

    boardService =TestBed.inject(BoardService)

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)

    fixture = TestBed.createComponent(BoardCardAddComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    router.initialNavigation()
  });

  it('test service', ()=>{
    expect(boardService).toBeTruthy()
  })
  it('ngOnInit ', ()=>{
    // component.selectedColor=undefined
    spyOn(Object.getPrototypeOf(window.localStorage),'getItem').and.returnValue(null)
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.selectedColor).toBe(useSelectedColor)
  })
  it('ngOnInit ', ()=>{
    // component.selectedColor=undefined
    spyOn(Object.getPrototypeOf(window.localStorage),'getItem').and.returnValue(JSON.stringify(['#1','#2','#3']))
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.selectedColor).toEqual(['#1','#2','#3'])
  })
  it('onSubmit spec',()=>{
    component.formBoard.controls['status'].setValue('todo')
    component.formBoard.controls['title'].setValue('test1')
    component.formBoard.controls['description'].setValue('description1')
    fixture.detectChanges()
    const checkRadio = component.formBoard.controls['status'].value
    const board:BoardModel = {
      title:component.formBoard.controls['title'].value,
      description:component.formBoard.controls['description'].value,
      dashboardId: Number(component.dashboardId),
      date: new Date().toLocaleDateString(),
      status: {
        todo: checkRadio==='todo'?true:false,
        progress: checkRadio==='progress'?true:false,
        done: checkRadio==='done'?true:false
      }
    }
    boardServiceSpy.addBoard.and.returnValue(of(board))
    component.onSubmit()
    expect(boardService.addBoard).toHaveBeenCalledWith(board)

  })

});
