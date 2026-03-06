if (typeof fbq === 'undefined' && window.FB_PIXEL_CONFIG) {
  const { pixelId, scriptUrl } = window.FB_PIXEL_CONFIG;
  
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;
    n=f.fbq=function(){
      n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
    };
    if(!f._fbq)f._fbq=n;
    n.push=n;
    n.loaded=!0;
    n.version='2.0';
    n.queue=[];
    t=b.createElement(e);
    t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window, document, 'script', scriptUrl);
  
  fbq('dataProcessingOptions', ['LDU'], 1, 1000);
  fbq('init', pixelId);
  fbq('set', 'agent', 'tmgoogletagmanager', pixelId);
}
