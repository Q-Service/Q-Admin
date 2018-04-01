@shop_form2mysql[table;action;data;id;like]

^connect[$CONNECT]{
$f[^table::sql{SHOW COLUMNS FROM ${BASE}$table LIKE "n%"}]
}