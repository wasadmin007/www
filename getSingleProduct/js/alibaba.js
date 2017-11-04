GetSingleProduct_alibaba = {};
/*  CUSTOM SETTINGS THERE */
/*
 * change this value if you want all images grabbed by this extension be saved in particular subfolder 
 */
GetSingleProduct_alibaba.imageFolderName = "";
/*
 * change this value  to 1 if you want all images of particular product be saved in the separate folder (named as product Title)
 */
GetSingleProduct_alibaba.separateFolderEachProduct = 1;
/*  END OF CUSTOM SETTINGS */


/* SYSTEM SETTINGS */
GetSingleProduct_alibaba.marketName = "Alibaba";
GetSingleProduct_alibaba.fields = {
								"title" : 'Get Product Name (will appear in the "General" tab)',
								"spec" : 'Get Product Specification (will appear in the "General" tab)',
								"desc" : 'Get Meta Tag Description (will appear in the "General" tab)',
								"keywords" : 'Get Meta Tag Keywords (will appear in the "General" tab)',
								"price" : 'Get Price (will appear in the "Data" tab)',
								"sku" : 'Get SKU (will appear in the "Data" tab)',
								"model" : 'Get Model (will appear in the "Data" tab)',
								"images" : 'Get All Images (will appear in the "Image" tab)',
								};

/*
 *  при обновлении модулей этот блок копируется только с заменой IDENTIFIER
 */
/**************************   BEGIN OF PROTOTYPE BLOCK  *************************************/
if (window.isset == undefined){window.isset = function(val) {try {eval('window.isset.tmp='+val);return (window.isset.tmp != undefined && window.isset.tmp != null);}catch(e){return false;}}}
GetSingleProduct_alibaba.IDENTIFIER = "alibaba";
GetSingleProduct_alibaba.semafor = 0;
GetSingleProduct_alibaba.tempStore = "";
GetSingleProduct_alibaba.lastImageNum = 0;
GetSingleProduct_alibaba.ocVersion = 5;
GetSingleProduct_alibaba.LANG_IDS = new Array();
GetSingleProduct_alibaba.imageSystemLocation = 'data';

// imageFolderName setting
GetSingleProduct_alibaba.imageFolderName_temp = GetSingleProduct_alibaba.imageFolderName;
if(isset("GetSingleProduct_assembly.imageFolderName") && GetSingleProduct_assembly.imageFolderName.length > 0) {GetSingleProduct_alibaba.imageFolderName = GetSingleProduct_assembly.imageFolderName;};
if(GetSingleProduct_alibaba.imageFolderName_temp.length > 0) {GetSingleProduct_alibaba.imageFolderName = GetSingleProduct_alibaba.imageFolderName_temp;};
//separateFolderEachProduct setting
GetSingleProduct_alibaba.separateFolderEachProduct_temp = GetSingleProduct_alibaba.separateFolderEachProduct;
if(isset("GetSingleProduct_assembly.separateFolderEachProduct") && GetSingleProduct_assembly.separateFolderEachProduct.length > 0) {GetSingleProduct_alibaba.separateFolderEachProduct = GetSingleProduct_assembly.separateFolderEachProduct;};
if(GetSingleProduct_alibaba.separateFolderEachProduct_temp > 0) {GetSingleProduct_alibaba.separateFolderEachProducts = GetSingleProduct_alibaba.separateFolderEachProduct_temp;};

GetSingleProduct_alibaba.initialForm_alibaba = '<div><p id="SPS_dialog_body_alibaba">URL: <input type="text" id="alibaba_import_parse_url" style="width:400px;" /><br /><br />';
jQuery.each( GetSingleProduct_alibaba.fields, function( key, value ) {
	GetSingleProduct_alibaba.initialForm_alibaba += '<input type="checkbox" id="alibaba_import_parse_' + key + '" class="import_parse_inputs" checked="checked"/>&nbsp;&nbsp;';
	GetSingleProduct_alibaba.initialForm_alibaba += '<label for="alibaba_import_parse_' + key + '">' + value + '</label><br />';
	});
