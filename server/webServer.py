from flask import Flask

app=Flask(__name__)

@app.route("/calculateData")
def calculateData():
    print('fuck off\n')
    return{"zbeeeeeee":["kos","bz"]}




if __name__ == "__main__":
    app.run(debug=True)









# from http.server import HTTPServer,BaseHTTPRequestHandler

# from controllers.calculateData import calculateCut


# class reqHandler(BaseHTTPRequestHandler):
    


#     def do_OPTIONS(self):
#         self.send_response(200, "ok")
#         self.send_header('Access-Control-Allow-Origin', "*")
#         self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')        
#         self.send_header('Access-Control-Allow-Headers', 'Content-Type , Authorization')

    
#     def do_POST(self):
#         if self.path.endswith('calculateData'):
#             print('fuck off lololololo\n')
#             calculateCut(self)
            
#     # def do_GET(self):
#     #     if self.path.endswith('calculateData'):
#     #         self.send_response(200)
#     #         self.send_header('content-type','text/html')
#     #         self.end_headers()
#     #         self.wfile.write('hello bitch!'.encode())
#     #     else:   
#     #         self.send_response(200)
#     #         self.send_header('content-type','text/html')
#     #         self.end_headers()
#     #         self.wfile.write('hello GET!'.encode())

#         # 
#         #     print('zbe zbe zbe')
#         #     from controllers.calculateData import calculateCut
#         #     calculateCut(self)
#         #     reqHandler.allowCORS = True

# def main():
#     PORT = 8080
#     server = HTTPServer(('', PORT), reqHandler)
#     print('Server is running on port %s' % PORT)
#     server.serve_forever()


# if __name__ == '__main__':
#     main()