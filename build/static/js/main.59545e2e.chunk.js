(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),l=function(e){var n=e.newSearch,t=e.handleSearchChange;return r.a.createElement("div",null,"Filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:a,type:"text"})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:u,onChange:c,type:"number"})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.person,t=e.onClick;return r.a.createElement("li",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t},"delete"))},s=t(3),d=t.n(s),f="/api/persons",h=function(){return d.a.get(f).then((function(e){return e.data}))},b=function(e){return d.a.post(f,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){var n=e.successMessage,t=e.errorMessage;return r.a.createElement(r.a.Fragment,null,n&&r.a.createElement("div",{className:"success"},n),t&&r.a.createElement("div",{className:"error"},t))},g=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),d=s[0],f=s[1],g=Object(a.useState)(""),C=Object(o.a)(g,2),w=C[0],j=C[1],O=Object(a.useState)(""),S=Object(o.a)(O,2),N=S[0],k=S[1],y=Object(a.useState)(!0),U=Object(o.a)(y,2),M=U[0],P=U[1],T=Object(a.useState)(null),x=Object(o.a)(T,2),A=x[0],D=x[1],F=Object(a.useState)(null),I=Object(o.a)(F,2),J=I[0],B=I[1];Object(a.useEffect)((function(){h().then((function(e){u(e)}))}),[]);var q=M?t:t.filter((function(e){return e.name.toUpperCase().includes(d.toUpperCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{successMessage:A,errorMessage:J}),r.a.createElement(l,{newSearch:d,handleSearchChange:function(e){f(e.target.value),0===e.target.value.length?P(!0):P(!1)}}),r.a.createElement("h2",null,"Add a new..."),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n={name:w,number:N};t.find((function(e){return e.name.toUpperCase()===w.toUpperCase()}))?function(){if(!window.confirm("".concat(w," is already added to phonebook, replace old number with a new one?")))return j(""),void k("");!function(){var e=t.find((function(e){return e.name.toUpperCase()===w.toUpperCase()})).id;v(e,n).then((function(n){u(t.map((function(t){return t.id!==e?t:n}))),j(""),k(""),D("Changed ".concat(w,"'s number")),setTimeout((function(){D(null)}),3e3)})).catch((function(n){B("Info about ".concat(w," has already been removed from the server")),setTimeout((function(){B(null)}),3e3),u(t.filter((function(n){return n.id!==e}))),j(""),k("")}))}()}():b(n).then((function(e){u(t.concat(e)),j(""),k(""),D("Added ".concat(w)),setTimeout((function(){D(null)}),3e3)}))},newName:w,handleNameChange:function(e){j(e.target.value)},newNumber:N,handleNumberChange:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("ul",null,q.map((function(e){return r.a.createElement(m,{key:e.id,person:e,onClick:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&(p(e),u(t.filter((function(n){return n.id!==e}))))}(e.id)}})}))))};t(36);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.59545e2e.chunk.js.map