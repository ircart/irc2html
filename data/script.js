function formReset() {
	document.getElementById('showcase').innerHTML = "<span class=\"placeholder\">*HTML view will appear here*</span>";
}

function toggle(bool) {
	if (bool == true) {
		return false;
	}
	else {
		return true;
	}
}

function convert() {
	if (document.getElementById('text').value == "") {
		return false;
	}
	document.getElementById('html').value = null;
	document.getElementById('showcase').innerHTML = null;
	lines = document.getElementById('text').value.split("\n");
	reg = new RegExp("(([0-9]{1,2})?((?:,([0-9]{1,2}))?))|(||||)");
	var showcase = "";
	for (var i = 0, all=lines.length; i < all; i++) {
		var line = lines[i];
		line = line.replace(new RegExp('<','g'),'&lt;');
		line = line.replace(new RegExp('>','g'),'&gt;');
		var match, lastf = "1", lastb = "0";
		var bold, italic, underline, reverse = false;
		var first = true;
		while ((match = reg.exec(line)) != null) {
			var f, b, span;
			if (match[2] != null) {
				f = Number(match[2])
				if (f > 15) { f = f-16; }
				f = f.toString();
				if (match[4] != null) {
					b =  Number(match[4])
					if (b > 15) { b = b-16; }
					b = b.toString();
				}
				else {
					b = lastb;
				}
			}
			else if (match[2] == null && (match[5] == null || match[5] == '')) {
				if (match[5] == null) {
					f = "1"; b = "0";
				}
				else {
					f = "1"; b = "0";
					bold = false;
					italic = false;
					underline = false;
					reverse = false;
				}
			}
			else {
				f = lastf, b = lastb;
				if (match[5] == '') {
					bold = toggle(bold);
				}
				else if (match[5] == '') {
					italic = toggle(italic);
				}
				else if (match[5] == '') {
					underline = toggle(underline);
				}
				else if (match[5] == '') {
					reverse = toggle(reverse);
				}
			}
			if (reverse == false) {
				span = 'f'+f+' b'+b;
			}
			else {
				span = 'f'+b+' b'+f;
			}
			if (bold == true) { span += ' _b'; }
			if (italic == true) { span += ' _i'; }
			if (underline == true) { span += ' _u'; }
			if (first == false) {
				line = line.replace(match[0],'</span><span class="'+span+'">');
			}
			else {
				line = line.replace(match[0],'<span class="'+span+'">');
				first = false;
			}
			lastf = f; lastb = b;
		}
		if (first == false) {
			showcase += (line+"</span>\n");
		}
		else {
			showcase += (line+"\n");
		}
	}
	showcase = showcase.replace(new RegExp("\<span class=\"(?:[a-zA-Z0-9_ ]+\")>\<\/span>","g"),"");
	document.getElementById('showcase').innerHTML = ("<pre>\n"+showcase+"</pre>");
	document.getElementById('html').value = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<title>IRC2HTML - https://git.supernets.org/acidvegas/irc2html</title>\n<style type=\"text/css\">\n.f0 { color: #ffffff; }\n.b0 { background-color: #ffffff; }\n.f1 { color: #000000; }\n.b1 { background-color: #000000; }\n.f2 { color: #00007f; }\n.b2 { background-color: #00007f; }\n.f3 { color: #009300; }\n.b3 { background-color: #009300; }\n.f4 { color: #ff0000; }\n.b4 { background-color: #ff0000; }\n.f5 { color: #7f0000; }\n.b5 { background-color: #7f0000; }\n.f6 { color: #9c009c; }\n.b6 { background-color: #9c009c; }\n.f7 { color: #fc7f00; }\n.b7 { background-color: #fc7f00; }\n.f8 { color: #ffff00; }\n.b8 { background-color: #ffff00; }\n.f9 { color: #00fc00; }\n.b9 { background-color: #00fc00; }\n.f10 { color: #009393; }\n.b10 { background-color: #009393; }\n.f11 { color: #00ffff; }\n.b11 { background-color: #00ffff; }\n.f12 { color: #0000fc; }\n.b12 { background-color: #0000fc; }\n.f13 { color: #ff00ff; }\n.b13 { background-color: #ff00ff; }\n.f14 { color: #7f7f7f; }\n.b14 { background-color: #7f7f7f; }\n.f15 { color: #d2d2d2; }\n.b15 { background-color: #d2d2d2; }\n._b { font-weight: bold; }\n._i { font-style: italic; }\n._u { text-decoration: underline; }\npre { margin: 0; font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, monospace, serif; font-size: 0.9em; }\n</style>\n</head>\n<body>\n";
	document.getElementById('html').value += document.getElementById('showcase').innerHTML;
	document.getElementById('html').value += "\n</body>\n</html>";
	return false;
}

function Submit() {
	if (document.getElementById('text').value != "" && document.getElementById('text').value != null) {
		return true;
	}
	return false;
}

function Download() {
	document.location='data:text/html,'+encodeURIComponent(document.getElementById('html').value);
}

window.onload = convert;
