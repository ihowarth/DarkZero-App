
/**
 * @author	Martín Silva <msilva@itexico.com>
 * @version BlueWave__HTTP__May_2014
 */


/**
 * FUNCTIONS
 */

function request( options ){
	print( 'request(' + JSON.stringify( options ) + ')' );
	
	var http_client	= Ti.Network.createHTTPClient({ timeout : options.timeout || 30000 });
	var url			= options.url;
	var arguments	= options.arguments	|| {};
	var method		= options.method	|| 'GET';
	var format		= ( options.format == 'XML' ) ? 'XML' : 'JSON';
	var sync		= options.sync      ? false : true;
	var headers		= options.headers	|| {};
	var callback	= options.callback;
	var operator;
	var response;
	options.time	= new Date().getTime();
	if( method == 'GET' ){
		for( var argument in arguments ){
			operator = ( url.indexOf( '?' ) == -1 ? '?' : '&' );
			url += operator + argument + '=' + arguments[ argument ];	
		}
		arguments = {};
	}
	http_client.open( method , url , sync );
	for( var header in headers ){ http_client.setRequestHeader( header , headers[ header ] ); }
	http_client.onload	= onSuccess;
	http_client.onerror	= onError;
	http_client.send( arguments );
	
	
	function onSuccess(){
		options.time = ( ( new Date().getTime() - options.time ) * 0.001 ).toFixed( 2 );
		response = {
			success		: true,
			request		: options,
			data	 	: ( format == 'JSON' ? ( tryParse( http_client.responseText ) || http_client.responseData ) : http_client.responseXML )
		};
		print( 'result(' + JSON.stringify( response ) + ')' );
		execute( callback , http_client , response );
		return true;
	};
	
	
	function onError( error ){
		options.time = ( ( new Date().getTime() - options.time ) * 0.001 ).toFixed( 2 );
		response = {
			success	: false,
			request	: options,
			error	: error
		};
		print( 'result(' + JSON.stringify( response ) + ')' , 'error' );
		execute( callback , http_client , response );
		return true;
	};
	
	return http_client;
};


/**
 * TOOLS
 */

function execute( execution , self , event , callback ){
	( typeof execution	== 'function' ) && execution.call( self , event );
	( typeof callback	== 'function' ) && callback();
	return true;
};

function tryParse( string ){
	try{
		return JSON.parse( string );
	}
	catch( exception ){
		return false;
	}
};

function print( message , type ){
	console[ type || 'warn' ]( 'http__' + message );
	return true;
};


/**
 * Exports
 */

exports.sendRequest = request;