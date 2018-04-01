@postprocess[body] 
^if($body is string){ 
#    $body[^body.match[index\.html\?id=][g]{/}] 
#    $body[^body.match[//][g]{/}] 
#    $body[^body.match[&idx=][g]{/}] 
#    $body[^body.match[&muth=][g]{/}]
#    $body[^body.match[\.\./userfiles/][g]{/userfiles/}]

$body	
		 
}{ 
    $body 
} 

@auto[]

# global vars

# max size for image preview (in _PRW)
$sizeMax(150)

^connect[$CONNECT]{
^if(def $form:loc){$localization[$form:loc]
}{
$localization[^string:sql{select admin_lang from ${BASEBOSS}admin_set where id=1000}[$.default{ru}]]
}
}

$adminpath[/admin/_lib.admin.utf-8/]
$admindir[^file:list[$adminpath]]
	^admindir.menu{
	^if(!(^admindir.name.right(1) eq p)){}{
        ^use[${adminpath}${admindir.name}]
	}}



$t_loc[^table::load[/admin/_localization/${localization}.loc]]
$_t[^t_loc.hash[name][loc][$.type[string]]]


