
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
	cp $(MIN_CSS) site/dark-facebook.min.css

publish: clean $(MIN_CSS) theme-info.txt
	node scripts/generate-description.js > dist/theme-description.txt
	casperjs scripts/publish-to-userstyle.js

$(OUT_CSS):
	mkdir -p $(DIST)
	ANNOTATE_CSS=1 node scripts/compile.js > $(OUT_CSS)

$(MIN_CSS): $(OUT_CSS)
	./node_modules/.bin/cleancss -b $(OUT_CSS) -o $(MIN_CSS)

.FORCE:

