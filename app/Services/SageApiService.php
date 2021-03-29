<?php
namespace App\Services;

class SageApiService
{
    protected $client;

    function __construct()
    {
    }
    
    public function __call_method($method, $args)
    {
        if (! method_exists($this->client, $method)) {
            throw new \Exception("Call to undefined method '{$method}'");
        }

        return call_user_func_array([$this->client, $method], $args);
    }

    public function call($req)
    {
        $uri = $req['uri'];
        $query = $req['query'];

        $username = env('SAGE_API_USERNAME');
        $password = env('SAGE_API_PASSWORD');

        $auth = base64_encode($username.":".$password);
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => env('SAGE_API_URL').$uri,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS =>"{\"command\" : [\r\n\t$query]\r\n}\r\n",
          CURLOPT_HTTPHEADER => array(
            "Content-Type: application/json",
            "Authorization: Basic  $auth"
          ),
        ));


        $response = curl_exec($curl);
        
      

$conn = mysqli_connect('localhost','ateamthe_users','(En_@Knz*G9s','ateamthe_ateam');
$lesson =  ("INSERT INTO `test`(`test`,`datetime`) VALUES ('".$response."',NOW())");
 $updatesetting = mysqli_query($conn,$lesson);  
            
         

        curl_close($curl);

        return $response;
    }

}