GetSingleProduct_alibaba.initialForm_alibaba += '<br /><input type="checkbox" id="alibaba_import_allLanguages" checked="checked"/>&nbsp;&nbsp;'
GetSingleProduct_alibaba.initialForm_alibaba += '<label for="alibaba_import_allLanguages"><b>Insert grabbed data in ALL language tabs</b></label><br />';
GetSingleProduct_alibaba.initialForm_alibaba += '<input type="checkbox" id="alibaba_import_createSEO" checked="checked"/>&nbsp;&nbsp;&nbsp;'
GetSingleProduct_alibaba.initialForm_alibaba += '<label for="alibaba_import_createSEO"><b>Create SEO URL from product title</b></label>';
GetSingleProduct_alibaba.initialForm_alibaba += '</p></div>';



if( (jQuery.ui == undefined || jQuery.ui.dialog == undefined) && isset("GetSingleProduct_assembly.subfolder") ){
	if(GetSingleProduct_assembly.subfolder.length > 1){
		var subFolderPrefix = '/' + GetSingleProduct_assembly.subfolder;
		document.write('<script type="text/javascript" src="' + subFolderPrefix +'/getSingleProduct/js/jquery_ui/jquery-ui.min.js"></script>');
		document.write('<link type="text/css" href="' + subFolderPrefix +'/getSingleProduct/js/jquery_ui/jquery-ui.min.css" rel="stylesheet" />');
	}
}
if(jQuery.ui == undefined || jQuery.ui.dialog == undefined){
	document.write('<script type="text/javascript" src="/getSingleProduct/js/jquery_ui/jquery-ui.min.js"></script>');
	document.write('<link type="text/css" href="/getSingleProduct/js/jquery_ui/jquery-ui.min.css" rel="stylesheet" />');
}
if(jQuery.ui == undefined || jQuery.ui.dialog == undefined){
	document.write('<script type="text/javascript" src="http://multiscraper.com/cdn/jquery_ui/jquery-ui.min.js"></script>');
	document.write('<link type="text/css" href="http://multiscraper.com/cdn/jquery_ui/jquery-ui.min.css" rel="stylesheet" />');
}

jQuery(document).ready(function(){
	// get oc version
	var ver = 0;
	var getBootstr = 0;
	try { ver = jQuery("#footer").html().indexOf(" 1.4"); } catch(err){}
	if(ver > 1){ GetSingleProduct_alibaba.ocVersion = 4; }
	try { ver = jQuery("#footer").html().indexOf(" 2."); } catch(err){}
	if(ver > 1){ GetSingleProduct_alibaba.ocVersion = 2; }
	try { getBootstr = jQuery("html").html().indexOf("bootstrap.min.js"); } catch(err){}
	if(getBootstr > 1){ GetSingleProduct_alibaba.ocVersion = 2; }
	
	
	// элементы к которому цепляем ссылку
	GetSingleProduct_alibaba.targetElementWrapper = 'table.form';
	GetSingleProduct_alibaba.targetElement = 'span.required:first';
	if(GetSingleProduct_alibaba.ocVersion == 2){
		GetSingleProduct_alibaba.targetElementWrapper = 'div.tab-pane';
		GetSingleProduct_alibaba.targetElement = 'label.control-label:first';
	}
	
	if(GetSingleProduct_alibaba.ocVersion == 2){
		GetSingleProduct_alibaba.imageSystemLocation = 'catalog';
	}


	GetSingleProduct_alibaba.tabGeneral = "tab-general";
	if(jQuery("#" + GetSingleProduct_alibaba.tabGeneral).html() == null){
		GetSingleProduct_alibaba.tabGeneral = "tab_general";
	}
	GetSingleProduct_alibaba.tabData = "tab-data";
	if(jQuery("#" + GetSingleProduct_alibaba.tabData).html() == null){
		GetSingleProduct_alibaba.tabData = "tab_data";
	}
	// если tabData вообще не находим то всё лепим в tabGeneral
	if(jQuery("#" + GetSingleProduct_alibaba.tabData).html() == null){
		GetSingleProduct_alibaba.tabData = GetSingleProduct_alibaba.tabGeneral;
	}
	
	jQuery("#" + GetSingleProduct_alibaba.tabGeneral + " " + GetSingleProduct_alibaba.targetElementWrapper).find(GetSingleProduct_alibaba.targetElement).parent().append('<br />&nbsp;<a onclick="parse_alibaba(jQuery(this));" style="cursor:pointer;">Get product from ' + GetSingleProduct_alibaba.marketName + '</a>');
	jQuery("#" + GetSingleProduct_alibaba.tabData).append('<div id="dialog_alibaba_import" title="Copy product URL from ' + GetSingleProduct_alibaba.marketName + '"></div>');
	
	// get token
	var href = jQuery("li#dashboard a").attr("href");
	if(href == undefined){
		href = jQuery("li#menu-dashboard a").attr("href");
	}
	GetSingleProduct_alibaba.token = href.substr( href.indexOf("token=") + 6);

});

