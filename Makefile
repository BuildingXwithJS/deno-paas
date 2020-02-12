run:
	deno --allow-net main.ts

test:
	deno test --allow-env --allow-write --allow-net

test-deploy:
	deno \
		--allow-read \
		--allow-net \
		cli/main.ts \
		test/simple_server.ts \
		--token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QifQ.d1dzQRQi06OVdA1gfF-YdVUVw1qAo5Ls9vMp4PQ93il4vKklm8o0yuvhizWs3v3PKaYgcTjBk768uMWhaN-g1g    Deploying: test/simple_server.ts with token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QifQ.d1dzQRQi06OVdA1gfF-YdVUVw1qAo5Ls9vMp4PQ93il4vKklm8o0yuvhizWs3v3PKaYgcTjBk768uMWhaN-g1g

list-deploys:
	curl \
		--header "Content-Type: application/json" \
		--header "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QifQ.d1dzQRQi06OVdA1gfF-YdVUVw1qAo5Ls9vMp4PQ93il4vKklm8o0yuvhizWs3v3PKaYgcTjBk768uMWhaN-g1g" \
		http://localhost:8000/deployments

remove-test-deploy:
	curl \
		--header "Content-Type: application/json" \
		--header "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QifQ.d1dzQRQi06OVdA1gfF-YdVUVw1qAo5Ls9vMp4PQ93il4vKklm8o0yuvhizWs3v3PKaYgcTjBk768uMWhaN-g1g" \
		--request DELETE \
		--data '{"name":"test/simple_server.ts"}' \
		http://localhost:8000/deployment
