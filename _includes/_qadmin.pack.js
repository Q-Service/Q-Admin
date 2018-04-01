(function($){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},s={'array':function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a[a.length]=v;b=true;}}}
a[a.length]=']';return a.join('');},'boolean':function(x){return String(x);},'null':function(x){return"null";},'number':function(x){return isFinite(x)?String(x):'null';},'object':function(x){if(x){if(x instanceof Array){return s.array(x);}
var a=['{'],b,f,i,v;for(i in x){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a.push(s.string(i),':',v);b=true;}}}
a[a.length]='}';return a.join('');}
return'null';},'string':function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);});}
return'"'+x+'"';}};$.toJSON=function(v){var f=isNaN(v)?s[typeof v]:s['number'];if(f)return f(v);};$.parseJSON=function(v,safe){if(safe===undefined)safe=$.parseJSON.safe;if(safe&&!/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v))
return undefined;return eval('('+v+')');};$.parseJSON.safe=false;})(jQuery);;(function($){$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
if(typeof options=='function')
options={success:options};var url=$.trim(this.attr('action'));if(url){url=(url.match(/^([^#]+)/)||[])[1];}
url=url||window.location.href||'';options=$.extend({url:url,type:this.attr('method')||'GET',iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options||{});var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;for(var n in options.data){if(options.data[n]instanceof Array){for(var k in options.data[n])
a.push({name:n,value:options.data[n][k]});}
else
a.push({name:n,value:options.data[n]});}}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a);if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else
options.data=q;var $form=this,callbacks=[];if(options.resetForm)callbacks.push(function(){$form.resetForm();});if(options.clearForm)callbacks.push(function(){$form.clearForm();});if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success)
callbacks.push(options.success);options.success=function(data,status,xhr){for(var i=0,max=callbacks.length;i<max;i++)
callbacks[i].apply(options,[data,status,xhr||$form,$form]);};var files=$('input:file',this).fieldValue();var found=false;for(var j=0;j<files.length;j++)
if(files[j])
found=true;var multipart=false;if((files.length&&options.iframe!==false)||options.iframe||found||multipart){if(options.closeKeepAlive)
$.get(options.closeKeepAlive,fileUpload);else
fileUpload();}
else
$.ajax(options);this.trigger('form-submit-notify',[this,options]);return this;function fileUpload(){var form=$form[0];if($(':input[name=submit]',form).length){alert('Error: Form elements must not be named "submit".');return;}
var opts=$.extend({},$.ajaxSettings,options);var s=$.extend(true,{},$.extend(true,{},$.ajaxSettings),opts);var id='jqFormIO'+(new Date().getTime());var $io=$('<iframe id="'+id+'" name="'+id+'" src="'+opts.iframeSrc+'" onload="(jQuery(this).data(\'form-plugin-onload\'))()" />');var io=$io[0];$io.css({position:'absolute',top:'-1000px',left:'-1000px'});var xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;$io.attr('src',opts.iframeSrc);}};var g=opts.global;if(g&&!$.active++)$.event.trigger("ajaxStart");if(g)$.event.trigger("ajaxSend",[xhr,opts]);if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&$.active--;return;}
if(xhr.aborted)
return;var cbInvoked=false;var timedOut=0;var sub=form.clk;if(sub){var n=sub.name;if(n&&!sub.disabled){opts.extraData=opts.extraData||{};opts.extraData[n]=sub.value;if(sub.type=="image"){opts.extraData[n+'.x']=form.clk_x;opts.extraData[n+'.y']=form.clk_y;}}}
function doSubmit(){var t=$form.attr('target'),a=$form.attr('action');form.setAttribute('target',id);if(form.getAttribute('method')!='POST')
form.setAttribute('method','POST');if(form.getAttribute('action')!=opts.url)
form.setAttribute('action',opts.url);if(!opts.skipEncodingOverride){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(opts.timeout)
setTimeout(function(){timedOut=true;cb();},opts.timeout);var extraInputs=[];try{if(opts.extraData)
for(var n in opts.extraData)
extraInputs.push($('<input type="hidden" name="'+n+'" value="'+opts.extraData[n]+'" />').appendTo(form)[0]);$io.appendTo('body');$io.data('form-plugin-onload',cb);form.submit();}
finally{form.setAttribute('action',a);t?form.setAttribute('target',t):$form.removeAttr('target');$(extraInputs).remove();}};if(opts.forceSync)
doSubmit();else
setTimeout(doSubmit,10);var domCheckCount=100;function cb(){if(cbInvoked)
return;var ok=true;try{if(timedOut)throw'timeout';var data,doc;doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;var isXml=opts.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&(doc.body==null||doc.body.innerHTML=='')){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}
log('Could not access iframe DOM after 100 tries.');return;}
log('response detected');cbInvoked=true;xhr.responseText=doc.body?doc.body.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;xhr.getResponseHeader=function(header){var headers={'content-type':opts.dataType};return headers[header];};if(opts.dataType=='json'||opts.dataType=='script'){var ta=doc.getElementsByTagName('textarea')[0];if(ta)
xhr.responseText=ta.value;else{var pre=doc.getElementsByTagName('pre')[0];if(pre)
xhr.responseText=pre.innerHTML;}}
else if(opts.dataType=='xml'&&!xhr.responseXML&&xhr.responseText!=null){xhr.responseXML=toXml(xhr.responseText);}
data=$.httpData(xhr,opts.dataType);}
catch(e){log('error caught:',e);ok=false;xhr.error=e;$.handleError(opts,xhr,'error',e);}
if(ok){opts.success(data,'success');if(g)$.event.trigger("ajaxSuccess",[xhr,opts]);}
if(g)$.event.trigger("ajaxComplete",[xhr,opts]);if(g&&!--$.active)$.event.trigger("ajaxStop");if(opts.complete)opts.complete(xhr,ok?'success':'error');setTimeout(function(){$io.removeData('form-plugin-onload');$io.remove();xhr.responseXML=null;},100);};function toXml(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else
doc=(new DOMParser()).parseFromString(s,'text/xml');return(doc&&doc.documentElement&&doc.documentElement.tagName!='parsererror')?doc:null;};};};$.fn.ajaxForm=function(options){return this.ajaxFormUnbind().bind('submit.form-plugin',function(e){e.preventDefault();$(this).ajaxSubmit(options);}).bind('click.form-plugin',function(e){var target=e.target;var $el=$(target);if(!($el.is(":submit,input:image"))){var t=$el.closest(':submit');if(t.length==0)
return;target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!=undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);});};$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic){var a=[];if(this.length==0)return a;var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els)return a;for(var i=0,max=els.length;i<max;i++){var el=els[i];var n=el.name;if(!n)continue;if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el){a.push({name:n,value:$(el).val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
var v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(var j=0,jmax=v.length;j<jmax;j++)
a.push({name:n,value:v[j]});}
else if(v!==null&&typeof v!='undefined')
a.push({name:n,value:v});}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0],n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n)return;var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++)
a.push({name:n,value:v[i]});}
else if(v!==null&&typeof v!='undefined')
a.push({name:this.name,value:v});});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length))
continue;v.constructor==Array?$.merge(val,v):val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(typeof successful=='undefined')successful=true;if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1))
return null;if(tag=='select'){var index=el.selectedIndex;if(index<0)return null;var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v)
v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;if(one)return v;a.push(v);}}
return a;}
return el.value;};$.fn.clearForm=function(){return this.each(function(){$('input,select,textarea',this).clearFields();});};$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(t=='text'||t=='password'||tag=='textarea')
this.value='';else if(t=='checkbox'||t=='radio')
this.checked=false;else if(tag=='select')
this.selectedIndex=-1;});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType))
this.reset();});};$.fn.enable=function(b){if(b==undefined)b=true;return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select==undefined)select=true;return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio')
this.checked=select;else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};function log(){if($.fn.ajaxSubmit.debug){var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log)
window.console.log(msg);else if(window.opera&&window.opera.postError)
window.opera.postError(msg);}};})(jQuery);$(document).ready(dialogForms);function dialogForms(){$('a.dialog-form').click(function(){var a=$(this);$.get(a.attr('href'),function(resp){var dialog=$('<div>').attr('id','formDialog').html($(resp).find('form:first').parent('div').html());$('body').append(dialog);dialog.find(':submit').hide();dialog.dialog({title:a.attr('title')?a.attr('title'):'',modal:true,buttons:{'Save':function(){submitFormWithAjax($(this).find('form'));$(this).dialog('close');document.location.href=document.location.href;},'Cancel':function(){$(this).dialog('close');}},close:function(){$(this).remove();},width:'auto'});},'html');return false;});}
function submitFormWithAjax(form){form=$(form);$.ajax({url:form.attr('action'),data:form.serialize(),type:(form.attr('method')),dataType:'script'});return false;}
(function($){$.alerts={verticalOffset:-75,horizontalOffset:0,repositionOnResize:true,overlayOpacity:.3,overlayColor:'#000',draggable:true,okButton:'&nbsp;OK&nbsp;',cancelButton:'&nbsp;Cancel&nbsp;',dialogClass:null,alert:function(message,title,callback){if(title==null)title='Alert';$.alerts._show(title,message,null,'alert',function(result){if(callback)callback(result);});},confirm:function(message,title,callback){if(title==null)title='Confirm';$.alerts._show(title,message,null,'confirm',function(result){if(callback)callback(result);});},prompt:function(message,value,title,callback){if(title==null)title='Prompt';$.alerts._show(title,message,value,'prompt',function(result){if(callback)callback(result);});},_show:function(title,msg,value,type,callback){$.alerts._hide();$.alerts._overlay('show');$("BODY").append('<div id="popup_container">'+'<h1 id="popup_title"></h1>'+'<div id="popup_content">'+'<div id="popup_message"></div>'+'</div>'+'</div>');if($.alerts.dialogClass)$("#popup_container").addClass($.alerts.dialogClass);var pos=($.browser.msie&&parseInt($.browser.version)<=6)?'absolute':'fixed';$("#popup_container").css({position:pos,zIndex:99999,padding:0,margin:0});$("#popup_title").text(title);$("#popup_content").addClass(type);$("#popup_message").text(msg);$("#popup_message").html($("#popup_message").text().replace(/\n/g,'<br />'));$("#popup_container").css({minWidth:$("#popup_container").outerWidth(),maxWidth:$("#popup_container").outerWidth()});$.alerts._reposition();$.alerts._maintainPosition(true);switch(type){case'alert':$("#popup_message").after('<div id="popup_panel"><input type="button" value="'+$.alerts.okButton+'" id="popup_ok" /></div>');$("#popup_ok").click(function(){$.alerts._hide();callback(true);});$("#popup_ok").focus().keypress(function(e){if(e.keyCode==13||e.keyCode==27)$("#popup_ok").trigger('click');});break;case'confirm':$("#popup_message").after('<div id="popup_panel"><input type="button" value="'+$.alerts.okButton+'" id="popup_ok" /> <input type="button" value="'+$.alerts.cancelButton+'" id="popup_cancel" /></div>');$("#popup_ok").click(function(){$.alerts._hide();if(callback)callback(true);});$("#popup_cancel").click(function(){$.alerts._hide();if(callback)callback(false);});$("#popup_ok").focus();$("#popup_ok, #popup_cancel").keypress(function(e){if(e.keyCode==13)$("#popup_ok").trigger('click');if(e.keyCode==27)$("#popup_cancel").trigger('click');});break;case'prompt':$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="'+$.alerts.okButton+'" id="popup_ok" /> <input type="button" value="'+$.alerts.cancelButton+'" id="popup_cancel" /></div>');$("#popup_prompt").width($("#popup_message").width());$("#popup_ok").click(function(){var val=$("#popup_prompt").val();$.alerts._hide();if(callback)callback(val);});$("#popup_cancel").click(function(){$.alerts._hide();if(callback)callback(null);});$("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(e){if(e.keyCode==13)$("#popup_ok").trigger('click');if(e.keyCode==27)$("#popup_cancel").trigger('click');});if(value)$("#popup_prompt").val(value);$("#popup_prompt").focus().select();break;}
if($.alerts.draggable){try{$("#popup_container").draggable({handle:$("#popup_title")});$("#popup_title").css({cursor:'move'});}catch(e){}}},_hide:function(){$("#popup_container").remove();$.alerts._overlay('hide');$.alerts._maintainPosition(false);},_overlay:function(status){switch(status){case'show':$.alerts._overlay('hide');$("BODY").append('<div id="popup_overlay"></div>');$("#popup_overlay").css({position:'absolute',zIndex:99998,top:'0px',left:'0px',width:'100%',height:$(document).height(),background:$.alerts.overlayColor,opacity:$.alerts.overlayOpacity});break;case'hide':$("#popup_overlay").remove();break;}},_reposition:function(){var top=(($(window).height()/2)-($("#popup_container").outerHeight()/2))+$.alerts.verticalOffset;var left=(($(window).width()/2)-($("#popup_container").outerWidth()/2))+$.alerts.horizontalOffset;if(top<0)top=0;if(left<0)left=0;if($.browser.msie&&parseInt($.browser.version)<=6)top=top+$(window).scrollTop();$("#popup_container").css({top:top+'px',left:left+'px'});$("#popup_overlay").height($(document).height());},_maintainPosition:function(status){if($.alerts.repositionOnResize){switch(status){case true:$(window).bind('resize',$.alerts._reposition);break;case false:$(window).unbind('resize',$.alerts._reposition);break;}}}}
jAlert=function(message,title,callback){$.alerts.alert(message,title,callback);}
jConfirm=function(message,title,callback){$.alerts.confirm(message,title,callback);};jPrompt=function(message,value,title,callback){$.alerts.prompt(message,value,title,callback);};})(jQuery);jQuery.fn.extend({everyTime:function(interval,label,fn,times,belay){return this.each(function(){jQuery.timer.add(this,interval,label,fn,times,belay);});},oneTime:function(interval,label,fn){return this.each(function(){jQuery.timer.add(this,interval,label,fn,1);});},stopTime:function(label,fn){return this.each(function(){jQuery.timer.remove(this,label,fn);});}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{'ms':1,'cs':10,'ds':100,'s':1000,'das':10000,'hs':100000,'ks':1000000},timeParse:function(value){if(value==undefined||value==null)
return null;var result=this.regex.exec(jQuery.trim(value.toString()));if(result[2]){var num=parseInt(result[1],10);var mult=this.powers[result[2]]||1;return num*mult;}else{return value;}},add:function(element,interval,label,fn,times,belay){var counter=0;if(jQuery.isFunction(label)){if(!times)
times=fn;fn=label;label=interval;}
interval=jQuery.timer.timeParse(interval);if(typeof interval!='number'||isNaN(interval)||interval<=0)
return;if(times&&times.constructor!=Number){belay=!!times;times=0;}
times=times||0;belay=belay||false;if(!element.$timers)
element.$timers={};if(!element.$timers[label])
element.$timers[label]={};fn.$timerID=fn.$timerID||this.guid++;var handler=function(){if(belay&&this.inProgress)
return;this.inProgress=true;if((++counter>times&&times!==0)||fn.call(element,counter)===false)
jQuery.timer.remove(element,label,fn);this.inProgress=false;};handler.$timerID=fn.$timerID;if(!element.$timers[label][fn.$timerID])
element.$timers[label][fn.$timerID]=window.setInterval(handler,interval);if(!this.global[label])
this.global[label]=[];this.global[label].push(element);},remove:function(element,label,fn){var timers=element.$timers,ret;if(timers){if(!label){for(label in timers)
this.remove(element,label,fn);}else if(timers[label]){if(fn){if(fn.$timerID){window.clearInterval(timers[label][fn.$timerID]);delete timers[label][fn.$timerID];}}else{for(var fn in timers[label]){window.clearInterval(timers[label][fn]);delete timers[label][fn];}}
for(ret in timers[label])break;if(!ret){ret=null;delete timers[label];}}
for(ret in timers)break;if(!ret)
element.$timers=null;}}}});if(jQuery.browser.msie)
jQuery(window).one("unload",function(){var global=jQuery.timer.global;for(var label in global){var els=global[label],i=els.length;while(--i)
jQuery.timer.remove(els[i],label);}});jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};(function($){$.fn.filestyle=function(options){var settings={width:250};if(options){$.extend(settings,options);};return this.each(function(){var self=this;var wrapper=$("<div>").css({"width":settings.imagewidth+"px","height":settings.imageheight+"px","background":"url("+settings.image+") 0 0 no-repeat","background-position":"right","display":"inline","position":"absolute","overflow":"hidden"});var filename=$('<input class="file">').addClass($(self).attr("class")).css({"display":"inline","width":settings.width+"px"});$(self).before(filename);$(self).wrap(wrapper);$(self).css({"position":"relative","height":settings.imageheight+"px","width":settings.width+"px","display":"inline","cursor":"pointer","opacity":"0.0"});if($.browser.mozilla){if(/Win/.test(navigator.platform)){$(self).css("margin-left","-142px");}else{$(self).css("margin-left","-168px");};}else{$(self).css("margin-left",settings.imagewidth-settings.width+"px");};$(self).bind("change",function(){filename.val($(self).val());});});};})(jQuery);(function($){$.extend($.fn,{livequery:function(type,fn,fn2){var self=this,q;if($.isFunction(type))
fn2=fn,fn=type,type=undefined;$.each($.livequery.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&type==query.type&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid))
return(q=query)&&false;});q=q||new $.livequery(this.selector,this.context,type,fn,fn2);q.stopped=false;q.run();return this;},expire:function(type,fn,fn2){var self=this;if($.isFunction(type))
fn2=fn,fn=type,type=undefined;$.each($.livequery.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&(!type||type==query.type)&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)&&!this.stopped)
$.livequery.stop(query.id);});return this;}});$.livequery=function(selector,context,type,fn,fn2){this.selector=selector;this.context=context||document;this.type=type;this.fn=fn;this.fn2=fn2;this.elements=[];this.stopped=false;this.id=$.livequery.queries.push(this)-1;fn.$lqguid=fn.$lqguid||$.livequery.guid++;if(fn2)fn2.$lqguid=fn2.$lqguid||$.livequery.guid++;return this;};$.livequery.prototype={stop:function(){var query=this;if(this.type)
this.elements.unbind(this.type,this.fn);else if(this.fn2)
this.elements.each(function(i,el){query.fn2.apply(el);});this.elements=[];this.stopped=true;},run:function(){if(this.stopped)return;var query=this;var oEls=this.elements,els=$(this.selector,this.context),nEls=els.not(oEls);this.elements=els;if(this.type){nEls.bind(this.type,this.fn);if(oEls.length>0)
$.each(oEls,function(i,el){if($.inArray(el,els)<0)
$.event.remove(el,query.type,query.fn);});}
else{nEls.each(function(){query.fn.apply(this);});if(this.fn2&&oEls.length>0)
$.each(oEls,function(i,el){if($.inArray(el,els)<0)
query.fn2.apply(el);});}}};$.extend($.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if($.livequery.running&&$.livequery.queue.length){var length=$.livequery.queue.length;while(length--)
$.livequery.queries[$.livequery.queue.shift()].run();}},pause:function(){$.livequery.running=false;},play:function(){$.livequery.running=true;$.livequery.run();},registerPlugin:function(){$.each(arguments,function(i,n){if(!$.fn[n])return;var old=$.fn[n];$.fn[n]=function(){var r=old.apply(this,arguments);$.livequery.run();return r;}});},run:function(id){if(id!=undefined){if($.inArray(id,$.livequery.queue)<0)
$.livequery.queue.push(id);}
else
$.each($.livequery.queries,function(id){if($.inArray(id,$.livequery.queue)<0)
$.livequery.queue.push(id);});if($.livequery.timeout)clearTimeout($.livequery.timeout);$.livequery.timeout=setTimeout($.livequery.checkQueue,20);},stop:function(id){if(id!=undefined)
$.livequery.queries[id].stop();else
$.each($.livequery.queries,function(id){$.livequery.queries[id].stop();});}});$.livequery.registerPlugin('append','prepend','after','before','wrap','attr','removeAttr','addClass','removeClass','toggleClass','empty','remove');$(function(){$.livequery.play();});var init=$.prototype.init;$.prototype.init=function(a,c){var r=init.apply(this,arguments);if(a&&a.selector)
r.context=a.context,r.selector=a.selector;if(typeof a=='string')
r.context=c||document,r.selector=a;return r;};$.prototype.init.prototype=$.prototype;})(jQuery);var domEl=function(e,c,a,p,x){if(e||c){c=(typeof c=='string'||(typeof c=='object'&&!c.length))?[c]:c;e=(!e&&c.length==1)?document.createTextNode(c[0]):e;var n=(typeof e=='string')?document.createElement(e):!(e&&e===c[0])?e.cloneNode(false):e.cloneNode(true);if(e.nodeType!=3){c[0]===e?c[0]='':'';for(var i=0,j=c.length;i<j;i++){if(typeof c[i]=='string'&&c[i].length!=0)n.appendChild(document.createTextNode(c[i]));else if(c[i].length!=0)n.appendChild(c[i].cloneNode(true));}
if(a){for(var i=(a.length-1);i>=0;i--)a[i][0]=='class'?n.className=a[i][1]:n.setAttribute(a[i][0],a[i][1]);}};};if(!p)return n;p=(typeof p=='object'&&!p.length)?[p]:p;for(var i=(p.length-1);i>=0;i--){if(x){while(p[i].firstChild)p[i].removeChild(p[i].firstChild);if(!e&&!c&&p[i].parentNode)p[i].parentNode.removeChild(p[i]);};if(n)p[i].appendChild(n.cloneNode(true));};};function getElementsByClass(s,n,t){var c=[],e=(n?n:document).getElementsByTagName(t?t:'*'),r=new RegExp("(^|\\s)"+s+"(\\s|$)");for(var i=0,j=e.length;i<j;i++)r.test(e[i].className)?c.push(e[i]):'';return c}
function xxx(){var r=[],a=arguments;for(var i=0,j=a.length;i<j;i++){(typeof a[i]=='string')?(r.push(document.getElementById(a[i]))):(r.push(a[i]))};return(r.length==1)?r[0]:r};