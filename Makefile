
DIST = dist
OUT_CSS = $(DIST)/dark-facebook.css
MIN_CSS = $(DIST)/dark-facebook.min.css

all: $(OUT_CSS) $(MIN_CSS)

clean:
	rm -rf $(DIST)

$(OUT_CSS):
	mkdir -p $(DIST)
	node compile.js > $(OUT_CSS)

$(MIN_CSS): $(OUT_CSS)
	./node_modules/.bin/cleancss -b $(OUT_CSS) -o $(MIN_CSS)

