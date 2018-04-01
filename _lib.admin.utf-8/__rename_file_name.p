# Q-Admin v:5.0.1 (http://qservice.ws) # Copyright 2004-2015 Q-Service # Licensed under MIT # 2015.10.07 (2004.03.12) #
@rename_file_name[data]
$name[^hz2_to_translit[$data]]
$name[^name.lower[]]
$name[^name.match[^^_][g]{}]    
$name[^name.match[[ '"`@&]][g]{}]    
$result[$name]