
dark-facebook.css: main.styl
	curl http://localhost:25531/get -o/tmp/dark-facebook.css && ( echo '@namespace url(http://www.w3.org/1999/xhtml);'; echo '@-moz-document domain("facebook.com") {'; echo '/* (generated)';  date; echo ' */'; cat /tmp/dark-facebook.css; echo '}' ) > dark-facebook.css

