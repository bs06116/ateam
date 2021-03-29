<?php

$username = 'theappguysapi';
$password = 'theappguysapi';

//$username = 'usacom\sv_sageweb';
//$password = 'gzD9T4Ww!4Q0wdWc';


echo $auth = base64_encode($username.":".$password);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://24.237.121.51/EIDSAGE100DIS/API/AR_JOB_CREATE?company=Default&action_type=I",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{\"command\" : \r\n\t[\r\n\t\t{\"recnum\":\"202001\",\r\n\t\t\"jobnme\":\"Project 1\",\r\n\t\t\"shtnme\":\"Project 1\",\r\n\t\t\"status\":\"4\",\r\n\t\t\"jobtyp\":\"\",\r\n\t\t\"clnnum\":\"\",\r\n\t\t\"addrs1\":\"\",\r\n\t\t\"addrs2\":\"\",\r\n\t\t\"ctynme\":\"\",\r\n\t\t\"state_\":\"\",\r\n\t\t\"zipcde\":\"\",\r\n\t\t\"slstax\":\"\",\r\n\t\t\"lcltax\":\"\",\r\n\t\t\"dscdte\":\"\",\r\n\t\t\"duedte\":\"\",\r\n\t\t\"dsccnt\":\"\",\r\n\t\t\"finchg\":\"\",\r\n\t\t\"retain\":\"\",\r\n\t\t\"cntrct\":\"\",\r\n\t\t\"lgract\":\"4000\",\r\n\t\t\"dptmnt\":\"\",\r\n\t\t\"connum\":\"\",\r\n\t\t\"pchord\":\"\",\r\n\t\t\"pstwip\":\"0\",\r\n\t\t\"crtfid\":\"0\",\r\n\t\t\"fedsck\":\"0\",\r\n\t\t\"achtct\":\"\",\r\n\t\t\"lender\":\"\",\r\n\t\t\"sprvsr\":\"\",\r\n\t\t\"slsemp\":\"\",\r\n\t\t\"estemp\":\"\",\r\n\t\t\"usrdf1\":\"\",\r\n\t\t\"usrdf2\":\"\",\r\n\t\t\"stmeml\":\"\",\r\n\t\t\"ncrtck\":\"0\",\r\n\t\t\"biddte\":\"\",\r\n\t\t\"plnrcv\":\"\",\r\n\t\t\"actbid\":\"\",\r\n\t\t\"ctcdte\":\"\",\r\n\t\t\"prelen\":\"\",\r\n\t\t\"sttdte\":\"2020-06-18\",\r\n\t\t\"cmpdte\":\"\",\r\n\t\t\"lenfld\":\"\",\r\n\t\t\"lenrls\":\"\",\r\n\t\t\"lotclr\":\"\",\r\n\t\t\"lotprm\":\"\",\r\n\t\t\"plnprc\":\"\",\r\n\t\t\"actprc\":\"\",\r\n\t\t\"estdte\":\"\",\r\n\t\t\"actdte\":\"\",\r\n\t\t\"lotnum\":\"\",\r\n\t\t\"modnme\":\"\",\r\n\t\t\"sqarft\":\"\",\r\n\t\t\"ntetxt\":\"\"\r\n\t\t},\r\n\t\t{\"recnum\":\"202002\",\r\n\t\t\"jobnme\":\"Project 2\",\r\n\t\t\"shtnme\":\"Project 2\",\r\n\t\t\"status\":\"4\",\r\n\t\t\"jobtyp\":\"\",\r\n\t\t\"clnnum\":\"\",\r\n\t\t\"addrs1\":\"\",\r\n\t\t\"addrs2\":\"\",\r\n\t\t\"ctynme\":\"\",\r\n\t\t\"state_\":\"\",\r\n\t\t\"zipcde\":\"\",\r\n\t\t\"slstax\":\"\",\r\n\t\t\"lcltax\":\"\",\r\n\t\t\"dscdte\":\"\",\r\n\t\t\"duedte\":\"\",\r\n\t\t\"dsccnt\":\"\",\r\n\t\t\"finchg\":\"\",\r\n\t\t\"retain\":\"\",\r\n\t\t\"cntrct\":\"\",\r\n\t\t\"lgract\":\"4000\",\r\n\t\t\"dptmnt\":\"\",\r\n\t\t\"connum\":\"\",\r\n\t\t\"pchord\":\"\",\r\n\t\t\"pstwip\":\"0\",\r\n\t\t\"crtfid\":\"0\",\r\n\t\t\"fedsck\":\"0\",\r\n\t\t\"achtct\":\"\",\r\n\t\t\"lender\":\"\",\r\n\t\t\"sprvsr\":\"\",\r\n\t\t\"slsemp\":\"\",\r\n\t\t\"estemp\":\"\",\r\n\t\t\"usrdf1\":\"\",\r\n\t\t\"usrdf2\":\"\",\r\n\t\t\"stmeml\":\"\",\r\n\t\t\"ncrtck\":\"0\",\r\n\t\t\"biddte\":\"\",\r\n\t\t\"plnrcv\":\"\",\r\n\t\t\"actbid\":\"\",\r\n\t\t\"ctcdte\":\"\",\r\n\t\t\"prelen\":\"\",\r\n\t\t\"sttdte\":\"2020-06-15\",\r\n\t\t\"cmpdte\":\"\",\r\n\t\t\"lenfld\":\"\",\r\n\t\t\"lenrls\":\"\",\r\n\t\t\"lotclr\":\"\",\r\n\t\t\"lotprm\":\"\",\r\n\t\t\"plnprc\":\"\",\r\n\t\t\"actprc\":\"\",\r\n\t\t\"estdte\":\"\",\r\n\t\t\"actdte\":\"\",\r\n\t\t\"lotnum\":\"\",\r\n\t\t\"modnme\":\"\",\r\n\t\t\"sqarft\":\"\",\r\n\t\t\"ntetxt\":\"\"\r\n\t\t},\r\n\t\t{\"recnum\":\"202003\",\r\n\t\t\"jobnme\":\"Project 3\",\r\n\t\t\"shtnme\":\"Project 3\",\r\n\t\t\"status\":\"4\",\r\n\t\t\"jobtyp\":\"\",\r\n\t\t\"clnnum\":\"\",\r\n\t\t\"addrs1\":\"\",\r\n\t\t\"addrs2\":\"\",\r\n\t\t\"ctynme\":\"\",\r\n\t\t\"state_\":\"\",\r\n\t\t\"zipcde\":\"\",\r\n\t\t\"slstax\":\"\",\r\n\t\t\"lcltax\":\"\",\r\n\t\t\"dscdte\":\"\",\r\n\t\t\"duedte\":\"\",\r\n\t\t\"dsccnt\":\"\",\r\n\t\t\"finchg\":\"\",\r\n\t\t\"retain\":\"\",\r\n\t\t\"cntrct\":\"\",\r\n\t\t\"lgract\":\"4000\",\r\n\t\t\"dptmnt\":\"\",\r\n\t\t\"connum\":\"\",\r\n\t\t\"pchord\":\"\",\r\n\t\t\"pstwip\":\"0\",\r\n\t\t\"crtfid\":\"0\",\r\n\t\t\"fedsck\":\"0\",\r\n\t\t\"achtct\":\"\",\r\n\t\t\"lender\":\"\",\r\n\t\t\"sprvsr\":\"\",\r\n\t\t\"slsemp\":\"\",\r\n\t\t\"estemp\":\"\",\r\n\t\t\"usrdf1\":\"\",\r\n\t\t\"usrdf2\":\"\",\r\n\t\t\"stmeml\":\"\",\r\n\t\t\"ncrtck\":\"0\",\r\n\t\t\"biddte\":\"\",\r\n\t\t\"plnrcv\":\"\",\r\n\t\t\"actbid\":\"\",\r\n\t\t\"ctcdte\":\"\",\r\n\t\t\"prelen\":\"\",\r\n\t\t\"sttdte\":\"2020-06-14\",\r\n\t\t\"cmpdte\":\"\",\r\n\t\t\"lenfld\":\"\",\r\n\t\t\"lenrls\":\"\",\r\n\t\t\"lotclr\":\"\",\r\n\t\t\"lotprm\":\"\",\r\n\t\t\"plnprc\":\"\",\r\n\t\t\"actprc\":\"\",\r\n\t\t\"estdte\":\"\",\r\n\t\t\"actdte\":\"\",\r\n\t\t\"lotnum\":\"\",\r\n\t\t\"modnme\":\"\",\r\n\t\t\"sqarft\":\"\",\r\n\t\t\"ntetxt\":\"\"\r\n\t\t}\r\n\t]\r\n\r\n}\r\n",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "Authorization: Basic  $auth"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;