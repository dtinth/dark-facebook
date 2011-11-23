
all: dark-facebook.css

dark-facebook.css: main.styl
	curl http://localhost:25531/get -odark-facebook.css

publish: publish-to-userstyles publish-to-gae

publish-to-gae:
	curl -s https://dark-facebook.appspot.com/ping

publish-to-userstyles:
	git log --pretty=format:'* %ad %h %s' --date=iso > /tmp/dark-facebook.log
	phantomjs publish-to-userstyles.js