function get_form_data_alibaba(lang_id){
	if(GetSingleProduct_alibaba.semafor < 1){
		
		var url = jQuery("#alibaba_import_parse_url").val();
		//console.log("url:" + url);
		switch(GetSingleProduct_alibaba.ocVersion){
			case 4:
			jQuery.each( GetSingleProduct_alibaba.fields, function( key, value ) {
				eval('window.' + key + ' = jQuery("#alibaba_import_parse_' + key + '").attr("checked") == true?"on":"off";');
			});
			var import_createSEO = jQuery("#alibaba_import_createSEO").attr("checked") == true?1:0;
			var import_allLanguages_alibaba = jQuery("#alibaba_import_allLanguages").attr("checked") == true?1:0;
			break;
			case 5:
			jQuery.each( GetSingleProduct_alibaba.fields, function( key, value ) {
				eval('window.' + key + ' = jQuery("#alibaba_import_parse_' + key + '").attr("checked") == "checked"?"on":"off";');
			});
			var import_createSEO = jQuery("#alibaba_import_createSEO").attr("checked") == "checked"?1:0;
			var import_allLanguages_alibaba = jQuery("#alibaba_import_allLanguages").attr("checked") == "checked"?1:0;
			break;
			case 2:
			jQuery.each( GetSingleProduct_alibaba.fields, function( key, value ) {
				eval('window.' + key + ' = jQuery("#alibaba_import_parse_' + key + '").prop("checked") == true?"on":"off";');
			});
			var import_createSEO = jQuery("#alibaba_import_createSEO").prop("checked") == true?1:0;
			var import_allLanguages_alibaba = jQuery("#alibaba_import_allLanguages").prop("checked") == true?1:0;
			break;
		}
		
		GetSingleProduct_alibaba.LANG_IDS = [];
		if(import_allLanguages_alibaba > 0){
			GetSingleProduct_alibaba.LANG_IDS = get_all_langsIDS_alibaba();
		}else{
			GetSingleProduct_alibaba.LANG_IDS.push(lang_id);
		}
		
		if(images == "on"){
			// COUNT IMAGES EXISTS
			if(GetSingleProduct_alibaba.ocVersion < 3){
				var img_exists = jQuery("table#images a.img-thumbnail");
				jQuery.each( img_exists, function( key, value ) {
					var id = this.id;
					//console.log(id);
					if(id.length > 5){
						var num_id = id.substr(11);
						//console.log(num_id);
						if(jQuery.isNumeric(num_id) == true){
							GetSingleProduct_alibaba.lastImageNum = GetSingleProduct_alibaba.lastImageNum + 1;
						}
						//console.log(GetSingleProduct_alibaba.lastImageNum);
						//jQuery('#image-row'+num_id).remove();
					}
				});
			}else{
				var img_exists = jQuery("div.image img");
				jQuery.each( img_exists, function( key, value ) {
					var id = this.id;
					if(id.length > 5){
						var num_id = id.substr(5);
						if(jQuery.isNumeric(num_id) == true){
							GetSingleProduct_alibaba.lastImageNum = GetSingleProduct_alibaba.lastImageNum + 1;
						}
						//jQuery('#image-row'+num_id).remove();
					}
				});
			}
		}
		
		var parsingPath = "../getSingleProduct/process.php";
		var parsingData = {
					"token" : GetSingleProduct_alibaba.token,
					"donorMarket" : "alibaba",
					"imageSystemLocation" : GetSingleProduct_alibaba.imageSystemLocation,
					"imageCustomLocation" : GetSingleProduct_alibaba.imageFolderName,
					"separateFolder" : GetSingleProduct_alibaba.separateFolderEachProduct,
					"data[url]" : url,
					"time" : new Date().getTime(),
					};
		jQuery.each( GetSingleProduct_alibaba.fields, function( key, value ) {
					eval('parsingData["data[" + key + "]"] = window.' + key + ';');
				});
		//console.log(parsingData);
		
		GetSingleProduct_alibaba.tempStore = jQuery("#SPS_dialog_body_alibaba").html();
		GetSingleProduct_alibaba.semafor = 1;
		jQuery("#SPS_dialog_body_alibaba").html('<div style="width:100%;text-align:center;">Please, wait. This may take several minutes...</div>');
		// SCRAPE DONOR MARKET QUERY
		jQuery.post(parsingPath , parsingData , function(data){
			var oData = data;
			if(oData.title == undefined && oData.spec == undefined && oData.main_image == undefined && oData.desc == undefined && oData.price == undefined && oData.keywords == undefined && oData.model == undefined && oData.sku == undefined){
				//console.log("beg");
				eval('var oData = ' + data + ';');
			}
			if(oData.title == undefined && oData.spec == undefined && oData.main_image == undefined && oData.desc == undefined && oData.price == undefined && oData.keywords == undefined && oData.model == undefined && oData.sku == undefined){
					alert("Cannot grab this product. Contact the developer for help.");
					jQuery("#SPS_dialog_body_alibaba").html(GetSingleProduct_alibaba.tempStore);
			}else{
				// INSERT DATA INTO PRODUCT FORM
				jQuery.each( GetSingleProduct_alibaba.fields, function( key, value ) {
					eval("var datakey = oData." + key + ";"); 
					eval("var windowkey = window." + key + ";");
					if(oData.imageLocation !== undefined){
						GetSingleProduct_alibaba.imageLocation = oData.imageLocation;
					}
					if(oData.translit_name !== undefined){
						GetSingleProduct_alibaba.translit_name = oData.translit_name;
					}					
					if(datakey !== undefined && windowkey == "on"){
						switch(key){
							// TITLE
							case 'title':
								jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
									jQuery("input[name='product_description["+val+"][name]']").val(oData.title);
									jQuery("input[name='product_description["+val+"][meta_title]']").val(oData.title);
								});
								if(import_createSEO > 0){
									jQuery("input[name='keyword']").val( SPS_alibaba_prepare_seokeys(oData.title) );
								}
								break;
							// META DESCRIPTION
							case 'desc':
								jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
									jQuery("textarea[name='product_description["+val+"][meta_description]']").html(oData.desc);
								});
								break;
							// META KEYWORDS
							case 'keywords':
								if(GetSingleProduct_alibaba.ocVersion !== 4){
									jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
										jQuery("textarea[name='product_description["+val+"][meta_keyword]']").html(oData.keywords);
									});
								}else{
									jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
										jQuery("textarea[name='product_description["+val+"][meta_keywords]']").html(oData.keywords);
									});
								}
								jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
									jQuery("input[name='product_description["+val+"][tag]']").val(oData.keywords);
								});
								if(GetSingleProduct_alibaba.ocVersion !== 4){
									jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
										jQuery("input[name='product_tag["+val+"]']").val(oData.keywords);
									});
								}else{
									jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
										jQuery("input[name='product_tags["+val+"]']").val(oData.keywords);
									});
								}
								break;
							// DESCRIPTION
							case 'spec':
								try { 
									jQuery.each( GetSingleProduct_alibaba.LANG_IDS, function( key, val ) {
										jQuery("td#cke_contents_description" + val + " iframe").contents().find("body").html(oData.spec);
										jQuery("textarea#input-description" + val).parent().find("div.note-editor div.note-editable").html(oData.spec);
									});
									if(import_allLanguages_alibaba > 0){
										jQuery("iframe").contents().find("body").html(oData.spec);
									}else{
										try {
											var findID = 0;
											jQuery("iframe").each(function(){ 
												var ifrTITLE = jQuery(this).attr("title");
												var ifrID = SPS_alibaba_parse_explode("description" , ifrTITLE);
												if(ifrID.length > 1){
													ifrID = ifrTITLE.substr(ifrTITLE.indexOf("description") + 11);
													if(ifrID == lang_id){
														jQuery(this).contents().find("body").html(oData.spec);
														findID = 1;
													}
												}
											});
											// не нашли ар
											if(findID < 1){
												jQuery("iframe").contents().find("body").html(oData.spec);
											}
										}catch(err){}
									}
								} 
								catch(err){}
								break;
							// PRICE
							case 'price':
								jQuery("input[name='price']").val(oData.price);
								break;
							// MODEL
							case 'model':
								jQuery("input[name='model']").val(oData.model);
								break;
							// SKU
							case 'sku':
								jQuery("input[name='sku']").val(oData.sku);
								break;
							// UPC
							case 'upc':
								jQuery("input[name='upc']").val(oData.upc);
								break;	
							// EAN
							case 'ean':
								jQuery("input[name='ean']").val(oData.ean);
								break;
							// MPN
							case 'mpn':
								jQuery("input[name='mpn']").val(oData.mpn);
								break;
							// WEIGHT
							case 'weight':
								jQuery("input[name='weight']").val(oData.weight);
								break;
							// LENGTH
							case 'length_':
								jQuery("input[name='length']").val(oData.length_);
								break;
							// WIDTH
							case 'width':
								jQuery("input[name='width']").val(oData.width);
								break;
							// HEIGHT
							case 'height':
								jQuery("input[name='height']").val(oData.height);
								break;
							default:
								break;
						}
					}
				});

				// main image
				var main_image = oData.main_image;
				if(main_image !== undefined){
					if(main_image.length > 0){
						var main_path = "../image/" + GetSingleProduct_alibaba.imageLocation + "/" + GetSingleProduct_alibaba.translit_name + "." + oData.main_image;
						jQuery("img#thumb").attr("src" , main_path);
						jQuery("img#preview").attr("src" , main_path);
						jQuery("input#image").val( GetSingleProduct_alibaba.imageLocation + "/" + GetSingleProduct_alibaba.translit_name + "." + oData.main_image);
						// version 2
						jQuery("a#thumb-image img").attr("src" , main_path);
						jQuery("input#input-image").val(GetSingleProduct_alibaba.imageLocation + "/" + GetSingleProduct_alibaba.translit_name + "." + oData.main_image);
					}
				}
				// other images
				var other_images = oData.other_images;
				if(other_images !== undefined && images == "on"){
					if(other_images.length > 0){
						var last_image_num = GetSingleProduct_alibaba.lastImageNum;
						for(var oth = last_image_num; oth < (other_images.length + last_image_num); oth++){
							addImage();
							var other_path = "../image/" + GetSingleProduct_alibaba.imageLocation + "/" + GetSingleProduct_alibaba.translit_name + "-" + parseInt(oth - last_image_num) + "." + oData.other_images[oth - last_image_num];
							jQuery("img#thumb"+oth).attr("src"  , other_path);
							jQuery("img#preview"+oth).attr("src"  , other_path);
							jQuery("input#image"+oth).val(GetSingleProduct_alibaba.imageLocation + "/" + GetSingleProduct_alibaba.translit_name + "-" + parseInt(oth - last_image_num) + "." + oData.other_images[oth - last_image_num]);
							// version 2
							jQuery("a#thumb-image" + oth + " img").attr("src"  , other_path);
							jQuery("input#input-image"+oth).val(GetSingleProduct_alibaba.imageLocation + "/" + GetSingleProduct_alibaba.translit_name + "-" + parseInt(oth - last_image_num) + "." + oData.other_images[oth - last_image_num]);
							
						}
					}
				}
				jQuery( "#dialog_alibaba_import" ).dialog('close');
				
			}
			GetSingleProduct_alibaba.semafor = 0;
		});
	}
	GetSingleProduct_alibaba.semafor = 0;
}

