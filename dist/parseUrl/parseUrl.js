function parseURL(a){var b=document.createElement("a");return b.href=a,{source:a,protocol:b.protocol.replace(":",""),host:b.hostname,port:b.port,query:b.search,params:function(){for(var a,c={},d=b.search.replace(/^\?/,"").split("&"),e=d.length,f=0;e>f;f++)d[f]&&(a=d[f].split("="),c[a[0]]=a[1]);return c}(),file:(b.pathname.match(/\/([^\/?#]+)$/i)||[,""])[1],hash:b.hash.replace("#",""),path:b.pathname.replace(/^([^\/])/,"/$1"),relative:(b.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],segments:b.pathname.replace(/^\//,"").split("/")}}