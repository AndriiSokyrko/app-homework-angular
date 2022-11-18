import { initState, dashboardReducer } from './dashboard.reducer';
import * as actions from './dashboard.actions';
import {useBoards, useDashboards} from "../mocks/boards";
import {BoardModel} from "../../models/board.model";

describe('Upload Reducer', () => {
  let result
  let init
  beforeEach(async ()=>{
    init= [...initState, ...useDashboards]
  })
  describe('default', () => {
    it('initDashboard', () => {
      const action = actions.initDashboard({dashboards:useDashboards} );
      const result = dashboardReducer(initState, action);
      expect(result.length).toBe(2);
    });
  });

  describe('createDashboard', () => {
    it('should create the createBoard', () => {
      const newBoard = {...useDashboards[0], title:'new',type: '[Board] create  board'}
      const action = actions.createDashboard(newBoard );
      const result = dashboardReducer(init, action);
      expect(result.length).toBe(3)
    });
  });
  describe('editDashboard', () => {
    it('should create the createBoard', () => {
      const editBoard = {...useDashboards[0], title:'new',type: '[Dashboard] edit dashboard' }
      const action = actions.editDashboard(editBoard );
      const result = dashboardReducer(init, action);
      expect(result[0] ).toEqual(editBoard)
    });
  });

  describe('deleteDashboard', () => {
    it('should create the deleteDashboard', () => {
      const action = actions.deleteDashboard({id:2} );
      const result = dashboardReducer(init, action);
      expect(result.length).toBe(1)
    });
  });

})
