(this["webpackJsonpcrisis-stats"]=this["webpackJsonpcrisis-stats"]||[]).push([[0],{163:function(e){e.exports=JSON.parse('[{"2019":1153,"2020":null,"name":"03-01"},{"2019":4,"2020":null,"name":"03-02"},{"2019":0,"2020":null,"name":"03-03"},{"2019":974,"2020":null,"name":"03-04"},{"2019":721,"2020":null,"name":"03-05"},{"2019":619,"2020":null,"name":"03-06"},{"2019":562,"2020":null,"name":"03-07"},{"2019":444,"2020":null,"name":"03-08"},{"2019":6,"2020":null,"name":"03-09"},{"2019":16,"2020":null,"name":"03-10"},{"2019":644,"2020":null,"name":"03-11"},{"2019":496,"2020":null,"name":"03-12"},{"2019":429,"2020":null,"name":"03-13"},{"2019":474,"2020":null,"name":"03-14"},{"2019":491,"2020":null,"name":"03-15"},{"2019":8,"2020":null,"name":"03-16"},{"2019":18,"2020":null,"name":"03-17"},{"2019":649,"2020":null,"name":"03-18"},{"2019":487,"2020":null,"name":"03-19"},{"2019":414,"2020":null,"name":"03-20"},{"2019":431,"2020":199,"name":"03-21"},{"2019":441,"2020":62,"name":"03-22"},{"2019":9,"2020":293,"name":"03-23"},{"2019":15,"2020":255,"name":"03-24"},{"2019":592,"2020":203,"name":"03-25"},{"2019":548,"2020":200,"name":"03-26"},{"2019":551,"2020":null,"name":"03-27"},{"2019":713,"2020":null,"name":"03-28"},{"2019":1182,"2020":null,"name":"03-29"},{"2019":40,"2020":null,"name":"03-30"},{"2019":149,"2020":null,"name":"03-31"}]')},164:function(e){e.exports=JSON.parse('[{"2019":1609,"2020":null,"name":"03-01"},{"2019":7,"2020":null,"name":"03-02"},{"2019":0,"2020":null,"name":"03-03"},{"2019":921,"2020":null,"name":"03-04"},{"2019":601,"2020":null,"name":"03-05"},{"2019":463,"2020":null,"name":"03-06"},{"2019":521,"2020":null,"name":"03-07"},{"2019":483,"2020":null,"name":"03-08"},{"2019":26,"2020":null,"name":"03-09"},{"2019":43,"2020":null,"name":"03-10"},{"2019":593,"2020":null,"name":"03-11"},{"2019":434,"2020":null,"name":"03-12"},{"2019":383,"2020":null,"name":"03-13"},{"2019":446,"2020":null,"name":"03-14"},{"2019":476,"2020":null,"name":"03-15"},{"2019":22,"2020":null,"name":"03-16"},{"2019":26,"2020":null,"name":"03-17"},{"2019":541,"2020":null,"name":"03-18"},{"2019":448,"2020":null,"name":"03-19"},{"2019":362,"2020":null,"name":"03-20"},{"2019":391,"2020":1895,"name":"03-21"},{"2019":500,"2020":332,"name":"03-22"},{"2019":23,"2020":2258,"name":"03-23"},{"2019":51,"2020":2355,"name":"03-24"},{"2019":828,"2020":2676,"name":"03-25"},{"2019":894,"2020":2501,"name":"03-26"},{"2019":1063,"2020":null,"name":"03-27"},{"2019":1708,"2020":null,"name":"03-28"},{"2019":3349,"2020":null,"name":"03-29"},{"2019":232,"2020":null,"name":"03-30"},{"2019":645,"2020":null,"name":"03-31"}]')},292:function(e,n,a){e.exports=a(565)},297:function(e,n,a){},563:function(e,n,a){},565:function(e,n,a){"use strict";a.r(n);var l=a(0),t=a.n(l),m=a(7),r=a.n(m),u=(a(297),a(260)),c=a(82),o=a(567),i=a(53),s=a(569),d=a(568),E=a(33),y=s.a.Title,h=function(e){var n=e.data,a=e.title;return t.a.createElement("div",null,t.a.createElement(y,{level:2},a),t.a.createElement(E.d,{width:1e3,height:500,data:n},t.a.createElement(E.a,{stroke:"#eee",strokeDasharray:"5 5"}),t.a.createElement(E.f,{dataKey:"name"}),t.a.createElement(E.g,{type:"number"}),t.a.createElement(E.b,null),t.a.createElement(E.e,null),t.a.createElement(E.c,{type:"monotone",dataKey:"2019",stroke:"#8884d8",yAxisId:0}),t.a.createElement(E.c,{type:"monotone",dataKey:"2020",stroke:"#82ca9d",yAxisId:0})),t.a.createElement("div",{style:{width:600,marginTop:40}},t.a.createElement(d.a,{dataSource:n,columns:[{key:"name",title:"Data",dataIndex:"name"},{key:"2019",title:"2019",dataIndex:"2019"},{key:"2020",title:"2020",dataIndex:"2020"}],pagination:!1,size:"small",summary:function(e){return t.a.createElement("tr",null,t.a.createElement("td",null,t.a.createElement("strong",null,"Suma:")),t.a.createElement("td",null,t.a.createElement("strong",null,c.sumBy(e,"2019"))),t.a.createElement("td",null,t.a.createElement("strong",null,c.sumBy(e,"2020"))))}})))},g=a(163),p=a(164),k=o.a.Header,f=o.a.Content,z=o.a.Sider,v=function(){var e=Object(l.useState)("closed"),n=Object(u.a)(e,2),a=n[0],m=n[1];return t.a.createElement(o.a,null,t.a.createElement(k,{className:"header"},t.a.createElement(i.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["ceidg"]},t.a.createElement(i.a.Item,{key:"ceidg"},"CEIDG"))),t.a.createElement(f,null,t.a.createElement(o.a,null,t.a.createElement(z,{width:200},t.a.createElement(i.a,{mode:"inline",selectedKeys:[a],style:{height:"100%"},onSelect:function(e){var n=e.key;return m(n)}},t.a.createElement(i.a.Item,{key:"closed"},"Zamkni\u0119te"),t.a.createElement(i.a.Item,{key:"suspended"},"Zawieszone"),t.a.createElement(i.a.Item,{key:"together"},"Razem"))),t.a.createElement(f,{style:{background:"#fff",minHeight:680,padding:20}},t.a.createElement(h,{data:function(e){return"closed"===e?g:"suspended"===e?p:c.zipWith(g,p,(function(e,n){return{name:e.name,2019:e[2019]+n[2019],2020:e[2020]&&n[2020]?e[2020]+n[2020]:e[2020]||n[2020]}}))}(a),title:{closed:"Liczba zamkni\u0119tych dzia\u0142alno\u015bci gospodarczych 2020 vs. 2019",suspended:"Liczba zawieszonych dzia\u0142alno\u015bci gospodarczych 2020 vs. 2019",together:"Liczba zamkni\u0119tych i zamkni\u0119tych dzia\u0142alno\u015bci gospodarczych 2020 vs. 2019"}[a]})))))};a(563),a(564);var w=function(){return t.a.createElement(v,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(t.a.createElement(t.a.StrictMode,null,t.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[292,1,2]]]);
//# sourceMappingURL=main.0e1c151a.chunk.js.map