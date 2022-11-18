import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardEditComponent } from './comment-card-edit.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { StoreModule} from "@ngrx/store";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CommentService} from "../../../../services/comment/comment.service";
import {commentReducer} from "../../../../reducers/comment/comment.reducer";
import {Router, RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Location} from "@angular/common";
import {useBoards, useSelectedColor} from "../../board/mocks/boards";
import {BoardComponent} from "../../board/board.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../reducers/app.state";
import {useComments} from "../mocks/comments";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BoardService} from "../../../../services/board/board.service";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {createComment, editComment} from "../../../../reducers/comment/comment.actions";
import {getCommentById} from "../../../../reducers/comment/comment.selectors";
import {CommentModel} from "../../../../models/comment.model";

describe('CommentCardEditComponent', () => {
  let component: CommentCardEditComponent;
  let fixture: ComponentFixture<CommentCardEditComponent>;
  let commentService: CommentService;

  let router :Router
  let location: Location

  let useBoard = useComments[2]

  let routes=[
    {path:'board/:id', component: BoardComponent}
  ]
  let mockStore: MockStore<AppState>

  const commentServiceSpy = jasmine.createSpyObj('commentService',['editComment'])


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCardEditComponent ],
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

    commentService= TestBed.inject(CommentService);

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router, 'navigate')
    fixture = TestBed.createComponent(CommentCardEditComponent);
    component = fixture.componentInstance;
    component.comment= useComments[2]
    component.selectedColor= useSelectedColor
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit',()=>{
    mockStore.overrideSelector(getCommentById,useComments[2])
    fixture.detectChanges()
    mockStore.select(getCommentById,{id:13}).subscribe((dt: undefined| CommentModel)=>{
      expect(dt).toBeTruthy()

    })
  })

  it('onSubmit spec',()=> {
    component.comment=useComments[2]
    component.textInput='test1'
    const newComment = {
     ...useComments[2],
      "text": 'test1',
      "date": new Date().toLocaleDateString()
    }
    commentServiceSpy.editComment.and.returnValue(of(newComment))
    fixture.detectChanges()
    component.onSubmit()
    commentService.editComment(newComment).subscribe(dt => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(editComment(newComment))
      expect(router.navigate).toHaveBeenCalledWith(['board',4])

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
