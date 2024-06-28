def getFullName(first_name:str, last_name:str):
    fullName = first_name.title() + " " + last_name.title()
    return fullName

print(getFullName("john", "doe"))