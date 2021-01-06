import json
import pandas as pd
import requests
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
from random import randrange
from datetime import datetime
from keras.callbacks import History
#87.48,88.86
df=pd.read_csv('TelematicsGPS_Ready.csv')
X = df[['Latitude','Longitude','Speed']][:11020]
X_test = df[['Latitude','Longitude','Speed']][11020:]
y=df['DriverProfile'][:11020]
y_test=df['DriverProfile'][11020:]


history=History()
model = Sequential()
model.add(Dense(8, input_dim=3, activation='tanh'))
model.add(Dense(10, activation='tanh'))
model.add(Dense(12, activation='tanh'))
model.add(Dense(14, activation='tanh'))
model.add(Dense(16, activation='tanh'))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
hist=model.fit(X, y, epochs=500, batch_size=100)
model_json = model.to_json()
_,accuracy = model.evaluate(X_test, y_test)
print('Accuracy: %.2f' % (accuracy*100)) 
print(hist.history)

with open("model3.json", "w") as json_file:
    json_file.write(model_json)
model.save_weights("model3.h5")
