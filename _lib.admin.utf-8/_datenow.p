@datenow[]
$dn[^date::now[]]
$dn.year^dn.month.format[%2.2u]^dn.day.format[%2.2u]:^dn.hour.format[%2.2u]^dn.minute.format[%2.2u]

@datenow_sql[]
$dn[^date::now[]]
${dn.year}-^dn.month.format[%2.2u]-^dn.day.format[%2.2u] ^dn.hour.format[%2.2u]:^dn.minute.format[%2.2u]:^dn.second.format[%2.2u]

@datenow_loc[]
$dn[^date::now[]]
^dn.day.format[%2.2u].^dn.month.format[%2.2u].${dn.year} ^dn.hour.format[%2.2u]:^dn.minute.format[%2.2u]:^dn.second.format[%2.2u]