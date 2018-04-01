@adminnav_top[]
^connect[$CONNECT]{
$manag[^table::sql{SELECT * FROM ${BASE}admins WHERE login = "$cookie:user"}]
^if(-f "/_qadminMenu.cfg"){
	$sections[^table::load[nameless;/_qadminMenu.cfg]]
	}{
	$sections[^table::load[nameless;/admin/_qadminMenu.cfg]]
	}
$admin_rights[^string:sql{select rights from ${BASE}admins where login="$cookie:user"}]
$admin_set[^table::sql{select * from ${BASEBOSS}admin_set where id=1000}]
}



<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
      <a class="navbar-brand" href="#" style="color:red">QAdmin<sup>®</sup></a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
		$cnt(1)
		$sub[0]
			^sections.menu{
				$nextLine(^eval(^sections.offset[] + 1))
				^sections.offset(1)
				$nextRow[$sections.0]
				^sections.offset(-1)
				^if($sections.0 eq "["){$sub[1]<ul class="dropdown-menu">}
				^if($sections.0 eq "]"){$sub[0]</ul></li>}
				^if($sections.0 ne "[" && $sections.0 ne "]"){
					^if($sections.0 eq "#"){}{
					^connect[$CONNECT]{$thisuser[^table::sql{select * from ${BASE}admins where login = "$cookie:user"}]}
					
#						^if($thisuser.active eq "9" || ^thisuser.rights.match[$sections.0]){
						^if($sections.0 eq "~"){
								<li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">^process{^untaint{$sections.1}} <span class="caret"></span></a>
								}{
								<li>$n(^manag.admin_right.match[$sections.0][n]) ^if($n != 0 || $thisuser.active eq "9"){<a href="index.html?applet=$sections.0">^process{^untaint{$sections.1}}</a>}{<a style="color:#bbb^;">^process{^untaint{$sections.1}}</a>}^if($nextRow eq "["){;</li>}
								}
						^cnt.inc[]
#						}
				}}
				}
			^if($manag.temporary_password eq "1"){<li><a style="color:red" href="/admin/___reforgot.html">$_t._pass_change</a></li> }
			<li><a href="../">$_t._home</a></li> 
			<li><a href="index.html?logout=1">$_t._esc</a></li>
      </ul>
      
    
      
      
      
      
    </div>
  </div>
  
  



  
  
</nav>
<div style="z-index:1000^;position:absolute^;top:10px^;right:80px^;">
$localizations[^file:list[/admin/_localization;\.loc^$]]
<ul id="rmenu" style="width:auto^;margin-top:10px">
	<li style="border-bottom: 0 solid transparent^;"><a><img src="/admin/_admin_img/flags/${admin_set.admin_lang}.png" border="0"  style="margin-top: -7px^;cursor:pointer^;"/></a>
		^if(^localizations.count[] > 1){
		<ul>
		^localizations.menu{
		$lname[${admin_set.admin_lang}.loc]
		$locname[^localizations.name.match[(.loc)][]{}]
		^if($lname eq $localizations.name){}{
		<li><a style="cursor:pointer^;" onclick="javascript: 
			jQuery.get('/admin/_admin_ajax/_change_loc.paj', {loc : '$locname'}, function(){document.cookie='loc=$locname' ^; window.location.href='index.html?loc=$locname'})^;
			return true^;
			">
		<img src="/admin/_admin_img/flags/^localizations.name.match[(loc)][]{png}" border="0"/></a></li>
		}
	        }

		}
		</ul>
		
	</li>
</ul>  
</div>

$admin_set[^table::sql{select * from ${BASEBOSS}admin_set where id = "1000"}] 
<script>
	jQuery('img.but').click(function(){ 
				document.location.href = 'index.html?applet=pref&a=' + this.id ^;
	})^;
</script>
