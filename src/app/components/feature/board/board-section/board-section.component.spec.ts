import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSectionComponent } from './board-section.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FilterBoardPipe} from "../../../../pipes/filter-board.pipe";
import {SortBoardPipe} from "../../../../pipes/sort-board.pipe";
import{useBoards, useSelectedColor} from "../mocks/boards";
import {MemoizedSelector, Store, StoreModule} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";
import {BoardComponent} from "../board.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BoardModel} from "../../../../models/board.model";
import {getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {map} from "rxjs";
import * as fromReducer from '../../../../reducers'
import {AppState} from "../../../../reducers/app.state";
import {getColor} from "../../../../reducers/color/color.selector";
describe('BoardSectionComponent', () => {
  let component: BoardSectionComponent;
  let fixture: ComponentFixture<BoardSectionComponent>;
  let mockStore :MockStore<AppState>
  let initState: BoardModel[]=useBoards
  let mockSelectors
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardSectionComponent ,
        FilterBoardPipe,
        SortBoardPipe
      ],
      imports:[
        RouterTestingModule.withRoutes([{path:'board',component:BoardComponent}]),
      ],
      providers:[provideMockStore()],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore);
    mockSelectors = mockStore.overrideSelector(getBoardsByDashboardId, useBoards);
    mockSelectors = mockStore.overrideSelector(getColor, useSelectedColor);
    fixture = TestBed.createComponent(BoardSectionComponent);
    component = fixture.componentInstance;
    component.selectedColor=useSelectedColor
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit should create boards', () => {
    component.ngOnInit()
    const stubBoards = useBoards.filter(item=>item.dashboardId===2&&item.status.done===true)
    mockSelectors.setResult(stubBoards)
    mockStore.refreshState()
    fixture.detectChanges()
    mockStore.select( getBoardsByDashboardId,{id:2}).subscribe(item=> {
      expect(item.length).toBe(5)
    })

  });
  it('changeColor emit',()=>{
     const event = spyOn(component.setNewColor,'emit')
      component.changeColor(useSelectedColor)
      expect(event).toHaveBeenCalledWith(useSelectedColor)
    }
  )
  it('updatePageFn emit',()=>{
     const event = spyOn(component.updatePage,'emit')
      component.updatePageFn()
      expect(event).toHaveBeenCalled()
    }
  )
  it('archiveChange',()=>{
    const event = spyOn(component.messageArchiveFn,'emit')
    component.messageArchive()
    expect(event).toHaveBeenCalled()
  })
});
