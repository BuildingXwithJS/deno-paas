build:
	cd ./deno-paas-plugin && cargo build

run:
	deno --allow-plugin test.ts
