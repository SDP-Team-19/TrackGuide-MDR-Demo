'''

    This file sends the location data to the JS gRPC server

    Right now it is fake data be added in a for loop

    run last - command from root:     python ./client/client.py  
'''



import grpc
import coordinateSender_pb2
import coordinateSender_pb2_grpc
import time

def run():
    #connect to gRPC js the server
    channel = grpc.insecure_channel('localhost:50051')
    stub = coordinateSender_pb2_grpc.coordinateSenderServiceStub(channel)

    latitude = 37.7749 
    longitude = -122.4194

    lat_str = str(latitude)
    lng_str = str(longitude)

    response = stub.SendLocation(
    coordinateSender_pb2.LocationRequest(latitude=lat_str, longitude=lng_str),
    timeout=5  #timeout after 5 seconds
)
    print(f"Server replied: {response.reply}")

    #sending the location
    i=0
    while i<=50 : #####fake data for testing####
        time.sleep(1)
        longitude = longitude + .000001
        latitude = latitude + .000001

        lat_str = str(latitude)
        lng_str = str(longitude)

        response = stub.SendLocation(coordinateSender_pb2.LocationRequest(latitude=lat_str, longitude=lng_str))
        print(f"Server replied: {response.reply}")

        i+=1

if __name__ == '__main__':
    run()