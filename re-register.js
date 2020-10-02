// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';

var rand = function(maximum,minimum){
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

var randomByte = function() {
  return Math.round(Math.random()*256);
}

var randomIp = function() {
  var ip = randomByte() +'.' +
           randomByte() +'.' +
           randomByte() +'.' +
           randomByte();
  if (isPrivate(ip)) return randomIp();
  return ip;
}

var isPrivate = function(ip) {
  return /^10\.|^192\.168\.|^172\.16\.|^172\.17\.|^172\.18\.|^172\.19\.|^172\.20\.|^172\.21\.|^172\.22\.|^172\.23\.|^172\.24\.|^172\.25\.|^172\.26\.|^172\.27\.|^172\.28\.|^172\.29\.|^172\.30\.|^172\.31\./.test(ip);
}

var call_id = Math.random().toString(36).substring(7) + '@127.0.0.1';
var caller = 'From-hepgenjs';
var caller_e164 = '+'+rand(1,99)+'555'+rand(100000,999999);
var callee = '+'+rand(1,99)+'555'+rand(100000,999999);
var domain = 'sipcapture.org';
var priv_ip = '192.168.11.'+rand(10,200);
var priv_nat =randomIp();
var pub_ip = randomIp();
var peer_ip='66.55.44.'+rand(80,88);
var cseq = rand(1,1000000)
var localhost = '127.0.0.1';

var config = {
        NAME: 'SIP OPTIONS Ping',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9063,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [
        {
                // SIP OPTIONS Request
    		  rcinfo: {
    			  type: 'HEP',
    			  version: 3,
    			  payload_type: 1,
    			  captureId: '2001',
    			  capturePass: 'myHep',
    			  ip_family: 2,
    			  protocol: 17,
    			  proto_type: 1,
    			  correlation_id: call_id,
    			  srcIp: priv_nat,
    			  dstIp: pub_ip,
    			  srcPort: 5064,
    	  		dstPort: 5060
    		    },
    		    pause: 0,
        	payload: 
			'REGISTER sip:'+callee+'@'+domain+';user=phone SIP/2.0\r\n' +
			'Via: SIP/2.0/UDP '+pub_ip+':5064;branch=z9hG4bK123456789123456789;rport\r\n' +
			'From: "'+caller+'" <sip:'+caller_e164+'@'+priv_ip+'>;tag=8031EC90-718C6673-1\r\n' +
			'To: <sip:'+caller_e164+'@'+domain+'>\r\n' +
			'CSeq: '+cseq+' REGISTER\r\n' +
			'Call-ID: '+call_id+'\r\n' +
			'Contact: <sip:'+caller+'@'+pub_ip+'>;methods="INVITE,ACK,BYE,CANCEL,OPTIONS,INFO,MESSAGE,SUBSCRIBE,NOTIFY,PRACK,UPDATE,REFER";+sip.instance="<urn:uuid:a710b2d1-5b28-52ce-b0e2-9bd2b1f474e3>";reg-id=1\r\n' +
			'User-Agent: Hepgen-JS\r\n' +
			'Accept-Language: en\r\n' +
			'Authorization: Digest username="'+caller+'", realm="'+domain+'", nonce="471bd3c8-02c1-11eb-88fc-d93112cf548d", qop=auth, cnonce="hBu2qFpX4Hprn6k", nc=00000514, uri="sip:'+domain+'", response="15402f2ec1701a48eb0b702de322915b", algorithm=MD5\r\n' +
			'Max-Forwards: 70\r\n' +
			'Expires: 300\r\n' +
			'Content-Length: 0\r\n' +
			'\r\n\r\n'  
	},
          {
                // SIP Response
    		  rcinfo: {
    			  type: 'HEP',
    			  version: 3,
    			  payload_type: 1,
    			  captureId: '2001',
    			  capturePass: 'myHep',
    			  ip_family: 2,
    			  protocol: 17,
    			  proto_type: 1,
    			  correlation_id: call_id,
    			  srcIp: priv_ip,
    			  dstIp: pub_ip,
    			  srcPort: 5060,
    	  		  dstPort: 5064
    		    },
    		    pause: 100,
            	    payload: 
					'SIP/2.0 200 OK\r\n' +
					'Via: SIP/2.0/UDP 10.0.0.117;branch=z9hG4bKcc947650B2D2E133;received='+pub_ip+';rport=61721\r\n' +
					'From: "'+caller+'" <sip:'+caller_e164+'@'+priv_ip+'>;tag=8031EC90-718C6673\r\n' +
					'To: <sip:'+caller_e164+'@'+domain+'>;tag=B7KgX8H6e5grm\r\n' +
					'Call-ID: '+call_id+'\r\n' +
					'CSeq: '+cseq+' REGISTER\r\n'+
					'Contact: <sip:'+caller+'@'+priv_ip+'>;expires=300\r\n' +
					'Date: Thu, 01 Oct 2020 12:16:30 GMT\r\n' +
					'User-Agent: Botauro service\r\n' +
					'Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, REGISTER, REFER, NOTIFY\r\n' +
					'Supported: timer, precondition, path, replaces\r\n' +
					'Content-Length: 0' 
    	  }

      ]
};

// ------------------------------------------------------

module.exports = config;
