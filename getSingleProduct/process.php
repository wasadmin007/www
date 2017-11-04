<?php
require_once("functions.php");
// hack for alibaba
if(stripos($_POST['donorMarket'] , '1188.c') > 0 || stripos($_POST['donorMarket'] , '1688.c') > 0){
    $_POST['donorMarket'] = 'alibaba';
}
require_once($_POST['donorMarket'] . ".php");
$marketsException = array("play" , "ekey" , "taobao" , "krauta", 'alibaba', "dadonline");
// check for ajax
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && isset($_POST['data']) && isset($_POST['token']) && isset($_POST['data']['url'])){
	
	$data = array();
	foreach($_POST['data'] as $key => $value){$data[$key] = $value;}
	
	$out = array();
	
	// check url
	if(strpos($data['url'] , $_POST['donorMarket']) || in_array( $_POST['donorMarket'] , $marketsException)){
	    
		// try to get this url
		$url = $data['url'];
		//echo $_POST['donorMarket'];exit;
		if(function_exists("mspro_" . $_POST['donorMarket'] ."_getUrl")){
		    $html = call_user_func("mspro_" . $_POST['donorMarket'] ."_getUrl" , $url);
		}else{
		    $html = getUrl($url);
		}
	    
		//$html = file_get_contents($url);
		//echo $html;exit;

		$out['sku'] = '';$out['model'] = '';
		if(isset( $data["title"]) && $data["title"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_title")){$out['title'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_title" , $html);}
		if(isset($data["model"]) && $data["model"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_model")){$out['model'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_model" , $html);}
		if(isset($data["sku"]) && $data["sku"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_sku")){$out['sku'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_sku" , $html);}
		if(isset($data["upc"]) && $data["upc"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_upc")){$out['upc'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_upc" , $html);}
		if(isset($data["ean"]) && $data["ean"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_ean")){$out['ean'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_ean" , $html);}
		if(isset($data["mpn"]) && $data["mpn"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_mpn")){$out['mpn'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_mpn" , $html);}
		if(isset($data["isbn"]) && $data["isbn"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_isbn")){$out['isbn'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_isbn" , $html);}
		if($_POST['donorMarket'] == "amazon" && function_exists("mspro_amazon_asin")){$out['asin'] = call_user_func("mspro_amazon_asin" , $html);}
		if(isset($data["locations"]) && $data["locations"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_locations")){$out['locations'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_locations" , $html);}
		if(isset($data["weight"]) && $data["weight"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_weight")){$out['weight'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_weight" , $html);}
		if(isset($data["length_"]) && $data["length_"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_length_")){$out['length_'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_length_" , $html);}
		if(isset($data["width"]) && $data["width"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_width")){$out['width'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_width" , $html);}
		if(isset($data["height"]) && $data["height"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_height")){$out['height'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_height" , $html);}
		if(isset($data["price"]) && $data["price"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_price")){$out['price'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_price" , $html);}
		
		$out['translit_name'] = getSeoUrl($out['title'] , $out['sku'] , $out['model']);
		$folder_name = $out['translit_name'];
		// for amazon we will name folder as ASIN not as product title
		if(isset($out['asin'])){
		    $folder_name = $out['asin'];
		}
		$out['imageLocation'] = getimageLocation($_POST['imageSystemLocation'] , $_POST['imageCustomLocation'] , $_POST['separateFolder'] , $folder_name);
		//echo $out['imageLocation'];exit;
		
		if(isset($data["spec"]) && $data["spec"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_description")){
		    $out["spec"] = call_user_func("mspro_" . $_POST['donorMarket'] ."_description" , $html , $url);
		    $out["spec"] = processSpecImages($out["spec"] , $out['translit_name'] , $out['imageLocation']);
		}
		if(isset($data["keywords"]) && $data["keywords"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_meta_keywords")){$out['keywords'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_meta_keywords" , $html);}
		if(isset($data["desc"]) && $data["desc"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_meta_description")){$out['desc'] = call_user_func("mspro_" . $_POST['donorMarket'] ."_meta_description" , $html);}


		$out['images'] = array();
		$main_image = false;
		$main_image = call_user_func("mspro_" . $_POST['donorMarket'] ."_main_image" , $html , $url);
		if($main_image){$out['images'][] = $main_image;}
		
		$color_images = false;
		if(isset($data["color_images"]) && $data["color_images"] == "on"){
		    $color_images = true;
		}
		if(isset($data["images"]) && $data["images"] == "on" && function_exists("mspro_" . $_POST['donorMarket'] ."_other_images")){
		    $out['images'] = array_merge($out['images']  , call_user_func("mspro_" . $_POST['donorMarket'] ."_other_images" , $html , $url , $color_images));
		}
		
		$temps_imgs = array();
		foreach($out['images'] as $img){
			$temps_imgs[] = $img;
		}
		$out['images'] = $temps_imgs;
	
		/*********************/
		/*   UPLOAD IMAGES   */
		/*********************/
		$out['images'] = array_unique($out['images']); 
		//echo '<pre>'.print_r($out , 1).'</pre>';exit;
		
		// upload images
		$out['other_images'] = array();
		if($data["images"] == "on"){
			$cnt_others = 0;
			if(count($out['images']) > 0){
				foreach($out['images'] as $key => $image){
					if(!empty($image)){
						if($key < 1){ 
						    $out['main_image'] = saveImage($out['imageLocation'] , $out['translit_name'] , $image ,  $cnt_others , false , true);
						}else{
						    $out['other_images'][] = saveImage($out['imageLocation'] , $out['translit_name'] , $image ,  $cnt_others);
						    $cnt_others++;
						}
					}
				}
				$out['other_images_cnt'] = $cnt_others;
			}
		}
	}else{
	    echo "URL does not contains donor market's domain name";exit;
	}
	header('Content-type: application/json; charset=utf-8');
	//echo '<pre>'.print_r($out , 1).'</pre>';exit;
	echo json_encode($out);	
}else{echo 'foad';exit;}

?>