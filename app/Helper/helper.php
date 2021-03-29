<?php
namespace App\Helper;

use App\Models\Project;

class Helper
{
	public static function formatDate($date = '', $format = 'm/d/Y'){
	    if($date == '' || $date == null)
	        return;

	    return date($format, strtotime($date));
	}
}
?>