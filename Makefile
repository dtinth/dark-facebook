
all: dark-facebook.css

dark-facebook.css: src/main.styl
	node server.js compile > dark-facebook.css

publish: publish-to-gae publish-to-userstyles 
publish-to-gae:
	curl -s https://dark-facebook.appspot.com/ping

publish-to-userstyles:
	git log --pretty=format:'* %ad %h %s' --date=iso > /tmp/dark-facebook.log
	phantomjs publish-to-userstyles.js

