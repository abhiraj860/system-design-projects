def getFullName(first_name:str, last_name:str):
    fullName = first_name.title() + " " + last_name.title()
    return fullName

print(getFullName("john", "doe"))

def getNameWithAge(name: str, age: int):
    nameWithAge = name + " is this old: " + str(age)
    return nameWithAge

print(getNameWithAge("Abhiraj", 45))

def getItems(item_a:str, item_b: int, item_c: float, item_d: bool, item_e: bytes):
    return item_a, item_b, item_c, item_d, item_e

print(getItems("world", 23, 23.0, True, bytes("s", 'ascii')))

def processItems(items: list[str]):
    for item in items:
        print(item)

print(processItems(["banana", "mango"]))