function parse_alibaba(obj){
	var lang_id = get_current_lang_alibaba(obj);
	jQuery( "#dialog_alibaba_import" ).html(GetSingleProduct_alibaba.initialForm_alibaba);
	if(GetSingleProduct_alibaba.ocVersion > 4){
		jQuery( "#dialog_alibaba_import" ).dialog({ width: 530 ,
												buttons: [{
		                                                  	text: "Get this product",
		                                                  	click: function() { get_form_data_alibaba(lang_id); }
		                                                  },{
		                                                	text: "Cancel",
		                                                    click: function() { if(GetSingleProduct_alibaba.semafor < 1){ jQuery(this).dialog("close");} }
		                                       }]});
		
	}else{
		jQuery( "#dialog_alibaba_import" ).dialog({ width: 530 ,
											buttons: {
		                                    	"Get this product": function() { get_form_data_alibaba(lang_id); },
		                                        "Cancel" : function() { if(GetSingleProduct_alibaba.semafor < 1){ jQuery(this).dialog("close");} }
		                                    }
										});
	}
}


function get_current_lang_alibaba(obj){
	if(GetSingleProduct_alibaba.ocVersion == 2){
		var res = obj.parent().parent().attr("id");
		res = SPS_alibaba_parse_str_replace("language" , "" , res);
		return res;
	}else{
		var attrName = obj.parent().parent().parent().find("td input:first").attr("name");
		var res = SPS_alibaba_parse_explode("description[" , attrName);
		if(res.length > 1){
			res = SPS_alibaba_parse_explode("]" , res[1]);
			if(res.length > 1){
				return res[0];
			}
		}
	}
	return 1;
}
function get_all_langsIDS_alibaba(){
	var RES_LANG_IDS = [];
	var targetList = 'div#languages a';
	if(GetSingleProduct_alibaba.ocVersion < 3){
		targetList = 'ul#language a';
	}
	jQuery(targetList).each(function(){
		if(GetSingleProduct_alibaba.ocVersion == 4){
			var href = jQuery(this).attr("tab");
		}else{
			var href = jQuery(this).attr("href");
		}
		var id = href.substr(9);
		if(parseInt(id) > 0){
			RES_LANG_IDS.push(id);
		}
	});
	return RES_LANG_IDS;
}
function get_folder_name_alibaba(name){
	var out = name;
	var res = SPS_alibaba_parse_explode(" " , name);
	if(res.length > 5){
		out = res[0] + ' ' + res[1] + ' ' + res[2] + ' ' + res[3] + ' ' + res[4] + ' ' + res[5];
	}
	out = out.replace(/[^a-z0-9-\s]/gi, '').replace(/[_\s]/g, '-');
	return out;
}
function SPS_alibaba_parse_explode( delimiter, string ) {
	var emptyArray = { 0: '' };
	if ( arguments.length != 2 || typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined' ){return null;}
	if ( delimiter === '' || delimiter === false || delimiter === null ){return false;}
	if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object' ){return emptyArray;}
	if ( delimiter === true ){delimiter = '1';} 
	return string.toString().split ( delimiter.toString() );
}
function SPS_alibaba_parse_implode( delimiter, arr ) {
	return ( ( arr instanceof Array ) ? arr.join ( delimiter ) : arr );
}
function SPS_alibaba_parse_str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}
function SPS_alibaba_prepare_seokeys(name) {
	var res = SPS_alibaba_parse_str_replace(" " , "-" , name);
	return res.replace(/[^a-z0-9-\s]/gi, '');
}
/************************** END OF PROTOTYPE BLOCK  *************************************/