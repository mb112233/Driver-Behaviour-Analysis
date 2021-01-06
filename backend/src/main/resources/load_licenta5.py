import sys
import json
from keras.models import model_from_json
import keras as kf
from numpy import array

json_file = open('D:/Desktop/DriverBehaviorProfilingSpringApp/src/main/resources/model5.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)

loaded_model.load_weights("D:/Desktop/DriverBehaviorProfilingSpringApp/src/main/resources/model5.h5")
print("Loaded model from disk")

lat=float(sys.argv[1])
long=float(sys.argv[2])
speed=float(sys.argv[3])

Xn = array([[lat, long, speed]])

result = loaded_model.predict_classes(Xn)
print(int(result[0]))

sys.exit(int(result[0]))