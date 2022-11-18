import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardAddComponent } from './comment-card-add.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { StoreModule} from "@ngrx/store";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CommentService} from "../../../../services/comment/comment.service";
import {commentReducer} from "../../../../reducers/comment/comment.reducer";
import {Router, RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Location} from "@angular/common";
import {useBoards} from "../../board/mocks/boards";
import {BoardComponent} from "../../board/board.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../reducers/app.state";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BoardService} from "../../../../services/board/board.service";
import {useSelectedColor} from "../mocks/comments";
import {CommentModel} from "../../../../models/comment.model";
import {createComment} from "../../../../reducers/comment/comment.actions"
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
describe('CommentCardAddComponent', () => {
  let component: CommentCardAddComponent;
  let fixture: ComponentFixture<CommentCardAddComponent>;
  let commentService: CommentService

  let router :Router
  let location: Location

  let useBoard = useBoards[0]

  let routes=[
    {path:'board/:id', component: BoardComponent}
  ]
  let mockStore: MockStore<AppState>

  const commentServiceSpy = jasmine.createSpyObj('commentService',['addComment'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCardAddComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        provideMockStore(),
        {provide: CommentService, useValue: commentServiceSpy},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});

    commentService =TestBed.inject(CommentService)

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)

    fixture = TestBed.createComponent(CommentCardAddComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    fixture.detectChanges()
    router.initialNavigation()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('newComment spec',()=>{
    const newComment:CommentModel = component.newComment()
    expect(newComment).toBeTruthy()
   })
  it('onSubmit spec',()=> {
    const newComment = {
      "boardId": 2,
      "dashboardId": 25,
      "text": 'test1',
      "userId": 10,
      "date": new Date().toLocaleDateString()
    }
    commentServiceSpy.addComment.and.returnValue(of(newComment))
    fixture.detectChanges()
    component.onSubmit()
    commentService.addComment(newComment).subscribe(dt => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(createComment(newComment))
      router.navigate(['/board', 2]).then(() => {
        expect(location.path()).toBe('/board/2');
      })
    })
  })
  it('onChange spec',()=> {
    fixture.nativeElement.querySelector('#text_id').value = 'test'
    fixture.detectChanges()
    const val = fixture.debugElement.query(By.css('#text_id')).nativeElement.value
    fixture.detectChanges()
    component.onChange(val)
    fixture.detectChanges()
    expect(component.textInput).toBe('test')
  })
});
