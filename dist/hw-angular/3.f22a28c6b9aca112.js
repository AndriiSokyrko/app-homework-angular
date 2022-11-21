"use strict";(self.webpackChunkhw_angular=self.webpackChunkhw_angular||[]).push([[3],{9003:(C,l,n)=>{n.r(l),n.d(l,{AddDashboardModule:()=>y});var i=n(7013),e=n(433),c=n(6448),m=n(262),u=n(2843),h=n(4004),o=n(8256),p=n(4914),s=n(9912),g=n(6895),v=n(5085);function b(t,d){if(1&t&&(o.TgZ(0,"p"),o._uU(1),o.qZA()),2&t){const r=o.oxw();o.xp6(1),o.Oqu(r.message)}}function D(t,d){1&t&&(o.TgZ(0,"div"),o._uU(1," Login is required. "),o.qZA())}function _(t,d){1&t&&(o.TgZ(0,"div"),o._uU(1," Login must be at least 4 characters long. "),o.qZA())}function A(t,d){if(1&t&&(o.TgZ(0,"div",11),o.YNc(1,D,2,0,"div",1),o.YNc(2,_,2,0,"div",1),o.qZA()),2&t){const r=o.oxw();o.xp6(1),o.Q6J("ngIf",null==r.formDashboard.controls.title.errors?null:r.formDashboard.controls.title.errors.required),o.xp6(1),o.Q6J("ngIf",null==r.formDashboard.controls.title.errors?null:r.formDashboard.controls.title.errors.minlength)}}function x(t,d){1&t&&(o.TgZ(0,"div"),o._uU(1," Login is required. "),o.qZA())}function M(t,d){1&t&&(o.TgZ(0,"div"),o._uU(1," Login must be at least 4 characters long. "),o.qZA())}function Z(t,d){if(1&t&&(o.TgZ(0,"div",11),o.YNc(1,x,2,0,"div",1),o.YNc(2,M,2,0,"div",1),o.qZA()),2&t){const r=o.oxw();o.xp6(1),o.Q6J("ngIf",null==r.formDashboard.controls.description.errors?null:r.formDashboard.controls.description.errors.required),o.xp6(1),o.Q6J("ngIf",null==r.formDashboard.controls.description.errors?null:r.formDashboard.controls.description.errors.minlength)}}const O=function(t){return{background:t}},T=[{path:"",component:(()=>{class t{constructor(r,a,f,w){this.dashboardService=r,this.store=a,this.ref=f,this.route=w,this.message="",this.formDashboard=new e.cw({title:new e.NI("",[e.kI.required,e.kI.minLength(5)]),description:new e.NI("",[e.kI.required,e.kI.minLength(5)])})}ngOnInit(){localStorage.getItem("selectedColor")&&(this.selectedColor=JSON.parse(localStorage.getItem("selectedColor")))}createDashboard(){return{title:this.formDashboard.controls.title.value,description:this.formDashboard.controls.description.value,date:(new Date).toLocaleDateString(),progress:!1,done:!1,archive:!1}}addDashboardStore(r){return this.store.dispatch((0,c.JR)(r))}onSubmit(){const r=this.createDashboard();return this.dashboardService.addDashboard(r).pipe((0,m.K)(()=>(0,u._)("Error 400!")),(0,h.U)(a=>a)).subscribe(a=>{this.store.dispatch((0,c.JR)(a)),this.route.navigate(["/dashboard"],{skipLocationChange:!1})})}}return t.\u0275fac=function(r){return new(r||t)(o.Y36(p.s),o.Y36(s.yh),o.Y36(o.sBO),o.Y36(i.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-dash-card-add"]],decls:20,vars:9,consts:[[1,"form-wrapper",3,"formGroup","ngSubmit"],[4,"ngIf"],[1,"top--wrapper"],["routerLink","/dashboard"],[1,"input-wrapper"],["for","title"],["id","title_id","type","text","formControlName","title"],["class","invalid",4,"ngIf"],["for","description"],["id","description_id","type","text","formControlName","description"],["type","submit",3,"disabled"],[1,"invalid"]],template:function(r,a){1&r&&(o.TgZ(0,"app-modal")(1,"form",0),o.NdJ("ngSubmit",function(){return a.onSubmit()}),o.YNc(2,b,2,1,"p",1),o.TgZ(3,"div",2)(4,"h1"),o._uU(5,"Create dashboard"),o.qZA(),o.TgZ(6,"a",3),o._uU(7,"\u2716"),o.qZA()(),o.TgZ(8,"div",4)(9,"label",5),o._uU(10,"Title dashboard: "),o.qZA(),o._UZ(11,"input",6),o.YNc(12,A,3,2,"div",7),o.qZA(),o.TgZ(13,"div",4)(14,"label",8),o._uU(15,"Description: "),o.qZA(),o._UZ(16,"input",9),o.YNc(17,Z,3,2,"div",7),o.qZA(),o.TgZ(18,"button",10),o._uU(19,"Submit"),o.qZA()()()),2&r&&(o.xp6(1),o.Akn(o.VKq(7,O,a.selectedColor[1])),o.Q6J("formGroup",a.formDashboard),o.xp6(1),o.Q6J("ngIf",null!==a.message),o.xp6(10),o.Q6J("ngIf",a.formDashboard.controls.title.invalid&&(a.formDashboard.controls.title.dirty||a.formDashboard.controls.title.touched)),o.xp6(5),o.Q6J("ngIf",a.formDashboard.controls.description.invalid&&(a.formDashboard.controls.description.dirty||a.formDashboard.controls.description.touched)),o.xp6(1),o.Q6J("disabled",!a.formDashboard.valid))},dependencies:[g.O5,e._Y,e.Fj,e.JJ,e.JL,e.sg,e.u,i.yS,v.z],styles:[".form-wrapper[_ngcontent-%COMP%]{padding:75px;width:600px;display:flex;flex-direction:column;align-items:center;margin:0 auto;background:#D9D9D9;border-radius:10px}.form-wrapper[_ngcontent-%COMP%]   .top--wrapper[_ngcontent-%COMP%]{display:flex;width:250px;justify-content:space-between;align-items:center;cursor:pointer}.form-wrapper[_ngcontent-%COMP%]   .top--wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:underline}.form-wrapper[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column}.form-wrapper[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:250px;margin-bottom:15px}.form-wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:50px;width:150px}.valid[_ngcontent-%COMP%]{color:green;border:1px solid green}.invalid[_ngcontent-%COMP%]{color:red;border:1px solid red}"],changeDetection:0}),t})()}];let y=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[i.Bz.forChild(T),i.Bz]}),t})()},5085:(C,l,n)=>{n.d(l,{z:()=>h});var i=n(9978),e=n(8256),c=n(9912);const m=function(o){return{background:o,opacity:.9}},u=["*"];let h=(()=>{class o{constructor(s){this.store=s,this.selectedColor=JSON.parse(localStorage.getItem("selectedColor"))}ngOnInit(){this.store.select(i.L).subscribe(s=>{this.selectedColor=s})}}return o.\u0275fac=function(s){return new(s||o)(e.Y36(c.yh))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-modal"]],inputs:{selectedColor:"selectedColor"},ngContentSelectors:u,decls:2,vars:4,consts:[[1,"wrapper-modal"]],template:function(s,g){1&s&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.qZA()),2&s&&e.Akn(e.VKq(2,m,g.selectedColor[2]))},styles:[".wrapper-modal[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.4);display:flex;justify-content:center;align-items:center}.hide[_ngcontent-%COMP%]{display:none}"],changeDetection:0}),o})()}}]);