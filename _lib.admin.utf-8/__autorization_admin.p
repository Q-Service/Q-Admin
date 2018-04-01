@autorization_admin[]
<link href="_includes/login_page/screen.css" rel="stylesheet" type="text/css">
#<body>
<div id="cont"> 
  <div class="box lock"> </div> 
  <div id="loginform" class="box form"> 
# <h2></h2>

<div class="login-page">
  <div class="lform">
    <div class="admin">admin v. 6 (1702)</div>
      <form method="post" class="login-form">
        <input type="text" name="user" placeholder="e-mail"/>
        <input type="password" name="pass" placeholder="$_t._pass"/>
        <button id="signin_submit" value="$_t._send" type="submit" onClick="javascript:poptimer()^^;">login</button>
        <div> <a id="resend_password_link" class="message" href="#" onClick="
          var i = jQuery('.login-form').serialize()^;
                  jQuery.post( '_admin_ajax/___forgotp_admin.paj', i).done( function( data ) {
                    jQuery( '.result' ).html( data )^;
                  })^;
                  return false;
                ">^process{^untaint{$_t._forgot_pass}}</a>
        </div>  
        <span class="result message"></span>
#        <p class="message"><a href="#">^process{^untaint{$_t._forgot_pass}}</a></p>
      </form>
    </div>
  </div>

 </div>
 </div> 

