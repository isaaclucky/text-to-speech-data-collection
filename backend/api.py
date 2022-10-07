from flask import *
from kafka import KafkaAdminClient
from kafka import KafkaConsumer
from json import loads
import random 

app = Flask(__name__)


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


    
