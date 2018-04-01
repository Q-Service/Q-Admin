@dirtree[path][dir]

$dir[^file:list[$path/]]
$dirfile[^dir.menu{^if(-d "$path/$dir.name/"){^dirtree[$path/$dir.name]}{  	["${dir.name}", "${path}/${dir.name}"],}
}]

