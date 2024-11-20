import serial
import pynmea2

from src.backend.seriallib.dataclasses.serialconfig import SerialConfig

class NMEAReader:
    def __init__(self, serial_config: SerialConfig):
        self.ser = serial.Serial(serial_config.port, serial_config.baudrate, timeout=1)

    def read_nmea_data(self):
        try:
            while True:
                line = self.ser.readline().decode('ascii', errors='replace')
                if line.startswith('$'):
                    try:
                        msg = pynmea2.parse(line)
                        print(msg)
                    except pynmea2.ParseError as e:
                        print(f'Parse error: {e}')
        except KeyboardInterrupt:
            self.ser.close()