function init(){IFrame=document.createElement("iframe"),IFrame.src="index.html",IFrame.id="contentFrame",IFrame.style.width=screenWidth+"px",IFrame.style.height=screenHeight+"px",IFrame.style.opacity=1,IFrame.style.zIndex=1,document.body.appendChild(IFrame),window.addEventListener("message",(function(e){if(console.log("event!!!!",e),"cycleEnd"==e.data.command){for(var t=document.getElementById("contentFrameReplace");null!==t;)console.log("Remove Frames"),t.parentNode.removeChild(t),t=document.getElementById("contentFrameReplace");IFrame=document.createElement("iframe"),IFrame.src="index.html",IFrame.id="contentFrameReplace",IFrame.style.width=screenWidth+"px",IFrame.style.height=screenHeight+"px",IFrame.style.opacity=1,IFrame.style.zIndex=-1,setTimeout((function(){document.body.appendChild(IFrame),setTimeout((function(){document.getElementById("contentFrame").contentWindow.postMessage("status","*"),setTimeout((function(){if(null!==document.getElementById("contentFrameReplace")){var e=document.getElementById("contentFrame");e.parentNode.removeChild(e)}null!==document.getElementById("contentFrameReplace")&&(document.getElementById("contentFrameReplace").id="contentFrame",document.getElementById("contentFrame").style.zIndex=1)}),1e3)}),5e3)}),1e3)}else if("status"==e.data.command){var n=document.getElementById("contentFrameReplace");null!==n&&n.contentWindow.postMessage(e.data,"*")}}))}screenWidth=parseInt(clientData.screen.screen_width),screenHeight=parseInt(clientData.screen.screen_height),document.body.style.backgroundColor="black",init();