
DIST = dist
OUT_CSS = $(DIST)/dark-facebook.css
MIN_CSS = $(DIST)/dark-facebook.min.css

all: $(OUT_CSS) $(MIN_CSS)

clean:
	rm -rf $(DIST)

clone-site: .FORCE
	rm -rfv site
	git clone -b gh-pages git@github.com:dtinth/dark-facebook.git site

publish-site: clone-site $(MIN_CSS)
	rm -rfv site/selectors
	mkdir site/selectors
	node scripts/generate-docs.js
	./scripts/push-site.sh

publish: clean $(MIN_CSS) theme-info.txt
	node scripts/generate-description.js > dist/theme-description.txt
	casperjs scripts/publish-to-userstyle.js

upload: $(MIN_CSS)
	curl https://dark-facebook.appspot.com/dark-facebook.css --data-urlencode admin_key=$(ADMIN_KEY) --data-urlencode value@$(MIN_CSS)
	curl https://dark-facebook.appspot.com/dark-facebook.commit --data-urlencode admin_key=$(ADMIN_KEY) --data-urlencode value=`git rev-parse HEAD`

$(OUT_CSS):
	mkdir -p $(DIST)
	ANNOTATE_CSS=1 node scripts/compile.js > $(OUT_CSS)

$(MIN_CSS): $(OUT_CSS)
	./node_modules/.bin/cleancss -b $(OUT_CSS) -o $(MIN_CSS)

.FORCE:

