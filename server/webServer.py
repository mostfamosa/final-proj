from http.server import HTTPServer,BaseHTTPRequestHandler


class helloHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('content-type','text/html')
        self.end_headers()
        self.wfile.write('hello everyone!'.encode())









def main():
    PORT = 8001
    server = HTTPServer(('', PORT), helloHandler)
    print('Server is running on port %s' % PORT)
    server.serve_forever()


if __name__ == '__main__':
    main()