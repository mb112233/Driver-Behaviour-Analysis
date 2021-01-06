import json
import pandas as pd
import requests
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
from random import randrange
from datetime import datetime
from keras.callbacks import History
pd.options.mode.chained_assignment = None  # default='warn'

def get_reverse_geocode_json(x):
   p={'lat':x['Latitude'], 'lon':x['Longitude'] }
   #p={'lat':lat,'lon':lon}
   try:
      r=requests.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2', params=p).json()
      print('Now at: ',x['Id'])
   except requests.exceptions.RequestException as e:
      print("EX at ", x['Id'])
   return r

def is_driver_in_town():
   in_town=[]
   df=pd.read_csv('Telematics with drivers.csv')
   json_obj=df.apply(get_reverse_geocode_json,axis=1)
   #print(json_obj)
   for i in range(len(json_obj)):
      if json_obj[i]['category'] == 'highway':
         in_town.append(0)
      else:
         in_town.append(1)

   l=json_obj.tolist()
   print(l)
   df['InTown']=in_town
   df.to_csv('TelematicsGPS_Is_driver_In_Town.csv')
 
def create_driver_profile():
   agr_profile=[]
   df=pd.read_csv('TelematicsGPS_Is_driver_In_Town.csv')
   
   for col,row in df.iterrows():
      a = row['InTown']
      b = row['Speed']
   
      if ((a ==1) &(b >=50)):
         agr_profile.append(1)
      elif ((a==0) & (b>=100)):
         agr_profile.append(1)
      else:
         agr_profile.append(0)

  
   df['DriverProfile']=agr_profile
   df.to_csv('TelematicsGPS_Ready.csv')

def assign_drivers_names():
   data = pd.read_csv('Telematics_OK.csv')
   df=data[data['DriverName'].isnull()]
   index=0
   for i in reversed(range(len(df))):
      if not pd.isnull(data.loc[i,'DriverName']):
         continue
      index+=1
      dummy_string='DUMMY'
      dummy_string+=str(index)
      df['DriverName'][i]=dummy_string
      data['DriverName'][i]=dummy_string
      j=i
      old_j=i
      while j>=0:
      
         if ( (pd.isnull(data.loc[j,'DriverName']))& (data['VehicleID'][j]== data['VehicleID'][old_j]) & (data['Date'][old_j]!=data['Date'][j]) ):
            date_time_str1=data['Date'][j]
            date_time_str2=data['Date'][old_j]
            date_time_obj1=datetime.strptime(date_time_str1,'%m/%d/%Y %H:%M')
            date_time_obj2=datetime.strptime(date_time_str2,'%m/%d/%Y %H:%M')
            minDuration=(date_time_obj2-date_time_obj1).total_seconds()
     
            timeDiff=minDuration/60
            time=data['Time'][old_j]/60

            if time == timeDiff:
               data['DriverName'][j]=dummy_string
               df['DriverName'][j]=dummy_string
               old_j=j
         j-=1  
    
   data.to_csv('a.csv')
      
history=History()
df=pd.read_csv('TelematicsGPS_shuffled.csv')
X = df[['Latitude','Longitude','Speed']][:11020]
X_test = df[['Latitude','Longitude','Speed']][11020:]
y=df['DriverProfile'][:11020]
y_test=df['DriverProfile'][11020:]


model = Sequential()
model.add(Dense(12, input_dim=3, activation='relu'))
model.add(Dense(24, activation='relu'))
model.add(Dense(24, activation='tanh'))
model.add(Dense(16, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(X, y, epochs=1500, batch_size=300)

_,accuracy = model.evaluate(X_test, y_test)
print('Accuracy: %.2f' % (accuracy*100)) 

model_json = model.to_json()
with open("model1.json", "w") as json_file:
    json_file.write(model_json)
model.save_weights("model1.h5")
