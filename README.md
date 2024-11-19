# TrackGuide-MDR-Demo
This repository houses all the code for the TrackGuide MDR demo. This includes Google Maps reporting and NMEA consumption from serial.

## Installation Guide

### Prerequisites
- Python 3.11 or higher
- pip (Python package installer)

### Installing Poetry
To install Poetry, run the following command:
```sh
curl -sSL https://install.python-poetry.org | python3 -
```

### Configuring Poetry
After installation, configure Poetry to use your project's virtual environment:
```sh
poetry config virtualenvs.in-project true
```

### Using Poetry
To install dependencies for the existing project, navigate to the project directory and run:
```sh
poetry install
```

To add a new dependency (similarly to pip, using the pypi name, which is the name of the package after `pip install`) to the project, run:
```sh
poetry add <package-name>
```

For more information, refer to the [Poetry documentation](https://python-poetry.org/docs/).