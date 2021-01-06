import json
import pandas as pd
import requests
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout
from random import randrange
from datetime import datetime

df=pd.read_csv('TelematicsGPS_Ready.csv')
X = df[['Latitude','Longitude','Speed']][:11020]
X_test = df[['Latitude','Longitude','Speed']][11020:]
y=df['DriverProfile'][:11020]
y_test=df['DriverProfile'][11020:]

model = Sequential()
model.add(Dense(12, input_dim=3, activation='relu'))
model.add(Dense(24, activation='relu'))
model.add(Dense(24, activation='relu'))
model.add(Dense(16, activation='tanh'))
model.add(Dense(17, activation='relu'))
model.add(Dense(18, activation='tanh'))
model.add(Dense(18, activation='relu'))
model.add(Dense(18, activation='tanh'))
model.add(Dense(18, activation='relu'))
model.add(Dense(18, activation='tanh'))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(X, y, epochs=1500, batch_size=500)

_,accuracy = model.evaluate(X_test, y_test)
print('Accuracy: %.2f' % (accuracy*100)) 

model_json = model.to_json()
with open("model4.json", "w") as json_file:
    json_file.write(model_json)
model.save_weights("model4.h5")
