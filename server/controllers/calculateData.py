import random
import math
import numpy as np


# def calculateCut():                                       
#     #return {"data":data}
#     myTemp=[]

class clDisign():
    def __init__(self):
        self.vElement=[]
        self.vCut=[]
        self.timeCurrent=0#sec, need restart for each of simulation
        self.vElementSensor=[]
    def timeStep(self,dt):
        for Element in self.vElement:
            Element.TemperaturePrev=Element.Temperature
        for Element in self.vElement:
            Element.temperatureChange(self.timeCurrent,dt)
        self.timeCurrent+=dt
    def restart(self,Temperature=20):
        self.timeCurrent=0
        for Element in self.vElement:
            Element.K_used=0
            Element.TemperaturePrev=Temperature
            Element.Temperature=Temperature
    def print_sensors(self,t,K):
        mysensors={}
        t_day=int(float(t)/(60*60*24))
        tt=t-t_day*60*60*24
        t_h=int(float(tt)/(60*60))
        tt=tt-t_h*60*60
        t_m=int(float(tt)/(60))
        tt=tt-t_m*60
        i=0############problem

        def Convert(string):
            li = list(string.split(" , "))
            return li

        print("time="+str(t)+" "+str(t_day)+" days, "+str(t_h)+" hours, "+str(t_m)+" minutes, "+str(tt)+" sec")
        for ElementSensor in self.vElementSensor:
            print(ElementSensor.s_get(K))
            mysensors[i]={ElementSensor.s_get(K)}
            i+=1
        # print("---------------")
        # print("---------------")
        # print(1,type(mysensors[0]))
        # print(2,mysensors)
        # print(3,mysensors[0])
        # print(4,mysensors[0])
        # print(5,Convert(list(mysensors[0])[0]))
        # print(Convert(list(mysensors[0])[0]))
        mysensorsDict=[]

        #print(0,mysensors)
        for key in mysensors:
            mysensorsDict.append(Convert(list(mysensors[key])[0]))
            

        # print(mysensorsDict)
        # print("---------------")
        # print("---------------")
        return mysensorsDict,mysensorsDict
    class clBeton():
        def __init__(self):
            self.timeTo99ProcDegradation_days=26
            #K is the total amount of heat that will be generated (with t goes to infinity)
            #33,500 to 45,000 J/mol. 1 mol is 0.115 kg
            self.K_per_mol=33500#J/mol
            self.mass_per_mol=0.115#kg
            
            self.K=float(self.K_per_mol)/self.mass_per_mol#J/kg
            self.temperatureNormal=20#degrees (Celsion)
            self.timeTo99ProcDegradation_sec=self.timeTo99ProcDegradation_days*24*60*60
        def q(self,temperature,K_used):#J/(kg*sec)
            if self.K<=K_used:
                return 0
            ru0=float(np.log(100))/self.timeTo99ProcDegradation_sec#r(u0)=speed of reaction under normal temperature
            v=0.1*np.log(2)*(temperature-self.temperatureNormal)
            if v>100:
                print("T="+str(temperature)+"_T0="+str(self.temperatureNormal)+"_K="+str(self.K)+"_Ku="+str(K_used))
            ru=ru0*math.exp(v)#r(u)=speed of reaction
            return ru*(self.K-K_used)
    class clElement():
        def __init__(self):
            self.ElementNext=None
            self.Temperature=0
            self.TemperaturePrev=0
            self.c=0#specific heat capacity (at constant pressure, in case of a gas), teployomkost,J/(kg degreeC)
            self.kappa=0#thermal conductivity, teploprovodnost [Wt/(m grad)]
            self.p=0#percentage of active material
            self.V=0#volume
            self.rho=0#mass density
            self.type=-1#0-air, 1-external ground, 2-ground, 3-beton, 4-bouble
            self.vSides=[]
            self.beton=None
            self.K_used=0#J, need restart for each of simulation
            
            #position
            self.x=0
            self.y=0
            self.z=0
            self.r=0
            self.alpha=0
        def s_get(self,K=1000):
            #s=print(str(Disign.vElement[iElement].Temperature))
            #beton=self.clBeton()
            #K=se
            s=str(self.z)+" , "+str(self.r)+" , "+str(self.Temperature)
            if not(self.beton is None):
                s+=" , "+str(self.K_used)+" , "+str(K)+" , "+str(float(self.K_used)/K)
            return s
            
        class clSide():
            def __init__(self):
                self.ElementIn=None
                self.ElementOut=None
                self.S=0
                self.h_div_cos=1
            def transmittedHeat_perTimeUnit(self):
                #Q_side(dt)=kappa*(u_side(t)-u(t))*S_side cos(phy_side)/h_side dt
                kappa=min(self.ElementIn.kappa,self.ElementOut.kappa)
                dTemperature=self.ElementOut.TemperaturePrev-self.ElementIn.TemperaturePrev
                return float(kappa*dTemperature*self.S)/self.h_div_cos
        def temperatureChange(self,t,dt):
            #sum_{side} Q_side(dt)+V rho q(t) dt = c rho V (u(t+dt)-u(t))
            #u(t+dt)=u(t)+(sum_{side} Q_side(dt)+V rho q(t) dt)/(c rho V)
            if self.type==0:#air
                self.Temperature=self.TemperaturePrev#u(t), in our project temperature of air is constant
                return
            if self.type==1:#external ground
                self.Temperature=self.TemperaturePrev#temperature of external ground is constant
                return
            du_Sides=0
            for side in self.vSides:
                du_Sides+=side.transmittedHeat_perTimeUnit()*dt#J
            du_internal=0
            if self.type==3:
                q=self.beton.q(self.TemperaturePrev,self.K_used)
                self.K_used+=q*dt#J/kg
                if self.beton.K<=self.K_used:
                    q=float(self.beton.K-(self.K_used-q*dt))/dt
                    self.K_used=self.beton.K
                du_internal=self.V*self.rho*q*dt#J
            v=self.c*self.rho*self.V#J/(kg degreeC)*kg/m3*m3=J/degreeC
            dTemperature=float(du_Sides+du_internal)/v#J/(J/degreeC)=degreeC
            self.Temperature=self.TemperaturePrev+dTemperature
    class clCut():
        def __init__(self,iCut,h0,h1):
            self.iCut=iCut
            self.h0=h0#depth min
            self.h1=h1#depth max
            self.vRing=[]
        class clRing():
            def __init__(self,iRing,r0,r1):
                self.iRing=iRing
                self.r0=r0#radius min
                self.r1=r1#radius max
                self.vElement=[]
                self.S_ring=3.1415*(r1*r1-r0*r0)
    def startDisign(self,rBin,hMax,dl,rMax):
        self.vElement=[]
        self.vElementSensor=[]
        self.vCut=[]
        
        dh=dl
        dr=dl
        
        beton=self.clBeton()
        
        #elements
        Element_Air=self.clElement()
        Element_Air.type=0
        Element_Air.kappa=0.022#Wt/(m grad)
        self.vElement.append(Element_Air)
        ElementLast=Element_Air
        
        Element_ExternalGround=self.clElement()
        Element_ExternalGround.type=1
        Element_ExternalGround.kappa=0.7#Wt/(m grad)#water 0.6, beton+pesok 0.7, basalt 1.3
        self.vElement.append(Element_ExternalGround)
        ElementLast.ElementNext=Element_ExternalGround
        ElementLast=Element_ExternalGround
        
        iCut=0
        h1=0
        while h1<hMax*0.999999:
            print("Elements:  cut "+str(iCut)+",  h="+str(h1+dh))
            cut=self.clCut(iCut,h1,h1+dh)
            iRing=0
            r1=0
            while r1<rMax*0.999999:
                r0=r1
                r1+=dr
                ring=cut.clRing(iRing,r0,r1)
                #n
                lenExternal=2*3.1415*r1
                nMin=float(lenExternal)/dl
                n=1
                while n<nMin:
                    n*=2
                
                for i in range(n):
                    Element=self.clElement()
                    if r1<=rBin*1.000001:
                        Element.type=3#beton
                        Element.kappa=1.75#Wt/(m grad)#water 0.6, beton+pesok 0.7, basalt 1.3
                        Element.beton=beton
                        Element.rho=2200#kg/m3
                        Element.c=0.880*1000#J/(kg degree)
                    else:
                        Element.type=2#ground
                        Element.kappa=0.7#Wt/(m grad)#water 0.6, beton+pesok 0.7, basalt 1.3
                        Element.rho=2500#kg/m3
                        Element.c=0.835*1000#J/(kg degree)
                    Element.V=dh*(float(ring.S_ring)/n)
                    Element.z=-(h1+0.5*dh)
                    Element.alpha=(i+0.5)*(float(2*3.1415)/n)
                    Element.r=0.5*(r0+r1)
                    Element.x=0.5*(r0+r1)*math.cos(Element.alpha)
                    Element.y=0.5*(r0+r1)*math.sin(Element.alpha)
                    self.vElement.append(Element)
                    ElementLast.ElementNext=Element
                    ElementLast=Element
                    ring.vElement.append(Element)
                    if iCut%10==0 and i==0:
                        self.vElementSensor.append(Element)
                
                iRing+=1
                cut.vRing.append(ring)
            h1+=dh
            iCut+=1
            self.vCut.append(cut)
        print("Elements:  finished  n="+str(len(self.vElement)))
        
        
        #sides
        iCut=0
        nCuts=len(self.vCut)
        for cut in self.vCut:
            print("Sides:  cut "+str(iCut)+" out of "+str(nCuts))
            iRing=0
            nRings=len(cut.vRing)
            for ring in cut.vRing:
                iElement=0
                nElements=len(ring.vElement)
                for Element in ring.vElement:
                    Element.vSides=[]
                    ElementOut=None
                    
                    #on ring
                    if nElements>1:
                        #
                        S=abs((cut.h1-cut.h0)*(ring.r1-ring.r0))
                        h_div_cos=float(2*3.1415*0.5*(ring.r1+ring.r0))/nElements
                        #
                        #next
                        side=Element.clSide()
                        side.ElementIn=Element
                        if iElement+1<nElements:
                            ElementOut=ring.vElement[iElement+1]
                        else:
                            ElementOut=ring.vElement[0]
                        side.ElementOut=ElementOut
                        side.S=S
                        side.h_div_cos=h_div_cos
                        Element.vSides.append(side)
                        #
                        #prev
                        side=Element.clSide()
                        side.ElementIn=Element
                        if iElement-1>0:
                            ElementOut=ring.vElement[iElement-1]
                        else:
                            ElementOut=ring.vElement[nElements-1]
                        side.ElementOut=ElementOut
                        side.S=S
                        side.h_div_cos=h_div_cos
                        Element.vSides.append(side)
                    
                    #up and down
                    #
                    S=float(ring.S_ring)/nElements
                    #
                    #up
                    side=Element.clSide()
                    side.ElementIn=Element
                    if iCut>0:
                        ElementOut=self.vCut[iCut-1].vRing[iRing].vElement[iElement]
                        side.h_div_cos=dh
                    else:
                        ElementOut=Element_Air
                        side.h_div_cos=0.5*dh
                    side.ElementOut=ElementOut
                    side.S=S
                    Element.vSides.append(side)
                    #
                    #down
                    side=Element.clSide()
                    side.ElementIn=Element
                    if iCut+1<nCuts:
                        ElementOut=self.vCut[iCut+1].vRing[iRing].vElement[iElement]
                        side.h_div_cos=dh
                    else:
                        ElementOut=Element_ExternalGround
                        side.h_div_cos=0.5*dh
                    side.ElementOut=ElementOut
                    side.S=S
                    Element.vSides.append(side)
                    
                    #internal
                    if iRing>0:
                        nElementsPrev=len(cut.vRing[iRing-1].vElement)
                        S=float(2*3.1415*ring.r0*abs(cut.h1-cut.h0))/max(nElementsPrev,nElements)
                        iElementOut=0
                        for ElementOut in cut.vRing[iRing-1].vElement:
                            b=True
                            if float(iElementOut+1)/nElementsPrev<float(iElement)/nElements:
                                b=False
                            if float(iElementOut)/nElementsPrev>float(iElement+1)/nElements:
                                b=False
                            if b:
                                side=Element.clSide()
                                side.ElementIn=Element
                                side.ElementOut=ElementOut
                                side.S=S
                                side.h_div_cos=dr
                                Element.vSides.append(side)
                            iElementOut+=1
                    
                    #external
                    if iRing+1<nRings:
                        nElementsPrev=len(cut.vRing[iRing+1].vElement)
                        S=float(2*3.1415*ring.r1*abs(cut.h1-cut.h0))/max(nElementsPrev,nElements)
                        iElementOut=0
                        for ElementOut in cut.vRing[iRing+1].vElement:
                            b=True
                            if float(iElementOut+1)/nElementsPrev<float(iElement)/nElements:
                                b=False
                            if float(iElementOut)/nElementsPrev>float(iElement+1)/nElements:
                                b=False
                            if b:
                                side=Element.clSide()
                                side.ElementIn=Element
                                side.ElementOut=ElementOut
                                side.S=S
                                side.h_div_cos=dr
                                Element.vSides.append(side)
                            iElementOut+=1
                    else:
                        side=Element.clSide()
                        side.ElementIn=Element
                        side.ElementOut=Element_ExternalGround
                        side.S=float(2*3.1415*ring.r1*abs(cut.h1-cut.h0))/nElements
                        side.h_div_cos=0.5*dr
                        Element.vSides.append(side)
                    iElement+=1
                iRing+=1
            iCut+=1
        print("Sides:  finished  n="+str(len(self.vElement)))

def main():
    Disign=clDisign()
    rBin=0.5#m
    hMax=5#m
    dl=0.1#m
    rMax=3#m
    #1 minute

    rBin=0.5#m
    hMax=1#m
    dl=0.1#m
    rMax=1#m

    Disign.startDisign(rBin,hMax,dl,rMax)
    Disign.restart()
    dt=20#60#*60
    #iElement=3
    #print(str(Disign.vElement[iElement].Temperature))
    #30 sec
    beton=Disign.clBeton()
    K=beton.K
    Disign.print_sensors(0,K)
    t=0
    arrr=[]
    for j in range(2):##############################
        for i in range(10):
            Disign.timeStep(dt)
            t+=dt
        #print(str(Disign.vElement[iElement].Temperature))
        #Disign.timeStep(dt)
        #print(str(Disign.vElement[iElement].Temperature))
        mysensorsStr,mysensorsDict=Disign.print_sensors(t,K)
        arrr.append(mysensorsDict)
    return arrr
    #exit
    #cd C:\Frenkel\Braude\2021a\beton\
    #python C:\Frenkel\Braude\2021a\beton\beton.py
    #stop: ctrl+c
    #
    #pip install numpy    