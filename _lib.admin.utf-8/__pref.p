@pref[]


^initPanels[260;;1;0;;]


<script>
jQuery(document).ready(function() {

jQuery.get('_admin_ajax/_${form:a}.paj',{ op : "left" }, function(data){ ^$('#left-content').html(data) })^;
jQuery.get('_admin_ajax/_${form:a}.paj',{ op : "middle" }, function(data){ ^$('#middle-panel').html(data) })^;
})

</script>