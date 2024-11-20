import serial.tools.list_ports

from src.backend.seriallib.nmeareader import NMEAReader
from src.frontend.tui.tui import TUI

def main():
    tui = TUI()
    serial_config = tui.run_tui()
    reader = NMEAReader(serial_config)
    reader.read_nmea_data()

if __name__ == "__main__":
    main()