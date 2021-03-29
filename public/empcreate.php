<?php

$username = 'theappguysapi';
$password = 'theappguysapi';

//$username = 'usacom\sv_sageweb';
//$password = 'gzD9T4Ww!4Q0wdWc';


echo $auth = base64_encode($username.":".$password);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://24.237.121.51/EIDSAGE100DIS/API/PR_EMPLOYEE_CREATE?company=Default&action_type=I",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{\"command\" : [\r\n\t{\"recnum\":\"6\",\r\n\t\"fstnme\":\"Mark\",\r\n\t\"lstnme\":\"Davis\",\r\n\t\"status\":\"1\",\r\n\t\"emptyp\":\"1\",\r\n\t\"gender\":\"1\",\r\n\t\"wrkcmp\":\"8810\",\r\n\t\"paypst\":\"1\",\r\n\t\"taxste\":\"CA\",\r\n\t\"payprd\":\"1\",\r\n\t\"midini\":\"\",\r\n\t\"addrs1\":\"\",\r\n\t\"addrs2\":\"\",\r\n\t\"ctynme\":\"\",\r\n\t\"state_\":\"\",\r\n\t\"zipcde\":\"\",\r\n\t\"phnnum\":\"\",\r\n\t\"pagnum\":\"\",\r\n\t\"faxnum\":\"\",\r\n\t\"cllphn\":\"\",\r\n\t\"homnum\":\"\",\r\n\t\"e_mail\":\"\",\r\n\t\"usrdf1\":\"\",\r\n\t\"usrdf2\":\"\",\r\n\t\"eqpnum\":\"\",\r\n\t\"mrtsts\":\"0\",\r\n\t\"hertge\":\"1\",\r\n\t\"empcmp\":\"1\",\r\n\t\"uninum\":\"\",\r\n\t\"loctax\":\"\",\r\n\t\"locwrk\":\"\",\r\n\t\"socsec\":\"\",\r\n\t\"dtebth\":\"\",\r\n\t\"dtehre\":\"\",\r\n\t\"dteina\":\"\",\r\n\t\"lstrse\":\"\",\r\n\t\"i9verf\":\"0\",\r\n\t\"crtrpt\":\"0\",\r\n\t\"exmovr\":\"0\",\r\n\t\"hiract\":\"0\",\r\n\t\"eeoprx\":\"0\",\r\n\t\"paycls\":\"1\",\r\n\t\"paygrp\":\"\",\r\n\t\"payrt1\":\"\",\r\n\t\"payrt2\":\"\",\r\n\t\"payrt3\":\"\",\r\n\t\"salary\":\"\",\r\n\t\"comisn\":\"\",\r\n\t\"advdue\":\"\",\r\n\t\"accsck\":\"\",\r\n\t\"sckrte\":\"\",\r\n\t\"sckmth\":\"\",\r\n\t\"sckmax\":\"\",\r\n\t\"sckbeg\":\"\",\r\n\t\"accvac\":\"\",\r\n\t\"vacrte\":\"\",\r\n\t\"vacmth\":\"\",\r\n\t\"vacmax\":\"\",\r\n\t\"vacbeg\":\"\",\r\n\t\"retchk\":\"0\",\r\n\t\"sckchk\":\"0\",\r\n\t\"w_2elc\":\"0\",\r\n\t\"dirdep\":\"0\",\r\n\t\"prente\":\"0\",\r\n\t\"acttyp\":\"1\",\r\n\t\"rtnmbr\":\"\",\r\n\t\"actnum\":\"\",\r\n\t\"rtetyp\":\"0\",\r\n\t\"depamt\":\"\",\r\n\t\"prent2\":\"0\",\r\n\t\"acttp2\":\"1\",\r\n\t\"rtnmb2\":\"\",\r\n\t\"actnm2\":\"\",\r\n\t\"rtetp2\":\"0\",\r\n\t\"dp2amt\":\"\",\r\n\t\"prent3\":\"0\",\r\n\t\"acttp3\":\"1\",\r\n\t\"rtnmb3\":\"\",\r\n\t\"actnm3\":\"\",\r\n\t\"rtetp3\":\"0\",\r\n\t\"dp3amt\":\"\",\r\n\t\"prent4\":\"0\",\r\n\t\"acttp4\":\"1\",\r\n\t\"rtnmb4\":\"\",\r\n\t\"actnm4\":\"\",\r\n\t\"rtetp4\":\"0\",\r\n\t\"dp4amt\":\"\",\r\n\t\"pyreml\":\"\",\r\n\t\"w4_1_c\":\"\",\r\n\t\"w4_2_c\":\"\",\r\n\t\"w4_3__\":\"\",\r\n\t\"w4_4_a\":\"\",\r\n\t\"w4_4_b\":\"\",\r\n\t\"w4_4_c\":\"\",\r\n\t\"w4_dte\":\"\",\r\n\t\"ntetxt\":\"\"\r\n\t}]\r\n}\r\n",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "Authorization: Basic  $auth"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;