@baseBak[name]
$date_now[^date::now[]]
#$filename[^date_now.unix-timestamp[]]
$filename[^date_now.year.format[%04.0f]-^date_now.month.format[%02.0f]-^date_now.day.format[%02.0f] ^date_now.hour.format[%02.0f]^date_now.minute.format[%02.0f]^date_now.second.format[%02.0f]]
^connect[$CONNECT]{
$btext[^table::sql{select * from ${BASE}$name}]
^btext.save[/_BAK/${filename}.${name}.sql]
}
