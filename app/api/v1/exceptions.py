class FormError(Exception):
    def __init__(self, message: str):
        self.message = message

class LoginError(Exception):
    def __init__(self, message: str):
        self.message = message

class SignupError(Exception):
    def __init__(self, message: str):
        self.message = message

class ResetError(Exception):
    def __init__(self, message: str):
        self.message = message