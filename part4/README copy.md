# HBnB Application - Project Structure

## Overview
This project is the initial setup for the **HBnB application**, ensuring a well-organized and modular codebase. The application follows best practices by implementing a **layered architecture** with clear separation of concerns:

- **Presentation Layer:** Handles API requests and responses using Flask and Flask-RESTx.
- **Business Logic Layer:** Manages the core functionalities and enforces business rules.
- **Persistence Layer:** Provides storage and retrieval mechanisms. Currently, an **in-memory repository** is used, which will later be replaced by a **SQLAlchemy-backed database**.
- **Facade Pattern:** Used to streamline communication between layers.

## Project Structure
```
holbertonschool-hbnb/
│── app/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py  # Defines API endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── facade.py  # Acts as an interface for the business logic
│   ├── persistence/
│   │   ├── __init__.py
│   │   ├── repository.py  # In-memory storage implementation
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base_model.py  # Defines the base class for all models
│   ├── main.py  # Flask application entry point
│── tests/
│── config.py  # Configuration settings
│── requirements.txt  # Dependencies
│── README.md  # Project documentation
```

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Python 3.10
- pip
- Virtual environment (optional but recommended)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/AlphaDesnoc/holbertonschool-hbnb.git
   cd hbnb
   ```
2. Create a virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the application:
   ```sh
   python app/main.py
   ```

## Future Enhancements
- Implement a SQLAlchemy-based persistence layer.
- Add authentication and authorization mechanisms.
- Expand API functionalities.

## References
- [Flask Documentation](https://flask.palletsprojects.com/en/stable/)
- [Flask-RESTx Documentation](https://flask-restx.readthedocs.io/en/latest/)
- [Facade Design Pattern](https://refactoring.guru/design-patterns/facade/python/example)

