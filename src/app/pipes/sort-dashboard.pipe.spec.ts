import { SortDashboardPipe } from './sort-dashboard.pipe';
import {DashboardModel} from "../models/dashboard.model";

describe('SortDashboardPipe', () => {
  let sortDashoardPipe:SortDashboardPipe
  let dashboards: DashboardModel[]
  beforeEach(()=>{
    sortDashoardPipe = new SortDashboardPipe()
    dashboards = [
      {
        "id": 1,
        "title": 'string',
        "description": 'string' ,
        "date": 'string',
        "progress": true,
        "done": false,
        "archive":false
      },
      {
        "id": 2,
        "title": 'string',
        "description": 'string' ,
        "date": 'string',
        "progress": true,
        "done": false,
        "archive":false
      }
    ]
  })

  it('create an instance', () => {
    expect(sortDashoardPipe).toBeTruthy();
  });

  it('sort by progress', () => {
    expect(sortDashoardPipe.transform(dashboards,'asc','progress')).toEqual(
      dashboards
      .filter(item => typeof item["progress"] === 'boolean')
      .sort((a, b) => (a['progress'] !== b['progress']) ? 0 : 1)
    );
  });
  it('sort by done', () => {
    expect(sortDashoardPipe.transform(dashboards,'asc','done')).toEqual(
      dashboards
        .filter(item => typeof item['done'] === 'boolean')
        .sort((a, b) => !(a['done'] !== b['done']) ? 0 : 1)
    );
  });
  it('sort by date', () => {
    expect(sortDashoardPipe.transform(dashboards,'asc','date')).toEqual(
      dashboards
        .filter(item => typeof item['date'] === 'string')
        .sort((a, b) => Number(a['date']) - Number(b['date'] ))
    );
  });
  it('sort by title', () => {
    expect(sortDashoardPipe.transform(dashboards,'asc','title')).toEqual(
      dashboards
        .sort((a, b) => {
          if (a['title'] < b['title']) return -1;
          else if (a['title'] > b['title']) return 1;
          else return 0;
        })
    );
  });

  it('sort by id or title', () => {
    expect(sortDashoardPipe.transform(dashboards,'asc','title')).toEqual(
      dashboards
        .sort((a, b) => {
          if (a['title'] < b['title']) return -1;
          else if (a['title'] > b['title']) return 1;
          else return 0;
        })
    );
  });

  it('sort by boolean', () => {
    expect(sortDashoardPipe.transform(dashboards,'asc','id')).toEqual(
      dashboards
        .sort((a, b) => !(a['id'] !== b['id']) ? 0 : 1)
    )})

});
