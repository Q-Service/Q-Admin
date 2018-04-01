@applet[]
^if($form:applet eq "none" || $form:applet eq "None" || $form:applet eq "" || !def $form:applet){}{
^connect[$CONNECT]{
$right[^table::sql{SELECT admin_right, active FROM ${BASE}admins WHERE login = "$cookie:user"}[$.limit(1)]]
$n(^right.admin_right.match[$form:applet][])
^if($right.active eq "9"){$n(9)}
}

^if(def $form:applet && $n != 0){^process{^^${form:applet}[]}}{}
}