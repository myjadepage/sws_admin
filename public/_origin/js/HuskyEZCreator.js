if(typeof window.nhn=='undefined') window.nhn = {};
if (!nhn.husky) nhn.husky = {};

var NHN_SE2_EDITORS = [];

var _nhnSe2 = {
	setHTML: function(id, html) {
		NHN_SE2_EDITORS.getById[id].exec('PASTE_HTML', [html]);
	},

	getHTML: function(id) {
		return NHN_SE2_EDITORS.getById[id].getIR();
	},

	setContents: function(winName) {
		if (winName) {
			var arrWn = winName.split('_');
			NHN_SE2_EDITORS.getById[arrWn[arrWn.length - 1]].exec('UPDATE_CONTENTS_FIELD', []);
		}
		else {
			for (var i=0; i<NHN_SE2_EDITORS.length; i++) {
				NHN_SE2_EDITORS[i].exec('UPDATE_CONTENTS_FIELD', []);
			}
		}
	}
};

/**
 * @fileOverview This file contains application creation helper function, which would load up an HTML(Skin) file and then execute a specified create function.
 * @name HuskyEZCreator.js
 */
nhn.husky.EZCreator = new (function(){
	this.sEditorPath = null;
	this.nBlockerCount = 0;

	this.createInIFrame = function(htOptions){
		var scripts = document.getElementsByTagName('script');
		for (var i=0; i<scripts.length; i++) {
			if (typeof (scripts[i].src) == 'string') {
				if (scripts[i].src.indexOf('HuskyEZCreator.js') != -1) {
					this.sEditorPath = scripts[i].src;
					break;
				}
			}
		}
		if (this.sEditorPath) {
			this.sEditorPath = this.sEditorPath.substring(0, this.sEditorPath.lastIndexOf('/')).replace('/js', '');
		}

		var oAppRef = htOptions.oAppRef || NHN_SE2_EDITORS;
		var elPlaceHolder = htOptions.elPlaceHolder;
		var sSkinURI = (htOptions.sSkinURI || this.sEditorPath+"/SmartEditor2Skin.html");
		var fCreator = htOptions.fCreator;
		var fOnAppLoad = htOptions.fOnAppLoad;
		var bUseBlocker = htOptions.bUseBlocker;
		var htParams = htOptions.htParams || null;

		if (htParams) {
			if (!htParams.fOnBeforeUnload) {
				htParams.fOnBeforeUnload = function() { }
			}
		}
		else {
			htParams = {
				fOnBeforeUnload: function() { }
			}
		}

		if(bUseBlocker) nhn.husky.EZCreator.showBlocker();

		var attachEvent = function(elNode, sEvent, fHandler){ 
			if(elNode.addEventListener){
				elNode.addEventListener(sEvent, fHandler, false);
			}else{
				elNode.attachEvent("on"+sEvent, fHandler);
			}
		} 

		if(!elPlaceHolder){
			alert("Placeholder is required!");
			return;
		}

		if(typeof(elPlaceHolder) != "object"){
			if(document.getElementById(elPlaceHolder))
				elPlaceHolder = document.getElementById(elPlaceHolder);
			else {
				elPlaceHolder = document.getElementsByName(elPlaceHolder)[0];
				elPlaceHolder.setAttribute('id', elPlaceHolder.name+"-placeholder");
			}
		}

		var elIFrame, nEditorWidth, nEditorHeight;
		var sIFrameKey = "__se2_frame_"+elPlaceHolder.id;

		try{
			elIFrame = document.createElement('<IFRAME id="'+sIFrameKey+'" name="'+sIFrameKey+'" frameBorder="0" scrolling="no"></IFRAME>');
		}catch(e){
			elIFrame = document.createElement("IFRAME");
			elIFrame.setAttribute("id", sIFrameKey);
			elIFrame.setAttribute("name", sIFrameKey);
			elIFrame.setAttribute("frameBorder", "0");
			elIFrame.setAttribute("scrolling", "no");
		}
		
		elIFrame.style.width = "1px";
		elIFrame.style.height = "1px";
		elPlaceHolder.parentNode.insertBefore(elIFrame, elPlaceHolder.nextSibling);
		
		attachEvent(elIFrame, "load", function(){
			fCreator = elIFrame.contentWindow[fCreator] || elIFrame.contentWindow.createSEditor2;
			
//			top.document.title = ((new Date())-window.STime);
//			window.STime = new Date();
			
			try{
				nEditorWidth = elIFrame.contentWindow.document.body.scrollWidth || "500px";
				nEditorHeight = elIFrame.contentWindow.document.body.scrollHeight + 12;
				elIFrame.style.width =  "100%";
				elIFrame.style.height = nEditorHeight+ "px";
				elIFrame.contentWindow.document.body.style.margin = "0";
			}catch(e){
				nhn.husky.EZCreator.hideBlocker(true);
				elIFrame.style.border = "5px solid red";
				elIFrame.style.width = "500px";
				elIFrame.style.height = "500px";
				alert("Failed to access "+sSkinURI);
				return;
			}
			
			var oApp = fCreator(elPlaceHolder, htParams);	// oEditor
			
			oApp.elPlaceHolder = elPlaceHolder;

			oAppRef[oAppRef.length] = oApp;
			if(!oAppRef.getById) oAppRef.getById = {};
			
			if(elPlaceHolder.id) oAppRef.getById[elPlaceHolder.id] = oApp;

			oApp.run({fnOnAppReady:fOnAppLoad}); 
			
//			top.document.title += ", "+((new Date())-window.STime);
			nhn.husky.EZCreator.hideBlocker();
		});
//		window.STime = new Date();
		elIFrame.src = sSkinURI;
		this.elIFrame = elIFrame;
	};
	
	this.showBlocker = function(){
		if(this.nBlockerCount<1){
			var elBlocker = document.createElement("DIV");
			elBlocker.style.position = "absolute";
			elBlocker.style.top = 0;
			elBlocker.style.left = 0;
			elBlocker.style.backgroundColor = "#FFFFFF";
			elBlocker.style.width = "100%";

			document.body.appendChild(elBlocker);
			
			nhn.husky.EZCreator.elBlocker = elBlocker;
		}

		nhn.husky.EZCreator.elBlocker.style.height = Math.max(document.body.scrollHeight, document.body.clientHeight)+"px";
		
		this.nBlockerCount++;
	};
	
	this.hideBlocker = function(bForce){
		if(!bForce){
			if(--this.nBlockerCount > 0) return;
		}
		
		this.nBlockerCount = 0;
		
		if(nhn.husky.EZCreator.elBlocker) nhn.husky.EZCreator.elBlocker.style.display = "none";
	}
})();