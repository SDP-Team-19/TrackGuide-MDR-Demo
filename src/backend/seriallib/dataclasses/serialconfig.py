from dataclasses import dataclass

@dataclass
class SerialConfig():
    port: str
    baudrate: int