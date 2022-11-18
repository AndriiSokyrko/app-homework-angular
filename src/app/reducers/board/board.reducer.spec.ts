import { initState, boardReducer } from './board.reducer';
import * as actions from './board.actions';
import {useBoards} from "../mocks/boards";
import {BoardModel} from "../../models/board.model";

describe('Upload Reducer', () => {
  let result
  let init
  beforeEach(async ()=>{
    init= [...initState, ...useBoards]
  })
  describe('default', () => {
    it('initBoard', () => {
      const newBoards = [{...useBoards[0],title:'test1'},{...useBoards[1],title:'test2'}]
      const action = actions.initBoard({boards:newBoards} );
      const result = boardReducer(initState, action);
      expect(result.length).toBe(2);
    });
  });

  describe('createBoard', () => {
    it('should create the createBoard', () => {
      const newBoard = {...useBoards[0], title:'new',type: '[Board] create  board'}
      const action = actions.createBoard(newBoard );
      const result = boardReducer(init, action);
      expect(result.length).toBe(6)
    });
  });
  describe('editBoard', () => {
    it('should create the createBoard', () => {
      const editBoard = {...useBoards[0], title:'edit', type: '[Board] edit  board'}
      const action = actions.editBoard(editBoard );
      const result = boardReducer(init, action);
      expect(result[0]).toEqual(editBoard);
    });
  });
  describe('deleteBoard', () => {
    it('should create the createBoard', () => {
      const action = actions.deleteBoard({id:5} );
      const result = boardReducer(init, action);
      expect(result.length).toBe(4)
    });
  });

})
