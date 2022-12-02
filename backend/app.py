import mimetypes
from random import random
from flask import Flask, render_template, session, redirect,request,send_from_directory,Response
from functools import wraps
import pymongo
from flask_cors import CORS
import random
import os
from keras.preprocessing.image import load_img,img_to_array
from flask import jsonify
from bson.json_util import dumps

import json

app = Flask(__name__)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'
CORS(app)


# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.user_login_system

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap



@app.route('/')
def home():
  return render_template('home.html')

@app.route('/dashboard/')
@login_required
def dashboard():
  return render_template('dashboard.html')


def view():
    while True:
      lab=list(db.labels.find({},{'_id':0,'count':1,'labels':1,'acc':1}).sort("_id",-1).limit(1))
      labx=lab[0]
      return labx
      

@app.route('/view',methods=['GET'])
def sview():
  return view()

@app.route('/state/glob', methods=['GET'])
def stateglob():

  las={}
  lab =list(db.labels.find({},{'_id':0,'count':1,'labels':1,'acc':1}))
  for last in lab:
    lastx=last["labels"]
    if lastx in las:
      las[lastx]+=int(last["count"])
    else:
      ini=int(last["count"])
      las.update({lastx:ini})
  print(las)    

  final = json.dumps(las, indent=2)

  return final


@app.route('/testbase')
def based():
  for i in range(150):
    l=["apple rotten","apple","orange rotten","orange","banana"]
    lch=random.choice(l)
    accu=round(random.uniform(0,0.98),2)
    labels={
      "count":random.randint(1,6),
      "labels":lch,
      "acc":accu
    } 
    db.labels.insert_one(labels)
    print(labels)
  return "heloo"""


@app.route('/search/orange')
def searchorange():
  lab =list(db.labels.find({"$or":[{"labels":"orange"},{"labels":"orange rotten"}]},{'_id':0,'count':1,'labels':1,'acc':1}))
  las={}
  for last in lab:
    lastx=last["labels"]
    if lastx in las:
      las[lastx]+=int(last["count"])
    else:
      ini=int(last["count"])
      las.update({lastx:ini})
  print(las)  
  return json.dumps(las,indent=2)



@app.route('/search/apple')
def searchapple():
  lab =list(db.labels.find({"$or":[{"labels":"apple"},{"labels":"apple rotten"}]},{'_id':0,'count':1,'labels':1,'acc':1}))
  las={}
  for last in lab:
    lastx=last["labels"]
    if lastx in las:
      las[lastx]+=int(last["count"])
    else:
      ini=int(last["count"])
      las.update({lastx:ini})
  print(las)  
  return json.dumps(las,indent=2)



APP_ROOT = os.path.dirname(os.path.abspath(__file__))
labels = {0: 'apple', 1: 'banana', 2: 'beetroot', 3: 'bell pepper', 4: 'cabbage', 5: 'capsicum', 6: 'carrot', 7: 'cauliflower', 8: 'chilli pepper', 9: 'corn', 10: 'cucumber', 11: 'eggplant', 12: 'garlic', 13: 'ginger', 14: 'grapes', 15: 'jalepeno', 16: 'kiwi', 17: 'lemon', 18: 'lettuce',
          19: 'mango', 20: 'onion', 21: 'orange', 22: 'paprika', 23: 'pear', 24: 'peas', 25: 'pineapple', 26: 'pomegranate', 27: 'potato', 28: 'raddish', 29: 'soy beans', 30: 'spinach', 31: 'sweetcorn', 32: 'sweetpotato', 33: 'tomato', 34: 'turnip', 35: 'watermelon'}

@app.route("/upload", methods=["POST"])
def upload():
    target = os.path.join(APP_ROOT, 'images/')
    # target = os.path.join(APP_ROOT, 'static/')
    print(target)
    if not os.path.isdir(target):
            os.mkdir(target)
    else:
        print("Couldn't create upload directory: {}".format(target))
    print(request.files.getlist("file"))
    for upload in request.files.getlist("file"):
        print(upload)
        print("{} is the file name".format(upload.filename))
        filename = upload.filename
        destination = "/".join([target, filename])
        print ("Accept incoming file:", filename)
        print ("Save it to:", destination)
        upload.save(destination)
        #import tensorflow as tf
        import numpy as np
        from keras.preprocessing import image

        from keras.models import load_model
        new_model = load_model('FV.h5')
        new_model.summary()
        img=load_img('images\\'+filename,target_size=(224,224,3))
        img=img_to_array(img)
        img=img/255
        img=np.expand_dims(img,[0])
        answer=new_model.predict(img)
        y_class = answer.argmax(axis=-1)
        print(y_class)
        y = " ".join(str(x) for x in y_class)
        y = int(y)
        res = labels[y]
        print(res) 
    # return send_from_directory("images", filename, as_attachment=True)
    return jsonify(res)

@app.route('/upload/<filename>')
def send_image(filename):
    return send_from_directory("images", filename)



@app.route('/download',methods=['GET'])
def download_labels():
  downdata = list(db.labels.find({},{'_id':0,'count':1,'labels':1,'acc':1}))
  print(downdata)
  d= dumps(downdata, indent=2)
  return Response(
        d,
        mimetype="text/json",
        headers={"Content-disposition":
                 "attachment; filename=myplot.json"})

  




  


