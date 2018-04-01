@adminPref[]


^initPanels[260;$_t._news;1;0;;]


<script>
jQuery(document).ready(function() {

jQuery.get('_admin_ajax/_adminPref.paj',{idx : '$idx', action : "list" }, function(data){ ^$('#left-content').html(data) })^; 
})

</script>

