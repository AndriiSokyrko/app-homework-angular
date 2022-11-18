import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import {HttpClient} from "@angular/common/http";
import {Store, StoreModule} from "@ngrx/store";
import {BoardService} from "../../../services/board/board.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {boardReducer} from "../../../reducers/board/board.reducer";
import {RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {useBoards, useSelectedColor} from "./mocks/boards";
import {BoardModel} from "../../../models/board.model";
import {of} from "rxjs";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {getColor} from "../../../reducers/color/color.selector";

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let service: BoardService
  let httpMock: HttpTestingController
  let httpClient: HttpClient
  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [ HttpClientTestingModule,
        StoreModule.forRoot({board: boardReducer}),
        RouterModule.forRoot([])],
      providers:[
        provideMockStore()
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    mockStore = TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and .callFake(()=>{})
    mockStore.overrideSelector(getColor, useSelectedColor)
    service =TestBed.inject(BoardService)
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changeColor should be selectedColor',()=>{
    fixture.detectChanges()
    expect(component.selectedColor).toEqual(useSelectedColor)
  })
  it('changeFieldName',()=>{
    //only title for field
    component.fieldName='title'
    fixture.detectChanges()
    component.changeFieldName('test')
    expect(component.fieldName).not.toBe('title')
  })
  it('changeSortName',()=>{
    //only title for field
    let sortName:string[] = ['asc','dsc']
    sortName.forEach(name=>{
      component.sortName=name
      component.filter=''
      fixture.detectChanges()
      expect(component.sortName).not.toBe('test')
    })
  })

  it('changeStrFilter should be filter',()=>{
    component.changeStrFilter('test1')
    fixture.detectChanges()
    expect(component.filter).toEqual('test1')
  })
  it('changeSortName should be item form sort array',()=>{
    let sortArray:{name:string,value:string}[]=[
      {name:'Name', value:'title'},
      {name:'Date of creation', value:'date'},
      {name:'Number of new task', value:'id'},
      {name:'In progress', value:'progress'},
      {name:'Done', value:'done'},
    ]
    sortArray.forEach(item=>{
      component.changeSortName(item.value)
      fixture.detectChanges()
      expect(component.sortName).toBe(item.value)
    })
  })
  it('changeFieldName should be fieldName',()=>{
    component.changeFieldName('title')
    expect(component.fieldName).toBe('title')
  })




});
