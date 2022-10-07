from flask import *
from kafka import KafkaAdminClient
from kafka import KafkaConsumer
from kafka import KafkaProducer
from json import loads, dumps
import random 
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "/mnt/10ac-batch-6/notebooks/gedion_abebe/data"

@app.route('/get_text', methods=['GET'])
def get_text():
    if request.method == "GET": 
        topics_list = ["g2-national_news","g2-entertainment","g2-business","g2-international_news","g2-politics","g2-sport"]
        topic = random.choice(topics_list)
        consumer = KafkaConsumer(
            topic,
            bootstrap_servers=['b-1.batch6w7.6qsgnf.c19.kafka.us-east-1.amazonaws.com:9092','b-2.batch6w7.6qsgnf.c19.kafka.us-east-1.amazonaws.com:9092'],
            auto_offset_reset='latest',
            enable_auto_commit=True,
            group_id='g2-group',
            value_deserializer=lambda x: loads(x.decode('utf-8')))
        message = consumer.value
        return jsonify({
                "status": "success",
                "headline": message['headline'],
                "category": message['category'],
                "article": message['article']})    

@app.route('/get_audio', methods=['POST'])
def get_audio():
    if request.method == "POST":
        producer = KafkaProducer(
                    bootstrap_servers=['b-1.batch6w7.6qsgnf.c19.kafka.us-east-1.amazonaws.com:9092','b-2.batch6w7.6qsgnf.c19.kafka.us-east-1.amazonaws.com:9092'],
                    client_id='g2-text-producer',value_serializer=lambda x: dumps(x).encode('utf-8'))
        headline = request.form.get("headline")
        article = request.form.get("article")
        json_id = request.form.get("json_id")
        audio_file = request.files["audio_file"]
        if audio_file.filename != '':
            filename = secure_filename(audio_file.filename)
            file_path = app.config["UPLOAD_FOLDER"] + filename
            audio_file.save(app.config['UPLOAD_FOLDER'] + filename)
            producer.send("g2-audio-output",{"headline":headline,"article":article,"json_id":json_id,"file_path":file_path})
        return jsonify({"status": "success","file_path":file_path})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 33507))
    app.run(host='0.0.0.0', debug=True, port=port)

    
