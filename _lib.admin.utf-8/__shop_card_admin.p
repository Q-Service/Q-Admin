@shop_card_admin[p;param]

^if($p eq ""){^initPanels[460;;1;0;;]}

^if(def $form:idx){
$cookie:idx[ 
	$.value[$form:idx]
	$.expires[session]  
]   

}

$idx[$cookie:idx]
^if(def $idx){$idx[$cookie:idx]}{$idx[1]}

^rem{^if(!def $params){$param, }}
<script>
jQuery(document).ready(function() {

#^if($p eq "l" || $p eq ""){ jQuery.get('_admin_ajax/__publicadmin.paj',{idx : '$idx', action : 'list', xUID: 'shopcard'}, function(data){ ^$('#left-content').html(data) ^; })^; }
^if($p eq "m" || $p eq ""){ jQuery.get('_admin_ajax/__shop_card_admin.paj',{idx : '$idx', type : '$form:type', xUID: 'shopcard'}, function(data){^$('#middle-panel').html(data) ^; })^; }

})

</script>


