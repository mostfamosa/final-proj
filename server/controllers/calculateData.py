import json

def calculateCut(server):
    content_len = int(server.headers.get('Content-Length'))
    data = json.loads(server.rfile.read(content_len))
    print('fuck off\n',data)


    server.send_response(200)  # file has been found
            # message to be displayed on webpage
    server.send_header('content-type', 'application/json')
    server.send_header('Access-Control-Allow-Origin', '*')
    server.end_headers()

    # self._set_headers()
    server.wfile.write(json.dumps(
        {'aaa': "karam was here"}).encode("utf-8"))
        