(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{110:function(e,t,a){e.exports=a(234)},115:function(e,t,a){},116:function(e,t,a){},220:function(e,t,a){},224:function(e,t,a){},225:function(e,t,a){e.exports=a.p+"static/media/logo.e356eb48.png"},226:function(e,t,a){e.exports=a.p+"static/media/AcademicaFrontal.63ac3fde.jpg"},227:function(e,t,a){e.exports=a.p+"static/media/AcademicaLateral.6dbe4d47.jpg"},228:function(e,t,a){e.exports=a.p+"static/media/EdificioB.08601732.jpg"},229:function(e,t,a){e.exports=a.p+"static/media/AcademicaAtardecer.38efadb0.jpeg"},234:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),l=a(30),r=a.n(l),c=(a(115),a(116),a(96)),o=a(12),s=a(266),d=a(260),m=a(269),u=a(272),p=a(9),E=a(69),g=a.n(E),b=(a(220),function(e){var t=Object(i.useState)({autoplay:e.autoplay,arrows:e.arrows,arrowsScroll:1,autoplaySpeed:e.speed}),a=Object(p.a)(t,2),l=a[0];a[1];return n.a.createElement("div",{style:{zIndex:"-1"}},e.inicio?n.a.createElement(g.a,Object.assign({className:"slider"},l),e.images.map(function(e){return n.a.createElement("div",{className:"div",key:e.id},n.a.createElement("img",{className:"slider_images",src:e.image,height:"500",alt:e.description}))})):n.a.createElement(g.a,l,e.images.map(function(e){return n.a.createElement("div",{key:e.id},n.a.createElement("img",{src:e.image,alt:e.description}))})))}),f=a(268),x=a(270),v=a(271),h=a(94),y=a.n(h),j=Object(s.a)(function(e){return Object(d.a)({text:{display:"inline-block",position:"relative",letterSpacing:"2px",margin:"5px auto",lineHeight:"9"},img:{display:"inline-block",position:"absolute",top:"-3px",marginLeft:"20px"},divInicio:{display:"block",position:"absolute",marginLeft:"86%"}})}),w=function(e){var t=j();Object(i.useEffect)(function(){c(e.logeado)},[]);var a=Object(i.useState)(),l=Object(p.a)(a,2),r=l[0],c=l[1];return n.a.createElement("div",null,n.a.createElement(m.a,null,n.a.createElement(f.a,{style:{background:"#2A314b",height:"120px"},position:"static"},n.a.createElement(x.a,null,r?n.a.createElement(v.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},n.a.createElement(y.a,null)):n.a.createElement("h1",{className:t.text},"Sistema de Gesti\xf3n de reservas de Laboratorios de Aprendizaje")),r?n.a.createElement("div",null,n.a.createElement(u.a,{className:t.button,color:"inherit"},"Cerrar sesion")):n.a.createElement("div",null))))},k=(a(224),a(95)),A=a.n(k),N=a(265),O=a(273),S=function(e){return n.a.createElement("div",null,n.a.createElement("hr",{className:"linea_horizontal"}),n.a.createElement("footer",{className:"footer_content"},n.a.createElement("div",{style:{width:"70%",display:"inline-block"}},n.a.createElement("img",{className:"img",src:a(225),alt:"Logo del grupo de trabajo",height:"80",width:"85"}),n.a.createElement("p",{className:"title"},"Code Geek App")),n.a.createElement("div",{style:{display:"inline-block",width:"30%",postion:"fixed"}},n.a.createElement(N.a,{title:"Enviar correo"},n.a.createElement(O.a,{onClick:function(){console.log("Mensaje prueba")},style:{display:"inline-block",margin:"10px",marginLeft:"80%",cursor:"pointer",postion:"fixed"}},n.a.createElement(A.a,null))))))},L=Object(s.a)(function(e){return Object(d.a)({text:{display:"block",textAlign:"justify",width:"89%",margin:"8% 5%",position:"relative",fontSize:"24px",fontFamily:"Monaco"},div:{display:"inline-block",position:"absolute",width:"40%",zIndex:"10",margin:"3% 5%",borderRadius:"30px",boxShadow:"0px 0px 10px 1px #434343"},button:{display:"block",position:"absolute",width:"30%"}})}),z=function(){var e=L(),t=[{id:"1",title:"Academica Frontal",description:"Academica de frente",image:a(226)},{id:"2",title:"Academica Lateral",description:"Academica de lado izquierdo",image:a(227)},{id:"3",title:"Edificio B",description:"Edificio B de frente",image:a(228)},{id:"4",title:"Academica atardecer",description:"Academica de atardecer",image:a(229)}];return n.a.createElement("div",null,n.a.createElement(w,{logeado:!1}),n.a.createElement("div",{className:e.div},n.a.createElement("p",{className:e.text},"Vision",n.a.createElement("br",null),n.a.createElement("br",null),"Generar un sistema capaz de poder llevar a cabo el mantenimiento de los horarios de laboratorios"),n.a.createElement(m.a,{textAlign:"center"},n.a.createElement(u.a,{className:e.button,variant:"outlined",color:"inherit"},"Iniciar Sesion"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement(u.a,{className:e.button,variant:"outlined",color:"inherit"},"Registrarse")),n.a.createElement("p",{style:{position:"relative",textAlign:"center",color:"#27496D",fontSize:"15px",fontFamily:"Lucida Handwriting"}},"Proyecto de ciclo de TOO 115 ciclo 2 - 2021")),n.a.createElement(b,{images:t,autoplay:!0,speed:3e3,inicio:!0,arrows:!1}),n.a.createElement(S,null))},F=function(){return n.a.createElement(c.a,null,n.a.createElement("div",null,n.a.createElement(o.c,null,n.a.createElement(o.a,{exact:!0,path:"/"},n.a.createElement(z,null)))))},C=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,274)).then(function(t){var a=t.getCLS,i=t.getFID,n=t.getFCP,l=t.getLCP,r=t.getTTFB;a(e),i(e),n(e),l(e),r(e)})};r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(F,null)),document.getElementById("root")),C()}},[[110,1,2]]]);
//# sourceMappingURL=main.7ea8348e.chunk.js.map