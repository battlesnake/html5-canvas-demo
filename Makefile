.PHONY: default clean

.SECONDARY:

default: index.html style.css script.js

clean:
	rm -- index.html

%.html: %.jade
	pug --pretty < $^ > $@

%.css:

%.js:
