from typing import Union, Dict

from deta import Deta
import bcrypt


class UserExistsException(Exception):
    pass


class AuthDB:
    def __init__(self, deta_key: str, db_name: str) -> None:
        self.deta = Deta(deta_key)
        self.db = self.deta.Base(db_name)

    def create_user(self, email: str, password: str, hash: bool = True) -> Dict[str, str]:
        if hash:
            password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

        if self.db.get(email) is not None:
            raise UserExistsException("User already exists")
        self.db.put({"password": password.decode()}, email)
        return {"email": email, "password": password}

    def get_user(self, email: str) -> Union[Dict[str, str], None]:
        return self.db.get(email)

    def check_password(self, email: str, password: str) -> bool:
        user = self.db.get(email)
        return bcrypt.checkpw(password.encode(), user["password"].encode())


class LogDB:
    def __init__(self, deta_key: str, db_name: str) -> None:
        self.deta = Deta(deta_key)
        self.db = self.deta.Base(db_name)

    def get_logs(self, email: str) -> Dict[str, str]:
        return self.db.fetch({"email": email}).items

    def create_update_log(self, email: str, log: str, lid: str) -> Dict[str, str]:
        test = self.db.put({"email": email, "log": {"name": log.name, "type": log.type, "date": log.date}}, lid)
        print(test)
        return {"email": email, "log": log, "lid": lid}

    def delete_log(self, lid: str) -> Dict[str, str]:
        self.db.delete(lid)
        return {"lid": lid}

    def get_log(self, lid: str) -> Dict[str, str]:
        return self.db.get(lid)