import serial.tools.list_ports

from src.backend.seriallib.dataclasses.serialconfig import SerialConfig
from src.backend.seriallib.nmeareader import NMEAReader


class TUI:
    def __init__(self):
        self.ports = [port.device for port in serial.tools.list_ports.comports()]
        pass

    def run_tui(self) -> SerialConfig:
        print("Available ports:")
        for idx, port in enumerate(self.ports, start=1):
            print(f"{idx}. {port}")
        selection = int(input("Select the serial port by number: ")) - 1
        port = self.ports[selection]
        baudrate = int(input("Enter the Baudrate: "))
        return SerialConfig(port=port, baudrate=baudrate)