@dir_size[dir]
$total[0]
$total_size[0]
$files[0]
$base_size[0]
^if(!(def $limit)){$limit[50000]}
^drtsree[/]

^connect[$CONNECT]{
$db[^table::sql{SHOW TABLE STATUS FROM $BASENAME  LIKE '${BASE}%'}]

}


^db.menu{$base_size($base_size + $db.Data_length)
}
<table align=top>
$base_size($base_size / 1000) $base_size(^base_size.format[%.0f])
$totalsize($totalsize / 1000) $totalsize(^totalsize.format[%.0f]) 
$summ($base_size + $totalsize)
$free($limit - $summ)


^connect[$CONNECT]{
$newscnt[^table::sql{select id from ${BASEBOSS}news}]
$pagescnt[^table::sql{select id from ${BASEBOSS}content}]
$bbcnt[^table::sql{select id from ${BASEBOSS}billboard}]
}
$cntnews(^newscnt.count[])
$pagescnt(^pagescnt.count[])
$bbcnt(^bbcnt.count[])



<table width="600">
<tr>
<td align=top>$_t._host:</td><td>"${hosting}" </td>
<td>&nbsp^;</td>
<td align=top>$_t._base_size: </td><td>$base_size kBt </td>
</tr>
<tr>
<td>$_t._news_num:</td><td> $cntnews</td>
<td>&nbsp^;</td>
<td align=top>$_t._dir_num: </td><td>$total</td>
</tr>
<tr>
<td align=top>$_t._site_size: </td><td>$summ kBt</td>
<td>&nbsp</td>
<td>$_t._pages_num: </td><td>$pagescnt</td>
</tr>
<tr>
<td align=top>$_t._file_num: </td><td>$files</td>
<td>&nbsp</td>
<td align=top>$_t._limit: </td><td>$limit kBt</td>
</tr>
<tr>
<td>$_t._bb_num:</td><td>$bbcnt</td>
<td>&nbsp</td>
<td align=top>$_t._files_size: </td><td>$totalsize kBt</td>
</tr>
<tr>
<td align=top>^if($free > 0){$_t._free_space: $free($limit - $summ)}{<font color=red>$_t._out_of_space: $free($free * -1)}</td><td>$free kBt</td>
<td>&nbsp</td>
<td>&nbsp</td><td>&nbsp</td>
</tr>

</table>





@drtsree[path;ref][dir]

$dir[^file:list[$path/]]

^dir.menu{
$file_name[$dir.name]
$file_path[${path}/]
$file_size[^file::stat[${path}/$dir.name]]

$subdir{$file_path}
$subdir[^subdir.mid(6)]
$s[^subdir.pos[/]]
#$subdir[^subdir.left($s)]

#${file_path} | ${dir.name} | slesh= $s | $subdir | $file_size.size<br>


^if($file_size.size eq 0){}{
$totalsize($totalsize + $file_size.size)

}

^if(-d "$path/$dir.name/"){
$total($total + 1)
^drtsree[$path/$dir.name;$ref]

}{$files($files + 1)}

}







