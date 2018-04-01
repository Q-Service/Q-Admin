# Q-Admin v:5.0.1 (http://qservice.ws) # Copyright 2004-2015 Q-Service # Licensed under MIT # 2015.11.18 (2004.03.12) #
@datatime_sql[dt;direction]
# direction: sql DD.MM.YYYY HH:mm -> YYYY-MM-DD HH:mm
# direction: loc YYYY-MM-DD HH:mm -> DD.MM.YYYY HH:mm

^if($direction eq "sql"){
$dtc[^dt.match[(\d\d)\.(\d\d)\.(\d\d\d\d) (\d\d):(\d\d)][g]{${match.3}-${match.2}-${match.1} ${match.4}:${match.5}}]
}{
$dtc[^dt.match[(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)][g]{${match.3}.${match.2}.${match.1} ${match.4}:${match.5}}]
}
$dtc
