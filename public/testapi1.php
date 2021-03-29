<?php

$username = 'theappguysapi';
$password = 'theappguysapi';

//$username = 'usacom\sv_sageweb';
//$password = 'gzD9T4Ww!4Q0wdWc';


echo $auth = base64_encode($username.":".$password);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://24.237.121.51/EIDSAGE100DIS/API/PR_DAILY_PAYROLL_CREATE?company=Default",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{\"command\" : [\r\n\t{\"paydte\":\"2019-10-15\",\r\n\t\"empnum\":\"11\",\r\n\t\"dscrpt\":\"work job 1\",\r\n\t\"wrkord\":\"\",\r\n\t\"jobnum\":\"2019001\",\r\n\t\"loctax\":\"\",\r\n\t\"crtfid\":\"N\",\r\n\t\"phsnum\":\"\",\r\n\t\"cstcde\":\"\",\r\n\t\"paytyp\":\"1\",\r\n\t\"paygrp\":\"\",\r\n\t\"payrte\":\"18\",\r\n\t\"payhrs\":\"4\",\r\n\t\"pcerte\":\"\",\r\n\t\"pieces\":\"\",\r\n\t\"cmpcde\":\"8810\",\r\n\t\"dptmnt\":\"\",\r\n\t\"eqpnum\":\"\",\r\n\t\"opreqp\":\"\",\r\n\t\"eqpunt\":\"\",\r\n\t\"oprhrs\":\"\",\r\n\t\"stdhrs\":\"\",\r\n\t\"idlhrs\":\"\",\r\n\t\"bllunt\":\"\",\r\n\t\"oprbll\":\"\",\r\n\t\"stdbll\":\"\",\r\n\t\"idlbll\":\"\",\r\n\t\"usrdf1\":\"\",\r\n\t\"absnce\":\"\",\r\n\t\"ntetxt\":\"\"\r\n\t},\r\n\t{\"paydte\":\"2019-10-15\",\r\n\t\"empnum\":\"11\",\r\n\t\"dscrpt\":\"work job 2\",\r\n\t\"wrkord\":\"\",\r\n\t\"jobnum\":\"2019001\",\r\n\t\"loctax\":\"\",\r\n\t\"crtfid\":\"N\",\r\n\t\"phsnum\":\"\",\r\n\t\"cstcde\":\"\",\r\n\t\"paytyp\":\"1\",\r\n\t\"paygrp\":\"\",\r\n\t\"payrte\":\"18\",\r\n\t\"payhrs\":\"4\",\r\n\t\"pcerte\":\"\",\r\n\t\"pieces\":\"\",\r\n\t\"cmpcde\":\"8810\",\r\n\t\"dptmnt\":\"\",\r\n\t\"eqpnum\":\"\",\r\n\t\"opreqp\":\"\",\r\n\t\"eqpunt\":\"\",\r\n\t\"oprhrs\":\"\",\r\n\t\"stdhrs\":\"\",\r\n\t\"idlhrs\":\"\",\r\n\t\"bllunt\":\"\",\r\n\t\"oprbll\":\"\",\r\n\t\"stdbll\":\"\",\r\n\t\"idlbll\":\"\",\r\n\t\"usrdf1\":\"\",\r\n\t\"absnce\":\"\",\r\n\t\"ntetxt\":\"\"\r\n\t}]\r\n}\r\n",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "Authorization: Basic  $auth"
  ),
));

$response = curl_exec($curl);
echo '<br><br>';
curl_close($curl);
echo $response;