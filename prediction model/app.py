
from flask import Flask,render_template,Response
import cv2
from sqlalchemy import null
import torch,yolov5

from yolov5.utils.general import (check_img_size, non_max_suppression, scale_coords, 
                                  check_imshow, xyxy2xywh, increment_path)
from yolov5.utils.torch_utils import select_device, time_sync
from yolov5.utils.plots import Annotator, colors
from deep_sort.utils.parser import get_config
from deep_sort.deep_sort import DeepSort
from PIL import Image as im
import pymongo
import time
import gridfs

app = Flask(__name__)

print(torch.cuda.is_available())

#load model

# model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
device = select_device('') # 0 for gpu, '' for cpu
# initialize deepsort
cfg = get_config()
cfg.merge_from_file("deep_sort/configs/deep_sort.yaml")
deepsort = DeepSort('mobilenetv2_x1_4',device,
                    max_dist=cfg.DEEPSORT.MAX_DIST,
                    max_iou_distance=cfg.DEEPSORT.MAX_IOU_DISTANCE,
                    max_age=cfg.DEEPSORT.MAX_AGE, n_init=cfg.DEEPSORT.N_INIT, nn_budget=cfg.DEEPSORT.NN_BUDGET,
                    )



client = pymongo.MongoClient('localhost', 27017)
db = client.user_login_system
dbm=client.images
cap = cv2.VideoCapture(0)
def stream():
    model = yolov5.load('global.pt')
    names = model.module.names if hasattr(model, 'module') else model.names
    im=0
    global xlabel
    xlabel=""

    model.conf = 0.01
    model.iou = 0.3
    model.classes = [0,64,39]

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: failed to capture image")
            break

        results = model(frame, augment=True)
        # proccess
        annotator = Annotator(frame, line_width=2, pil=not ascii) 
        det = results.pred[0]
        if det is not None and len(det):   
            xywhs = xyxy2xywh(det[:, 0:4])
            confs = det[:, 4]
            clss = det[:, 5]
            outputs = deepsort.update(xywhs.cpu(), confs.cpu(), clss.cpu(), frame)
            if len(outputs) > 0:
                for j, (output, conf) in enumerate(zip(outputs, confs)):

                    bboxes = output[0:4]
                    id = output[4]
                    cls = output[5]

                    c = int(cls)  # integer class
                    label = f'{id} {names[c]} {conf:.2f}'
                    annotator.box_label(bboxes, label, color=colors(c, True))
                    xlabel=label
                    slabel=label.split()
                    labels={
                        "count":slabel[0],
                        "labels":slabel[1],
                        "acc":slabel[2]
                    } 
                    db.labels.insert_one(labels)
                    """xlabel= list(db.labels.find({},{'_id':0,'count':1,'labels':1}).sort("_id",-1).limit(1))
                    print(xlabel[0])"""
                    """if (xlabel[1] != labels[1]):
                        db.labels.insert_one(labels)"""
                    print(slabel)
                    
                    

        else:
            deepsort.increment_ages()

        im0 = annotator.result()    
        image_bytes = cv2.imencode('.jpg', im0)[1].tobytes()
        if annotator != null :
            fs = gridfs.GridFS(dbm)
            fl=xlabel+str(im)
            """+str(random.randint(2,40))"""
            fs.put(image_bytes,filename=fl)
            im+=1


        #time.sleep(2)
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n')


def streamorange():
    model = yolov5.load('yolov5s.pt')
    names = model.module.names if hasattr(model, 'module') else model.names
    im=0
    global xlabel
    xlabel=""

    model.conf = 0.1
    model.iou = 0.5
    model.classes = [0,64,39]

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: failed to capture image")
            break

        results = model(frame, augment=True)
        # proccess
        annotator = Annotator(frame, line_width=2, pil=not ascii) 
        det = results.pred[0]
        if det is not None and len(det):   
            xywhs = xyxy2xywh(det[:, 0:4])
            confs = det[:, 4]
            clss = det[:, 5]
            outputs = deepsort.update(xywhs.cpu(), confs.cpu(), clss.cpu(), frame)
            if len(outputs) > 0:
                for j, (output, conf) in enumerate(zip(outputs, confs)):

                    bboxes = output[0:4]
                    id = output[4]
                    cls = output[5]

                    c = int(cls)  # integer class
                    label = f'{id} {names[c]} {conf:.2f}'
                    annotator.box_label(bboxes, label, color=colors(c, True))
                    xlabel=label
                    slabel=label.split()
                    labels={
                        "count":slabel[0],
                        "labels":slabel[1],
                        "acc":slabel[2]
                    } 
                    db.labels.insert_one(labels)
                    """xlabel= list(db.labels.find({},{'_id':0,'count':1,'labels':1}).sort("_id",-1).limit(1))
                    print(xlabel[0])"""
                    """if (xlabel[1] != labels[1]):
                        db.labels.insert_one(labels)"""
                    print(slabel)
                    
                    

        else:
            deepsort.increment_ages()

        im0 = annotator.result()    
        image_bytes = cv2.imencode('.jpg', im0)[1].tobytes()
        if annotator != null :
            fs = gridfs.GridFS(dbm)
            fl=xlabel+str(im)
            """+str(random.randint(2,40))"""
            fs.put(image_bytes,filename=fl)
            im+=1


        #time.sleep(2)
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n')



def streamapple():
    model = yolov5.load('apple.pt')
    names = model.module.names if hasattr(model, 'module') else model.names
    
    model.conf = 0.2
    model.iou = 0.3
    model.classes = [0,64,39]
    im=0
    global xlabel
    xlabel=""
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: failed to capture image")
            break
        
        results = model(frame, augment=True)
        
        # proccess
        annotator = Annotator(frame, line_width=2, pil=not ascii)
        det = results.pred[0]
        if det is not None and len(det):   
            xywhs = xyxy2xywh(det[:, 0:4])
            confs = det[:, 4]
            clss = det[:, 5]
            outputs = deepsort.update(xywhs.cpu(), confs.cpu(), clss.cpu(), frame)
            if len(outputs) > 0:
                for j, (output, conf) in enumerate(zip(outputs, confs)):

                    bboxes = output[0:4]
                    id = output[4]
                    cls = output[5]

                    c = int(cls)  # integer class
                    label = f'{id} {names[c]} {conf:.2f}'
                    annotator.box_label(bboxes, label, color=colors(c, True))
                    xlabel=label
                    slabel=label.split()
                    labels={
                        "count":slabel[0],
                        "labels":slabel[1],
                        "acc":slabel[2]
                    } 
                    db.labels.insert_one(labels)
                    """xlabel= list(db.labels.find({},{'_id':0,'count':1,'labels':1}).sort("_id",-1).limit(1))
                    print(xlabel[0])"""
                    """if (xlabel[1] != labels[1]):
                        db.labels.insert_one(labels)"""
                    print(slabel)
                    
                    

        else:
            deepsort.increment_ages()

        im0 = annotator.result()    
        image_bytes = cv2.imencode('.jpg', im0)[1].tobytes()
        if annotator != null :
            fs = gridfs.GridFS(dbm)
            fl=xlabel+str(im)
            """+str(random.randint(2,40))"""
            fs.put(image_bytes,filename=fl)
            im+=1


        #time.sleep(0.5)
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n')
        
         
    


@app.route('/')
def marn():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():

    return Response(stream(),mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/video_orange')
def video_orange():

    return Response(streamorange(),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_apple')
def video_apple():

    return Response(streamapple(),mimetype='multipart/x-mixed-replace; boundary=frame')





if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5500,debug=True)
