Deploy
ONLY LOOKOVER isn't ALLOWED register or 
login name1
password name1
https://fanciful-mermaid-0e2b66.netlify.app
For correct work you need run local json-server from directory inside project

Json-server
go cd/json-server
run:
json-server --watch db.json --routes routes.json


frontend angular
next terminal
hw-angular
ng serve
Description:

---Components:
    -core:
      -top-menu
    -feature:
      -board:
        -card
        -add-board
        -edit-board
      -dashboard
        -card
        -add-dashboard
        -edit-dashboard
      -login
      -register
      -not-found
    -shared:
      -button
      -input
      -modal
      -select
--guards
  -auth-guard
--models
  -board.model
  -dashboard.model
  -user.model
--pipes:
  -filter-board
  -sort-board
  -sort-dashboard
--reducers:
  -board
    -action
    -reducer
    -selector
  -dashboard
    -action
    -reducer
    -selector
  -users
    -action
    -reducer
    -selector
--services:
  -auth
  -board
  -dashboard



      
