import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { CommentCardComponent } from './comment-card.component';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommentService} from "../../../../services/comment/comment.service";
import {Location} from "@angular/common";
import { useSelectedColor} from "../../board/mocks/boards";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../reducers/app.state";
import {CommentCardAddComponent} from "../comment-card-add/comment-card-add.component";
import {CommentCardEditComponent} from "../comment-card-edit/comment-card-edit.component";
import {useComments} from "../mocks/comments";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {deleteComment} from "../../../../reducers/comment/comment.actions";
import {of} from "rxjs";
import * as url from "url";

describe('CommentCardComponent', () => {
  let component: CommentCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;
  let commentService: CommentService

  let router :Router
  let routerAct: ActivatedRoute
  let location: Location
  let useColor=useSelectedColor

  let useBoard = useComments[0]

  let routes=[
    {path:'comment-edit/:id', component: CommentCardEditComponent},
    {path:'comment-add/:boardId/:dashboardId', component: CommentCardAddComponent}
  ]
  let mockStore: MockStore<AppState>

  const commentServiceSpy = jasmine.createSpyObj('commentService',['removeComment'])

  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [ CommentCardComponent ],
      imports: [
      HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers:[
        provideMockStore(),
        {provide: CommentService, useValue: commentServiceSpy},
        {provide: ActivatedRoute, useValue: {url:'',path:''}}
        ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    commentService= TestBed.inject(CommentService)

    router = TestBed.inject(Router)
    routerAct = TestBed.inject(ActivatedRoute)
    location= TestBed.inject(Location)
    spyOn(router, 'navigate')
   fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    component.comment=useComments[2]
    fixture.detectChanges()
  });
  it('test service', ()=>{
    expect(commentService).toBeTruthy()
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('navigate comment-add',()=> {
    component.commentAdd()
    expect(router.navigate).toHaveBeenCalledWith(['comment-add', 91, 4], {relativeTo: routerAct})
  })

  it('navigate comment-edit',()=>{
    component.commentEdit()
    expect(router.navigate).toHaveBeenCalledWith(['comment-edit',13],{relativeTo: routerAct})
  })

  it('commentDelete spec',()=>{
    commentServiceSpy.removeComment.and.returnValue(of(useComments[2]))
    fixture.detectChanges()
    component.commentDelete()
    commentService.removeComment(useComments[2].id).subscribe(dt=>{
      expect(mockStore.dispatch).toHaveBeenCalledOnceWith(deleteComment({id:useComments[2].id}))
    })
  })

});
