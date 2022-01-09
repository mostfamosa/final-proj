from flask import Flask,request
import json

app=Flask(__name__)

@app.route("/calculateData", methods=['POST'])
def __calculateData__():
    #get the parameters ready from the client to start the simulation and in finish return the data of the simulation
    from controllers import calculateData
    data = request.json
    myhMax=int(data.get('height'))/100.0
    myRbin=int(data.get('radius'))/100.0
    temp=str(data.get('Isdefect'))
    
    if(temp=='n'):
        isDefect=False
    else:
        isDefect=True
    
    moose=calculateData.main(myhMax,myRbin,isDefect)
    josn_dump=json.dumps(moose)
    return {"data":moose}

if __name__ == "__main__":
    app.run(debug=True)
