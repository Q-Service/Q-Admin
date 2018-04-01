@initPanels[lw;lname;li;rw;rname;ri]
# width ; name ; init
^if($lw eq ""){$lw(265)}
^if($rw eq ""){$rw(265)}
#^if($lw eq "0"){$lwo(265)}{$lwo(lw)}
#^if($rw eq "0"){$rwo(265)}{$rwo(rw)}


<div id="middle-panel" style="
						visibility:visible; 
						position:fixed; 
						^if($lw ne "0"){left:^eval($lw + 5)px}{left:5px}; 
						^if($li eq "0"){left:5px};
						^if($rw ne "0"){right:^eval($lw + 5)px}{right:5px}; 
						^if($ri eq "0"){right:5px};"
						></div>
^if($lw ne "0"){<div id="left-panel-closed" style="visibility: ^if($li eq 1){hidden}{visible}">
				<div id="left-panel-arr" class="arr-close" ></div>
				</div>}

^if($rw ne "0"){<div id="right-panel-closed" style="visibility:^if($ri eq 1){hidden}{visible}">
				<div id="right-panel-arr" class="r-arr-close"></div>
				</div>}

^if($lw ne "0"){<div id="left-panel" style="height: auto^; visibility: ^if($li eq 1){visible}{hidden}^; ^if($lw ne ""){width:${lw}px}" >
				<div id="left-switcher">
				<div id="left-panel-arr" class="arr-open"></div>
				<div id="left-switcher-txt">$lname</div>
				</div>
				<div id="left-idx"></div>
				<div id="left-flags"></div>
				<div id="left-content"></div>
				</div>}

^if($rw ne "0"){<div id="right-panel"  style="visibility: ^if($ri eq 1){visible}{hidden}^; ^if($rw ne ""){width:${rw}px}">
				<div id="right-switcher">
				<div id="right-panel-arr" class="r-arr-open"></div>
				<div id="right-switcher-txt">$rname</div>
				</div>
				<div id="right-content"></div>
				</div>}
<input type=hidden id="result">
</div>
<script>
jQuery(document).on("click", "div.arr-open",function(){
	var dvis=jQuery("#left-panel").css('visibility');
#	alert(dvis);
	if(dvis == 'visible'){
	jQuery("#left-panel").css('visibility','hidden');
	jQuery("#middle-panel").css('left', '35px');
	jQuery("#left-panel-closed").css('visibility','visible');
	}
});

jQuery(document).on("click", "div.arr-close", function(){
    var dvis=jQuery("#left-panel").css('visibility');
	if(dvis == 'hidden'){
	jQuery("#left-panel").css('visibility','visible');
	jQuery("#middle-panel").css('left', '${lw}px');
	jQuery("#left-panel-closed").css('visibility','hidden');

	}
});

jQuery(document).on("click", "div.r-arr-open", function(){
	var dvis=jQuery("#right-panel").css('visibility');
#	alert(dvis);
	if(dvis == 'visible'){
	jQuery("#right-panel").css('visibility','hidden');
	jQuery("#middle-panel").css('right', '35px');
	jQuery("#right-panel-closed").css('visibility','visible');
	}
});

jQuery(document).on("click", "div.r-arr-close", function(){
    var dvis=jQuery("#right-panel").css('visibility');
	if(dvis == 'hidden'){
	jQuery("#right-panel").css('visibility','visible');
	jQuery("#middle-panel").css('right', '${rw}px');
	jQuery("#right-panel-closed").css('visibility','hidden');

	}
});

</script>
