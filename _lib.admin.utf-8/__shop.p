@shop[p;param]

^if($p eq ""){^initPanels[300;;1;0;;]}

^if(def $form:idx){
$cookie:idx[ 
	$.value[$form:idx]
	$.expires[session]  
]   

}

$idx[$cookie:idx]
^if(def $idx){$idx[$cookie:idx]}{$idx[1]}

<script>
jQuery(document).ready(function() {
	jQuery.get('_admin_ajax/__shop.paj',{idx : '$idx', action : 'list' }, function(data){ ^$('#left-content').html(data) ^; })^;
	jQuery.get('_admin_ajax/__shop.paj',{idx : '$idx', action : 'start_pub'}, function(data){^$('#middle-panel').html(data) ^; })^;
})

</script>




