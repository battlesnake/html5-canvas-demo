.PHONY: default clean

.SECONDARY:

default: out/index.html out/style.css out/script.js

clean:
	rm -rf -- out/

%/:
	mkdir -p -- $@

out/%.html: %.jade | out/
	pug < $^ > $@

out/%.css: %.less | out/
	lessc - < $^ > $@

out/%.js: %.js | out/
	cat < $^ > $@
