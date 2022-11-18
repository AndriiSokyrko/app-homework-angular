import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {useComments, useSelectedColor} from "./mocks/comments";
import {Location} from "@angular/common";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {RouterTestingModule} from "@angular/router/testing";
import {CommentCardAddComponent} from "./comment-card-add/comment-card-add.component";
import {getCommentsByBoardId} from "../../../reducers/comment/comment.selectors";
import {CommentModel} from "../../../models/comment.model";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  let router :Router
  let routerAct:ActivatedRoute
  let location: Location
  let useColor=useSelectedColor

  let useBoard = useComments[0]

  let routes=[
    {path:'comment-add/:boardId/:dashboardId', component: CommentCardAddComponent}
  ]
  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers:[
        provideMockStore(),
        {provide: ActivatedRoute,useValue: {url:'',path:''}}
        ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});

    router = TestBed.inject(Router)
    routerAct = TestBed.inject(ActivatedRoute)

    location= TestBed.inject(Location)
    spyOn(router,'navigate')
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('addComment spec',()=>{
    component.boardId=84
    component.dashboardId=4
    component.addComment()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith(['comment-add',84,4],{relativeTo:routerAct})

  })
  it('ngOnInit spec',()=>{
    mockStore.overrideSelector(getCommentsByBoardId,useComments.filter(dt=>dt.boardId===91)) //2 records
    fixture.detectChanges()
    mockStore.select(getCommentsByBoardId,{id:91}).subscribe((dt: undefined| CommentModel)=>{
      expect(dt).toBeTruthy()
    })
  })
});
