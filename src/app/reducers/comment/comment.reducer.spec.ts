import { initState, commentReducer } from './comment.reducer';
import * as actions from './comment.actions';
import { useComments} from "../mocks/boards";

describe('Upload Reducer', () => {
  let result
  let init
  beforeEach(async ()=>{
    init= [...initState, ...useComments]
  })
  describe('default', () => {
    it('initComment', () => {
      const action = actions.initComment({comments:useComments} );
      const result = commentReducer(initState, action);
      expect(result.length).toBe(3);
    });
  });

  describe('createComment', () => {
    it('should create the createComment', () => {
      const newComment = {...useComments[0], title:'new',type: '[Comment] create comment'}
      const action = actions.createComment(newComment );
      const result = commentReducer(init, action);
      expect(result.length).toBe(4)
    });
  });
  describe('editComment', () => {
    it('should create the editComment', () => {
      const editComment = {...useComments[0], text:'new text',type: '[Comment] edit  comment'}
      const action = actions.editComment(editComment);
      const result = commentReducer(init, action);
      expect(result[0] ).toEqual(editComment)
    });
  });

  describe('deleteComment', () => {
    it('should create the deleteComment', () => {
      const action = actions.deleteComment({id:2} );
      const result = commentReducer(init, action);
      expect(result.length).toBe(2)
    });
  });

})
