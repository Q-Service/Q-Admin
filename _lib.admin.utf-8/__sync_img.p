@sync_img[path;filter][dir]

$dir[^file:list[$path/;$filter]]


^dir.menu{


	^if(-d "$path/$dir.name/"){
               	^sync_img[$path/$dir.name;$filter]
	}{
		^if(^file:justname[$path/$dir.name] eq "jpg" || ^file:justname[$path/$dir.name] eq "gif"  || ^file:justname[$path/$dir.name] eq "png"){

			^if(!-f "/_PRW${path}/${dir.name}"){

				$p[^path.match[/?userfiles/(\w+)]]

				^switch[$p.1]{ 
					^case[userimages]{

				        	^connect[$CONNECT]{
						$resData[^table::sql{SELECT * FROM ${BASE}admin_set WHERE id="1000"}]
						$max_img[$resData.userimage_max_w]
						$max_prw[100]
						}

					}
	
					^case[banners]{
				        	^connect[$CONNECT]{
						$resData[^table::sql{SELECT * FROM ${BASE}admin_set WHERE id="1000"}]
						$max_img[$resData.banner_w]
						$max_prw[100]
						}
					}

					^case[galleries]{ 
			        		^connect[$CONNECT]{
						$resData[^table::sql{SELECT * FROM ${BASE}admin_set WHERE id="1000"}]
						$max_img[$resData.gallery_max]
						$max_prw[$resData.gallery_max_prw]
						}
					}
	
					^case[news;affiche;blog]{
				        	^connect[$CONNECT]{
						$resData[^table::sql{SELECT * FROM ${BASE}${p.1}_set WHERE id="1000"}]
						$max_img[$resData.max_img]
						$max_prw[$resData.max_prw]
						}
					}
			
					^case[DEFAULT]{
					 	$max_img[]
						$max_prw[120]
					}
				}              
#end switch


# resize picture
				^if($max_img eq ""){$max_img[800]}
				^if($max_prw eq ""){$max_img[120]}

				$ext[^dir.name.match[\.(\w+)^$]]
				$pathns[^path.match[^^/][]{}]

				^switch[$ext.1]{
  
					^case[jpg;gif;png]{  
						$im[^image::measure[${path}/${dir.name}]]

						^if(${im.width} > ${im.height}){$r[${max_img}x];$r[x${max_img}]}

					        ^if(!-f "/_PRW/${pathns}/.dir"){$fnull[ ]^fnull.save[/_PRW/${pathns}/.dir]}
						
						^if(${im.width} > ${im.height}){$r[${max_prw}x];$r[x${max_prw}]}
						$ap[^file::exec[/convert;;-resize;$r;-antialias;${pathns}/${dir.name};_PRW/${pathns}/${dir.name}]]
		
^rem{
#						Image:<br>
#						status: $af.status<br>
#						text: $af.text<br>
#						stderr: $af.stderr<br><hr>
						Peview: <br>
						status: $ap.status<br>
						text: $ap.text<br>
						stderr: $ap.stderr<br><hr>
#						f::ex = /convert^;^;-resize^;$r^;-antialias^;${pathns}/${dir.name}^;_PRW/${pathns}/${dir.name}<hr>
}
#endrem
					}     
				}   
#end switch

			}
#end if !-f


	}
}
}

